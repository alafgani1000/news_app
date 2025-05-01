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
        $create_news = Permission::create(['name' => 'create_news']);
        $update_news = Permission::create(['name' => 'update_news']);
        $publish_news = Permission::create(['name' => 'publish_news'])
    }
}
