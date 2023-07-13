<?php

namespace App\Services\V1;

use App\Helpers\FileUploader;
use App\Helpers\StaticConstant;
use App\Models\Inventory;
use App\Models\InventoryAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
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

        if (count($request['files']) > 0)
        {
            foreach ($request['files'] as $image)
            {
                $path = FileUploader::storeFile($image, StaticConstant::INVENTORY_ATTACHMENT_IMAGE_DIRECTORY);

                $images[] = [
                    "inventory_id" => $inventory->inventory_id,
                    "batch_id" => $inventory->batch_id,
                    "file_path" => $path
                ];
             }

            InventoryAttachment::insert($images);
        }

        return true;
    }

    /**
     * Compare Images before saving if this image is previously uploaded
     */
    public function compareImages(Request $request)
    {
        // Retrieve the uploaded image from the request
        $uploadedImage = $request->file('image');

        // Retrieve the path to the image stored on disk
        $diskImagePath = 'path/to/image.jpg'; // Replace with the actual path to your stored image

        // Calculate the hash values of the uploaded image and the image on disk
        $uploadedImageHash = hash_file('sha256', $uploadedImage->path());
        $diskImageHash = hash_file('sha256', Storage::path($diskImagePath));

        // Compare the hash values
        if ($uploadedImageHash === $diskImageHash) {
            // The images are the same
            return false;
        } else {
            // The images are different
            return true;
        }
    }

    public function dumpPreviousBatch($inventory){
        Inventory::where('inventory_id',$inventory->inventory_id)
                 ->where('batch_id',$inventory->batch_id)
                 ->delete();

        InventoryAttachment::where('inventory_id',$inventory->inventory_id)
                           ->where('batch_id',$inventory->batch_id )
                           ->delete();
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
