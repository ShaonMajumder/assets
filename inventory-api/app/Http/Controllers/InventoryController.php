<?php

namespace App\Http\Controllers;

use App\Http\Requests\InventoryValidation;
use App\Http\Resources\InventoryResource;
use App\Http\Traits\ApiTrait;
use App\Models\Inventory;
use App\Services\V1\InventoryAttachmentService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class InventoryController extends Controller
{
    use ApiTrait;

    public InventoryAttachmentService $inventoryAttachmentService;

    public function __construct( InventoryAttachmentService $inventoryAttachmentService )
    {
        $this->inventoryAttachmentService = $inventoryAttachmentService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inventories = Inventory::with('inventoryAttachment')->get();
        

        $inventoryItems = InventoryResource::collection($inventories);
        $this->data = $inventoryItems;
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
    
            $inventory->save();

            

            $this->inventoryAttachmentService->create($request->all(), $inventory);
    
            DB::commit();
            Log::info("Inventory Store",$request->all());
            $this->data = $request->all();
            $this->apiSuccess();
            return $this->apiOutput(Response::HTTP_CREATED, 'Inventory created successfully');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->apiOutput(Response::HTTP_INTERNAL_SERVER_ERROR, 'Error occurred during inventory creation');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $inventory = Inventory::findOrFail($id);
            $inventoryItem = new InventoryResource($inventory);
            $this->data = $inventoryItem;
            $this->apiSuccess();
            return $this->apiOutput(Response::HTTP_OK, 'Inventory details retrieved successfully');
        } catch (Exception $e) {
            return $this->apiOutput(Response::HTTP_NOT_FOUND, 'Inventory not found');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
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
}
