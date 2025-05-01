<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::where('name','admin')->first();
        $setPermission = $role->givePermissionTo('create_news');
        $setPermission = $role->givePermissionTo('update_news');
        $setPermission = $role->givePermissionTo('publish_news');
    }
}
