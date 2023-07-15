<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Inventory;
use Illuminate\Support\Str;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Inventory::truncate();
        // Seed your inventory data
        Inventory::create([
            'uuid' => Str::uuid(),
            'inventory_id' => 1,
            'name' => 'Item 1',
            'quantity' => 10,
            'value' => 55
        ]);

        Inventory::create([
            'uuid' => Str::uuid(),
            'inventory_id' => 2,
            'name' => 'Item 2',
            'quantity' => 5,
            'value' => 25
        ]);

        // Add more inventory data as needed
    }
}
