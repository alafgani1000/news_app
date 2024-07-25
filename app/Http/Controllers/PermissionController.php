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

class PermissionController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->search;
        $perPage = isset($request->perPage) ? $request->perPage : 10;
        $sort = isset($request->sort) ? $request->sort : 'name';
        $permissions = Permission::where(function (Builder $query) use($search) {
            return $query->where('name', 'like', '%'.$search.'%');
        })->orderBy($sort)->paginate($perPage);
        return Inertia::render('Permission/Index', [
            'permissions' => $permissions,
            'pgSearch' => $search,
            'pgPerPage' => $perPage
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);
        Permission::create([
            'name' => $request->name
        ]);
        return 'Store Success';
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required'
        ]);
        Permission::where('id',$id)->update([
            'name' => $request->name
        ]);
        return 'Update Success';
    }

    public function delete(Request $request, $id)
    {
        Permission::where('id',$id)->delete();
        return 'Delete Success';
    }

}
