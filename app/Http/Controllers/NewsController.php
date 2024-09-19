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
        $search = $request->search;
        $perPage = isset($request->perPage) ? $request->perPage : 10;
        $sort = isset($request->sort) ? $request->sort : 'created_at';
        $news = News::with(['writer','newsCategory', 'newsCategory.category'])->where(function (Builder $query) use($search) {
            return $query->where('title', 'like', '%'.$search.'%')
                        ->orWhere('content', 'like', '%'.$search.'%');
        })->orderBy($sort)->paginate($perPage);
        return Inertia::render('News/News', [
            'news' => $news,
            'pgSearch' => $search,
            'pgPerPage' => $perPage,
            'pgSort' => $sort
        ]);
    }

    public function create()
    {
        return Inertia::render('News/Creates', []);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
        ]);
        $news = News::create([
            'title' => $request->title,
            'content' => $request->content,
            'writer' => Auth::user()->id,
            'keywords' => $request->keywords,
            'tag' => $request->tag,
        ]);
        $news->newsCategory()->create([
            'category_id' => $request->category,
            'user_id' => Auth::user()->id
        ]);
        return 'Create News Success';
    }

    public function publish(Request $request)
    {
        $request->validate([
            'title' => 'required'
        ]);
        $news = News::create([
            'title' => $request->title,
            'content' => $request->content,
            'writer' => Auth::user()->id,
            'keywords' => $request->keywords,
            'tag' => $request->tag,
            'status' => 1
        ]);
        return 'Publish News Success';
    }

    public function unpublish(Request $request, $id)
    {
        $request->validate([
            'title' => 'required'
        ]);
        $news = News::where('id',$id)->update([
            'title' => $request->title,
            'content' => $request->content,
            'writer' => Auth::user()->id,
            'keywords' => $request->keywords,
            'tag' => $request->tag,
            'status' => 0
        ]);
        return 'Un Publish News Success';
    }

    public function edit(Request $request, $id)
    {
        $news = News::with(['writer','newsCategory', 'newsCategory.category'])->where('id',$id)->first();
        return Inertia::render('News/Edit', [
            'news' => $news
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
        ]);
        $news = News::where('id',$id)->update([
            'title' => $request->title,
            'content' => $request->content,
            'keywords' => $request->keywords,
            'tag' => $request->tag,
        ]);
        return 'Update News Success';
    }



    public function delete($id)
    {

    }

}
