<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Setting/Setting', []);
    }
}
