<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Awobaz\Compoships\Compoships;

class Inventory extends Model
{
    use HasFactory,SoftDeletes,Compoships;
    protected $fillable = ['name'];

    /**
     * @return hasMany
     */
    public function inventoryAttachment()
    {
        return $this->hasMany(InventoryAttachment::class, ["inventory_id", "batch_id"], ["inventory_id", "batch_id"])            
                    ->withTrashed();
    }
}
