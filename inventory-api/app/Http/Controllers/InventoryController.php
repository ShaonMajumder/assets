<?php

namespace App\Http\Controllers;

use App\Http\Resources\InventoryResource;
use App\Http\Traits\ApiTrait;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InventoryController extends Controller
{
    use ApiTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inventories = Inventory::all();
        $inventoryItems = InventoryResource::collection($inventories);
        $this->data = $inventoryItems;
        $this->apiSuccess();
        return $this->apiOutput(Response::HTTP_OK, "List of 'inventories ...");  
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }
}
