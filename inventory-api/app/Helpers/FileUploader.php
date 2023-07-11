<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;

class FileUploader
{
    public static function storeFile(UploadedFile $file, string|null $directoryName = null): bool|string
    {
        $imageName = Uuid::uuid4() . '.' . $file->extension();
        $directoryName = $directoryName ?? "inventory-files";
        // $directoryName .= "/" . request()->offsetGet('user_id');
        return Storage::putFileAs($directoryName, $file, $imageName);
    }

    public static function deleteFile(string|array $fileName): bool
    {
        if (!is_array($fileName)) {
            $fileName = [$fileName];
        }
        return Storage::delete($fileName);
    }
}
