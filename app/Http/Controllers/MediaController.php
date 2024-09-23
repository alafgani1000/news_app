<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Media;

class MediaController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->search;
        $perPage = isset($request->perPage) ? $request->perPage : 10;
        $sort = isset($request->sort) ? $request->sort : 'created_at';
        $media = Media::where(function (Builder $query) use($search) {
            return $query->where('name', 'like', '%'.$search.'%');
        })->orderBy($sort)->paginate($perPage);
        return Inertia::render('Media/Media', [
            'media' => $media,
            'pgSearch' => $search,
            'pgPerPage' => $perPage,
            'pgSort' => $sort
        ]);
    }

    /**
     * memudahkan membaca file
     * konversi dari byte ke kb, mb, or gb
     */
    public function convert($size,$unit = 'B')
    {
        if ($size >= 1024) {
            $size = $size / 1024;
            $unit = 'KB';
        } else if ($size >= 1048576) {
            $size = $size / 1048576;
            $unit = 'MB';
        } else if ($size >= 1073741824) {
            $size = $size / 1073741824;
            $unit = 'GB';
        }
        return [round($size,2), $unit];
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required'
        ]);
        $image = $request->file('image');
        $file_name = $image->hashName();
        $name = $image->getClientOriginalName();
        $extension = $image->getClientOriginalExtension();
        $size = $image->getSize();
        $path = $image->store('images', 'public');
        $upload = Media::create([
            'name' => $name,
            'file_name' => $file_name,
            'path' => $path,
            'size' => $size,
            'extension' => $extension,
            'user_id' => Auth::user()->id
        ]);
        return 'File Uploaded';
    }
}
