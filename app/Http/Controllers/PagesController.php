<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Page;

class PagesController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->search;
        $perPage = isset($request->perPage) ? $request->perPage : 10;
        $sort = isset($requsest->sort) ? $request->sort : 'id';
        $pages = Page::where(function (Builder $query) use($search) {
                return $query->where('name', 'like', '%'.$search.'%')
                    ->orWhere('content', 'like', '%'.$search.'%');
            })
            ->orderBy($sort)
            ->paginate($perPage);
        return Inertia::render('Page/Page', [
            'pages' => $pages,
            'pgSearch' => $search,
            'pgPerPage' => $perPage,
            'pgSort' => $sort
        ]);
    }

    public function create($code)
    {
        return Inertia::render('Page/Create', ['code' => $code]);
    }

    public function store(Request $request, $code)
    {
        $request->validate([
            'name' => 'required',
        ]);
        Page::create([
            'code' => $code,
            'name' => $request->name,
            'content' => $request->content,
            'status' => 0
        ]);
        return 'Page Created';
    }

    public function edit($code)
    {
        $page = Page::where('code',$code)->first();
        return Inertia::render('Page/Edit', [
            'page' => $page
        ]);
    }

    public function update(Request $request, $code)
    {
        $request->validate([
            'name' => 'required',
        ]);
        Page::where('code', $code)->update([
            'name' => $request->name,
            'content' => $request->content,
            'status' => $request->status
        ]);
        return 'Page Updated';
    }

    public function publish(Request $request, $code)
    {
        $checkPage = Page::where('code',$code)->first();
        if (is_null($checkPage)) {
            $creat = Page::create([
                'code' => $code,
                'name' => $request->name,
                'content' => $request->content,
                'status' => 1
            ]);
        } else {
            $checkPage->name = $request->name;
            $checkPage->content = $request->content;
            $checkPage->status = 1;
            $checkPage->save();
        }
        return 'Page Published';
    }

    public function unpublish($id)
    {
        $page = Page::where('id',$id)->update([
            'status' => '0'
        ]);
        return 'Page Unpublished';
    }

    public function delete($id)
    {
        $delete = Page::where('id',$id)->delete();
        return 'Page Deleted';
    }
}
