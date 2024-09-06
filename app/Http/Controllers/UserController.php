<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->search;
        $perPage = isset($request->perPage) ? $request->perPage : 10;
        $sort = isset($request->sort) ? $request->sort : 'id';
        $roles = Role::orderBy('name','asc')->get();
        $users = User::where(function (Builder $query) use($search) {
            return $query->where('name', 'like', '%'.$search.'%')
                        ->orWhere('email', 'like', '%'.$search.'%');
        })->orderBy($sort)->paginate($perPage);
        return Inertia::render('User/Index', [
            'users' => $users,
            'pgSearch' => $search,
            'pgPerPage' => $perPage,
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|unique:'.User::class,
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'same:repassword'],
            'role' => ['required']
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request->role);

        return "Create User Success";
    }

    public function changeRole(Request $request, $id)
    {
        $dataUser =  User::where('id', $id)->first();
        if(!is_null($dataUser->roles()->first())) {
            $dataUser->removeRole($dataUser->roles()->first()->name);
        }
        $dataUser->assignRole($request->role);
    }
}
