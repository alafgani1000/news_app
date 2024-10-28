<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\News;
use App\Models\NewsCategory;

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

    public function create($code)
    {
        $news = News::where('code', $code)->first();
        return Inertia::render('News/Creates', [
            'code' => $code,
            'news' => $news
        ]);
    }

    public function store(Request $request, $code)
    {
        $request->validate([
            'title' => 'required',
        ]);
        $news = News::where('code', $code)->first();
        if (is_null($news)) {
            $news = News::create([
                'title' => $request->title,
                'content' => $request->content,
                'writer' => Auth::user()->id,
                'keywords' => $request->keywords,
                'tag' => $request->tag,
                'code' => $request->code,
                'image' => $request->image,
                'status' => 0
            ]);
            $news->newsCategory()->create([
                'category_id' => $request->category,
                'user_id' => Auth::user()->id
            ]);
        } else {
            $update = News::where('code',$code)->update([
                'title' => $request->title,
                'content' => $request->content,
                'writer' => Auth::user()->id,
                'keywords' => $request->keywords,
                'tag' => $request->tag,
                'image' => $request->image
            ]);
            $newsCategory = NewsCategory::where('news_id',$news->id)->update([
                'category_id' => $request->category,
                'user_id' => Auth::user()->id
            ]);
        }

        return 'Create News Success';
    }

    public function publish(Request $request, $code)
    {
        $request->validate([
            'title' => 'required',
        ]);
        $news = News::where('code', $code)->first();
        if (is_null($news)) {
            $news = News::create([
                'title' => $request->title,
                'content' => $request->content,
                'writer' => Auth::user()->id,
                'editor' => Auth::user()->id,
                'keywords' => $request->keywords,
                'tag' => $request->tag,
                'code' => $request->code,
                'image' => $request->image,
                'status' => 1
            ]);
            $news->newsCategory()->create([
                'category_id' => $request->category,
                'user_id' => Auth::user()->id
            ]);
        } else {
            $update = News::where('code',$code)->update([
                'title' => $request->title,
                'content' => $request->content,
                'editor' => Auth::user()->id,
                'keywords' => $request->keywords,
                'tag' => $request->tag,
                'image' => $request->image,
                'status' => 1
            ]);
            $newsCategory = NewsCategory::where('news_id',$news->id)->update([
                'category_id' => $request->category,
                'user_id' => Auth::user()->id
            ]);
        }

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
        $newsCategory = NewsCategory::where('news_id',$id)->update([
            'category_id' => $request->category,
            'user_id' => Auth::user()->id
        ]);
        return 'Update News Success';
    }

    public function delete($id)
    {
        $news = News::find($id);
        $newsCategory = NewsCategory::where('news_id', $news->id)->first();
        $newsCategory->delete();
        $news->delete();
        return 'News Deleted';
    }

    public function latest_post()
    {
        $latests = News::with(['writer','newsCategory', 'newsCategory.category'])
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();
        $latest1 = $latests->sortByDesc('created_at')->take(1)->first();
        $latest2 = News::with(['writer','newsCategory', 'newsCategory.category'])
            ->where('id','!=',$latest1->id)
            ->orderBy('created_at', 'desc')
            ->limit(2)
            ->get();
        return [
            'latest1' => $latest1,
            'latest2' => $latest2
        ];
    }

    public function group_by_categories()
    {

    }

    public function home(Request $request)
    {
        $search = $request->search;
        $perPage = isset($request->perPage) ? $request->perPage : 10;
        $sort = isset($request->sort) ? $request->sort : 'created_at';
        $latests = $this->latest_post();
        $latest1 = $latests['latest1'];
        $latest2 = $latests['latest2'];
        return Inertia::render('Home', [
            'latest1' => $latest1,
            'latest2' => $latest2
        ]);
    }

    public function newNews()
    {
        $news = News::take(4)->orderBy('created_at', 'asc')->get();
        return $news;
    }

    public function single()
    {
        return Inertia::render('Single');
    }

}
