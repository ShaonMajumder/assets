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
            'name' => 'Item 1',
            'quantity' => 10,
        ]);

        Inventory::create([
            'uuid' => Str::uuid(),
            'name' => 'Item 2',
            'quantity' => 5,
        ]);

        // Add more inventory data as needed
    }
}
