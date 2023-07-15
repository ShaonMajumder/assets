<?php

namespace App\Http\Controllers;

use App\Exports\InventoryExport;
use App\Helpers\StaticConstant;
use App\Http\Requests\InventoryValidation;
use App\Http\Resources\InventoryResource;
use App\Traits\ApiTrait;
use App\Models\Inventory;
use App\Services\V1\InventoryAttachmentService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Str;

class InventoryController extends Controller
{
    use ApiTrait;

    public InventoryAttachmentService $inventoryAttachmentService;

    public function __construct( InventoryAttachmentService $inventoryAttachmentService )
    {
        $this->inventoryAttachmentService = $inventoryAttachmentService;
    }

    public function getInventory($id = null)
    {
        $inventory = Inventory::with('inventoryAttachment');
        if($id){
            $inventory = $inventory->where('inventory_id',$id)->get();
        }else{
            $inventory = $inventory->get();
        }
        return $inventory;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inventories = $this->getInventory();
        $totalWorth = $inventories->sum('value');
        $inventoryCount = $inventories->count();

        // Assets in Use
        // Idle Assets
        // Available Assets
        // Maintenance Requests
        // Buying Requests

        $inventoryItems = InventoryResource::collection($inventories);
        $this->data = [
            'total_assets' => $inventoryCount,
            'total_worth' => $totalWorth,
            'list' => $inventoryItems

        ];
        $this->apiSuccess();
        return $this->apiOutput(Response::HTTP_OK, "List of 'inventories ...");  
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(InventoryValidation $request)
    {
        try {
            DB::beginTransaction();
    
            $inventory = new Inventory();
            $inventory->name = $request->name;
            $inventory->quantity = $request->quantity;
            $inventory->value = $request->value;
            $inventory->batch_id = 1;
            $inventory->save();

            $inventory->inventory_id = $inventory->id;
            $inventory->save();

            $this->inventoryAttachmentService->create($request->all(), $inventory);
    
            DB::commit();
            Log::info("Inventory Store",$request->all());
            $this->data = $request->all();
            $this->apiSuccess();
            return $this->apiOutput(Response::HTTP_CREATED, 'Inventory created successfully');
        } catch (Exception $e) {
            DB::rollback();
            return $this->apiOutput(Response::HTTP_INTERNAL_SERVER_ERROR, 'Error occurred during inventory creation '.$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $inventory = $this->getInventory($id)->first();
            $inventoryItem = new InventoryResource($inventory);
            $this->data = $inventoryItem;
            $this->apiSuccess();
            return $this->apiOutput(Response::HTTP_OK, 'Inventory details retrieved successfully');
        } catch (Exception $e) {
            return $this->apiOutput(Response::HTTP_NOT_FOUND, 'Inventory not found');
        }
    }

    /**
     * Display the specified resource history.
     */
    public function history(string $id)
    {
        try {
            $inventories = Inventory::withTrashed()
                                    ->with('inventoryAttachment')
                                    ->where('inventory_id',$id)
                                    ->get();
            $inventoryItems = InventoryResource::collection($inventories);
            $this->data = $inventoryItems;
            $this->apiSuccess();
            return $this->apiOutput(Response::HTTP_OK, 'Inventory History details retrieved successfully');
        } catch (Exception $e) {
            return $this->apiOutput(Response::HTTP_NOT_FOUND, 'Inventory not found');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(InventoryValidation $request, string $id)
    {   
        try {
            DB::beginTransaction();

            $inventory = Inventory::where('inventory_id',$id)->first();
            if (!$inventory) {
                return $this->apiOutput(Response::HTTP_NOT_FOUND, 'Inventory not found');
            }
            $previousInventory = $inventory;

            // Check if any fields have been modified
            $fieldsModified = false;
            $fieldsToCheck = ['name', 'quantity'];

            foreach ($fieldsToCheck as $field) {
                if ($inventory->$field !== $request->$field) {
                    $inventory->$field = $request->$field;
                    $fieldsModified = true;
                }
            }

            if (!$fieldsModified) {
                return $this->apiOutput(Response::HTTP_NOT_FOUND, 'No change was made ...');
            }
            
            $copyInventory = $previousInventory->replicate();
            $this->inventoryAttachmentService->dumpPreviousBatch($previousInventory);

            $copyInventory->name = $request->name;
            $copyInventory->quantity = $request->quantity;
            $copyInventory->batch_id = $copyInventory->batch_id + 1;
            $copyInventory->save();

            $this->inventoryAttachmentService->create($request->all(), $copyInventory);

            DB::commit();

            $inventoryItem = new InventoryResource($inventory);
            $this->data = $inventoryItem;
            $this->apiSuccess();
            return $this->apiOutput(Response::HTTP_OK, 'Inventory updated successfully');
        } catch (Exception $e) {
            DB::rollback();
            return $this->apiOutput(Response::HTTP_INTERNAL_SERVER_ERROR, 'Error occurred during inventory update'.$e->getMessage());
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();

            $inventory = Inventory::find($id);

            if (!$inventory) {
                return $this->apiOutput(Response::HTTP_NOT_FOUND, 'Inventory not found');
            }

            $inventory->delete();

            DB::commit();

            $responseList = $this->index();
            $listInventory = json_decode($responseList->getContent());
            $this->data = $listInventory->data;

            return $this->apiOutput(Response::HTTP_OK, 'Inventory deleted successfully');
        } catch (Exception $e) {
            DB::rollback();

            return $this->apiOutput(Response::HTTP_INTERNAL_SERVER_ERROR, 'Error occurred during inventory deletion');
        }
    }

    /**
     * Serve resource from storage.
     *
     * @param Request $request
     * @return BinaryFileResponse
     */
    public function serveImage(Request $request): BinaryFileResponse
    {
        Log::info($request->fileName);
        $path = storage_path()."/app/".$request->fileName;
        // $path = storage_path()."/app/public/".$request->fileName;
        return response()->download($path);
    }

    /**
     * Download PDF BULK
     * @param string uuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function downloadPDFBulk() : JsonResponse
    {
        try {
            $responseList = $this->index();
            $listInventory = json_decode($responseList->getContent());
            $inventories = $listInventory->data->list;
            $this->data = $listInventory->data->list;
            
            $now = Carbon::now()->format('Y-m-d-H:i:s');
            $fileName = "Inventory-".$now. ".pdf";
            $filePath = "inventory.pdf";
    
            $pdf = Pdf::loadView($filePath, compact("inventories"))->setPaper('a4', 'landscape');
            $base64File = base64_encode($pdf->stream($fileName));
            // for direct download - return $pdf->stream($fileName) or $pdf->download($fileName)
    
            return response()->json(
                responseBuilder(
                    Response::HTTP_OK,
                    "Success",
                    [
                        "file_name" => $fileName,
                        "file" => $base64File,
                        "file_type" => StaticConstant::PDF_FILE_TYPE
                    ]
                ), Response::HTTP_OK);
        } catch(Exception $e) {
            return response()->json(
                responseBuilder(
                    Response::HTTP_INTERNAL_SERVER_ERROR,
                    "Failed ".$e->getMessage(),
                    [
                        
                    ]
                ), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }
    
        /**
     * Download PDF BULK
     * @param string uuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function downloadHistoryPDFFiltered($id) : JsonResponse
    {
        try {
            $inventories = Inventory::with('inventoryAttachment')
                                    ->withTrashed()
                                    ->where('inventory_id',$id)
                                    ->get();
                                    
            $inventories = InventoryResource::collection($inventories);
            
            $now = Carbon::now()->format('Y-m-d-H:i:s');
            $fileName = "Inventory-".$now. ".pdf";
            $filePath = "inventory.pdf";
    
            $pdf = Pdf::loadView($filePath, compact("inventories"))->setPaper('a4', 'landscape');
            $base64File = base64_encode($pdf->stream($fileName));
            // for direct download - return $pdf->stream($fileName) or $pdf->download($fileName)
    
            return response()->json(
                responseBuilder(
                    Response::HTTP_OK,
                    "Success",
                    [
                        "file_name" => $fileName,
                        "file" => $base64File,
                        "file_type" => StaticConstant::PDF_FILE_TYPE
                    ]
                ), Response::HTTP_OK);
        } catch(Exception $e) {
            return response()->json(
                responseBuilder(
                    Response::HTTP_INTERNAL_SERVER_ERROR,
                    "Failed ".$e->getMessage(),
                    [
                        
                    ]
                ), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    /**
     * Download PDF BULK with specific id
     * @param string uuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function downloadPDFFiltered($id) : JsonResponse
    {
        try{
            $inventory = $this->getInventory($id)->first();
            $inventoryItem = new InventoryResource($inventory);
            $inventories[] = json_decode($inventoryItem->toJson());
            
            $now = Carbon::now()->format('Y-m-d-H:i:s');
            $fileName = "Inventory-".$now. ".pdf";
            $filePath = "inventory.pdf";

            $pdf = Pdf::loadView($filePath, compact("inventories"))->setPaper('a4', 'landscape');
            $base64File = base64_encode($pdf->stream($fileName));
            // for direct download - return $pdf->stream($fileName) or $pdf->download($fileName)

            return response()->json(
                responseBuilder(
                    Response::HTTP_OK,
                    "Success",
                    [
                        "file_name" => $fileName,
                        "file" => $base64File,
                        "file_type" => StaticConstant::PDF_FILE_TYPE
                    ]
                ), Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(
                responseBuilder(
                    Response::HTTP_INTERNAL_SERVER_ERROR,
                    "Failed ".$e->getMessage(),
                    [
                        
                    ]
                ), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Download EXCEL BULK
     * @param string uuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function downloadExcelBulk() : JsonResponse
    {
        try {
            $responseList = $this->index();
            $listInventory = json_decode($responseList->getContent());
            $inventories = $listInventory->data->list;
            
            $now = Carbon::now()->format('Y-m-d-H:i:s');
            $fileName = "Inventory-".$now. ".xlsx";
    
            $spreadsheet = new InventoryExport($inventories);
            $writer = new Xlsx($spreadsheet->modifyExcel());
    
            ob_start();
            $writer->save('php://output');
            $base64File = base64_encode(ob_get_contents());
            ob_end_clean();
            
            return response()->json(
                responseBuilder(
                    Response::HTTP_OK,
                    "Success downloaded Excel Bulk",
                    [
                        "file_name" => $fileName,
                        "file" => $base64File,
                        "file_type" => StaticConstant::EXCEL_FILE_TYPE
                    ]
                ), Response::HTTP_OK);
        } catch(Exception $e) {
            return response()->json(
                responseBuilder(
                    Response::HTTP_INTERNAL_SERVER_ERROR,
                    "Failed ".$e->getMessage(),
                    [
                        
                    ]
                ), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Download EXCEL with specific id
     * @param string uuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function downloadExcelFiltered($id) : JsonResponse
    {
        try {
            $inventory = $this->getInventory($id)->first();
            $inventoryItem = new InventoryResource($inventory);
            $inventories[] = json_decode($inventoryItem->toJson());
            
            $now = Carbon::now()->format('Y-m-d-H:i:s');
            $fileName = "Inventory-".$now. ".xlsx";
            $spreadsheet = new InventoryExport($inventories);
            $writer = new Xlsx($spreadsheet->modifyExcel());
    
            ob_start();
            $writer->save('php://output');
            $base64File = base64_encode(ob_get_contents());
            ob_end_clean();
            
            return response()->json(
                responseBuilder(
                    Response::HTTP_OK,
                    "Success downloaded Excel with id ".$id." ...",
                    [
                        "file_name" => $fileName,
                        "file" => $base64File,
                        "file_type" => StaticConstant::EXCEL_FILE_TYPE
                    ]
                ), Response::HTTP_OK);
        } catch(Exception $e) {
            return response()->json(
                responseBuilder(
                    Response::HTTP_INTERNAL_SERVER_ERROR,
                    "Failed ".$e->getMessage(),
                    [
                        
                    ]
                ), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Download EXCEL with specific id
     * @param string uuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function downloadHistoryExcelFiltered($id) : JsonResponse
    {
        try {
            $inventories = Inventory::with('inventoryAttachment')
                                    ->withTrashed()
                                    ->where('inventory_id',$id)
                                    ->get();
                                    
            $inventories = InventoryResource::collection($inventories);
            
            $now = Carbon::now()->format('Y-m-d-H:i:s');
            $fileName = "Inventory-".$now. ".xlsx";
            $spreadsheet = new InventoryExport($inventories);
            $writer = new Xlsx($spreadsheet->modifyExcel());
    
            ob_start();
            $writer->save('php://output');
            $base64File = base64_encode(ob_get_contents());
            ob_end_clean();
            
            return response()->json(
                responseBuilder(
                    Response::HTTP_OK,
                    "Success downloaded Excel with id ".$id." ...",
                    [
                        "file_name" => $fileName,
                        "file" => $base64File,
                        "file_type" => StaticConstant::EXCEL_FILE_TYPE
                    ]
                ), Response::HTTP_OK);
        } catch(Exception $e) {
            return response()->json(
                responseBuilder(
                    Response::HTTP_INTERNAL_SERVER_ERROR,
                    "Failed ".$e->getMessage(),
                    [
                        
                    ]
                ), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
