<?php

namespace App\Services\V1;

use App\Helpers\FileUploader;
use App\Helpers\StaticConstant;
use App\Models\InventoryAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

/*
 *
 */
class InventoryAttachmentService
{
    /**
     * @param array $request
     * @return bool
     */
    public function create(array $request, $inventory): bool
    {
        Log::info("Attachment Service");
        Log::info(json_encode($request));
        Log::info(json_encode($inventory));
        Log::info($request['files']);

        if (count($request['files']))
        {
            foreach ($request['files'] as $image)
            {
                $path = FileUploader::storeFile($image, StaticConstant::INVENTORY_ATTACHMENT_IMAGE_DIRECTORY);

                $images[] = [
                    "inventory_id" => $inventory->id,
                    "file_path" => $path
                ];
             }

            InventoryAttachment::insert($images);
        }

        return true;
    }

    /**
     * @param array $request
     * @param InventoryAttachment $requestOrderProductItem
     * @return InventoryAttachment
     */
    public function update(array $request, InventoryAttachment $requestOrderProductItem): InventoryAttachment
    {
        $requestOrderProductItem->fill($request);
        $requestOrderProductItem->save();
        return $requestOrderProductItem;
    }

    /**
     * @param InventoryAttachment $requestOrderProductItems
     * @return void
     */
    public function destroy(InventoryAttachment $requestOrderProductItems): void
    {
        $requestOrderProductItems->delete();
    }
}
