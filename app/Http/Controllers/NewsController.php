<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\News;

class NewsController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('News/News', []);
    }

    public function create()
    {

    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'keywords' => 'required'
        ]);
        $news = News::create([
            'title' => $request->title,
            'content' => $request->content,
            'writer' => Auth::user()->id,
            'keywords' => $request->keywords,
            'reference' => $request->reference
        ]);
        return 'Create News Success';
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'keywords' => 'required'
        ]);
        $news = News::where('id',$id)->update([
            'title' => $request->title,
            'content' => $request->content,
            'keywords' => $request->keywords,
            'reference' => $request->reference
        ]);
        return 'Update News Success';
    }

    public function delete($id)
    {

    }

}
