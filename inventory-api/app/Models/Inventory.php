<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Inventory extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = ['name'];

    /**
     * @return hasMany
     */
    public function inventoryAttachment()
    {
        return $this->hasMany(InventoryAttachment::class, "inventory_id", "inventory_id");
    }
}
