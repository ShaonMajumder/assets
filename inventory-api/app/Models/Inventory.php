<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    /**
     * @return hasMany
     */
    public function inventoryAttachment()
    {
        return $this->hasMany(InventoryAttachment::class, "inventory_id", "id");
    }
}
