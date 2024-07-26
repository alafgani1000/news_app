<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->search;
        $perPage = isset($request->perPage) ? $request->perPage : 10;
        $sort = isset($request->sort) ? $request->sort : 'name';
        $permissions = Permission::orderBy('name','asc')->get();
        $roles = Role::with('permissions')->where(function (Builder $query) use($search) {
            return $query->where('name', 'like', '%'.$search.'%');
        })->orderBy($sort)->paginate($perPage);
        return Inertia::render('RolePermission/Index', [
            'roles' => $roles,
            'pgSearch' => $search,
            'pgPerPage' => $perPage,
            'permissions' => $permissions
        ]);
    }

    public function dataPermission($id)
    {
        $data = Role::with('permissions')
            ->where('id',$id)
            ->orderBy('created_at','desc')
            ->first();
        return $data;
    }

    public function store(Request $request)
    {
        $request->validate([
            'permissionName' => 'required',
            'roleName' => 'required'
        ]);
        $role = Role::where('name',$request->roleName)->first();
        $setPermission = $role->givePermissionTo($request->permissionName);
        return 'Gived Success';
    }

    public function revoke(Request $request)
    {
        $request->validate([
            'permissionName' => 'required',
            'roleName' => 'required'
        ]);
        $role = Role::where('name',$request->roleName)->first();
        $revokePermission = $role->revokePermissionTo($request->permissionName);
        return 'Revoke Success';
    }
}
