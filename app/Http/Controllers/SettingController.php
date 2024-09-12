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
use App\Models\MenuCategory;

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

    public function deleteCategory($id)
    {
        $category = Category::where('id',$id)->first();
        $category->delete();
        return 'Category Deleted';
    }

    public function dataMenu()
    {
        $menus = Menu::with('menuCategories')
            ->with(['menuCategories.category'])
            ->with(['menuCategories.user'])
            ->orderBy('name', 'asc')
            ->get();
        return $menus;
        return $menus;
    }

    public function storeMenu(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);
        $status = 0;
        if ($request->status == true) {
            $status = 1;
        } else {
            $status = 0;
        }
        $menu = Menu::create([
            'name' => $request->name,
            'url' => $request->url,
            'status' => $status,
            'user_id' => Auth::user()->id
        ]);
        return 'Menu Created';
    }

    public function updateMenu(Request $request, $id)
    {
        $request->validate([
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

    public function assignCategory(Request $request)
    {
        $menu = Menu::find($request->menu);
        $category = $request->category;
        $menu->categories()->attach($category, ['user_id' => Auth::user()->id]);
        return 'Assign Category Success';
    }

    public function removeCategory(Request $request)
    {
        $menu = Menu::find($request->menu);
        $category = $request->category;
        $menu->categories()->detach($category);
        return 'Remove Category Success';
    }

    public function categoryAvailableInMenu($id)
    {
        $categories = MenuCategory::with('category')
            ->where('menu_id', $id)
            ->get();
        return $categories;
    }

    public function categoryNotAvailableInMenu($id)
    {
        $menuCategories = MenuCategory::where('menu_id', $id)->get();
        $categories = Category::whereNotIn('id', $menuCategories->pluck('category_id'))->get();
        return $categories;
    }

}
