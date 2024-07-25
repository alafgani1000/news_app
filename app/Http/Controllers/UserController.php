<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->search;
        $perPage = isset($request->perPage) ? $request->perPage : 10;
        $sort = isset($request->sort) ? $request->sort : 'id';
        $users = User::where(function (Builder $query) use($search) {
            return $query->where('name', 'like', '%'.$search.'%')
                        ->orWhere('email', 'like', '%'.$search.'%');
        })->orderBy($sort)->paginate($perPage);
        return Inertia::render('User/Index', [
            'users' => $users,
            'pgSearch' => $search,
            'pgPerPage' => $perPage
        ]);
    }

    public function store()
    {

    }
}
