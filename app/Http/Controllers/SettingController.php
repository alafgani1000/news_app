<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Category;
use App\Models\Menu;

class SettingController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Setting/Setting', []);
    }

    public function dataCategory()
    {
        $categories = Category::orderBy('name','asc')->get();
        return $categories;
    }

    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);
        $category = Category::create([
            'name' => $request->name,
            'user_id' => Auth::user()->id
        ]);
        return 'Category Created';
    }

    public function updateCategory(Request $request, $id)
    {
        $request->validate([
            'name' => 'required'
        ]);
        $category = Category::where('id',$id)->update([
            'name' => $request->name
        ]);
        return 'Category Updated';
    }

    public function delete($id)
    {
        $category = Category::where('id',$id)->first();
        $category->delete();
        return 'Category Deleted';
    }

    public function dataMenu()
    {
        $menus = Menu::orderBy('name','asc')->get();
        return $menus;
    }

    public function storeMenu(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);
        $menu = Menu::create([
            'name' => $request->name,
            'url' => $request->url,
            'status' => 1,
            'user_id' => Auth::user()->id
        ]);
        return 'Menu Created';
    }

    public function updateMenu(Request $request, $id)
    {
        $request->valdiate([
            'name' => 'required'
        ]);
        $menu = Menu::where('id',$id)->update([
            'name' => $request->name,
            'url' => $request->url,
            'status' => $request->status
        ]);
        return 'Menu Updated';
    }

    public function deleteMenu($id)
    {
        $menu = Menu::where('id',$id)->first();
        $menu->delete();
        return 'Menu Deleted';
    }

}
