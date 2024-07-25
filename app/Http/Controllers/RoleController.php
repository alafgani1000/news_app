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

class RoleController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->search;
        $perPage = isset($request->perPage) ? $request->perPage : 10;
        $sort = isset($request->sort) ? $request->sort : 'name';
        $roles = Role::where(function (Builder $query) use($search) {
            return $query->where('name', 'like', '%'.$search.'%');
        })->orderBy($sort)->paginate($perPage);
        return Inertia::render('Role/Index', [
            'roles' => $roles,
            'pgSearch' => $search,
            'pgPerPage' => $perPage
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);
        Role::create([
            'name' => $request->name
        ]);
        return 'Store Success';
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required'
        ]);
        Role::where('id',$id)->update([
            'name' => $request->name
        ]);
        return 'Update Success';
    }

    public function delete(Request $request, $id)
    {
        Role::where('id',$id)->delete();
        return 'Delete Success';
    }

}
