<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Media/Media', []);
    }

    public function uploadImage(Request $request)
    {
        // dd($request->all());
        /* example response
        {
            "type" : "image",
            "data" : {
                "file": {
                    "url" : "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg"
                },
                "caption" : "Roadster // tesla.com",
                "withBorder" : false,
                "withBackground" : false,
                "stretched" : true
            }
        }*/
        $image = $request->file('image');
        $path = $image->store('images', 'public');
        return response()->json([
            "type" =>  "image",
            "data" => [
                "file" => [
                    "url" => "http://localhost:8000/storage/". $path
                ],
                "caption" => "Roadster",
                "withBorder" => false,
                "withBackground" => false,
                "stretched" => true
            ]
        ]);

    }
}
