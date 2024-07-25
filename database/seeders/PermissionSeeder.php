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
        $tambahPengguna = Permission::create(['name' => 'tambah-pengguna']);
        $ubahPengguna = Permission::create(['name' => 'ubah-pengguna']);
        $tambahPengguna = Permission::create(['name' => 'non-aktifkan-pengguna']);
        $tambahPengguna = Permission::create(['name' => 'aktifkan-pengguna']);

        $membuatRole = Permission::create(['name' => 'buat-role']);
        $ubahRole = Permission::create(['name' => 'ubah-role']);
        $hapusRole = Permission::create(['name' => 'hapus-role']);

    }
}
