<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $create = Permission::create(['name' => 'create_news']);
        $update = Permission::create(['name' => 'update_news']);
        $publish = Permission::create(['name' => 'publish_news']);
        $delete = Permission::create(['name' => 'delete_news']);

    }
}
