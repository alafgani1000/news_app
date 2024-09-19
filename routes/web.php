<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\SettingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // user
    Route::get('/users', [UserController::class, 'index'])->name('user.index');
    Route::get('/user/create', [UserController::class, 'create'])->name('user.create');

    // role
    Route::get('/roles', [RoleController::class, 'index'])->name('role.index');
    Route::post('/role', [RoleController::class, 'store'])->name('role.store');
    Route::put('/role/{id}/update', [RoleController::class, 'update'])->name('role.update');
    Route::delete('/role/{id}/delete', [RoleController::class, 'delete'])->name('role.delete');

    // permission
    Route::get('/permissions', [PermissionController::class, 'index'])->name('permission.index');
    Route::post('/permission', [PermissionController::class, 'store'])->name('permission.store');
    Route::put('/permission/{id}/update', [PermissionController::class, 'update'])->name('permission.update');
    Route::delete('/permission/{id}/delete', [PermissionController::class, 'delete'])->name('permission.delete');

    // Role have permission
    Route::get('/role-permissions', [RolePermissionController::class, 'index'])->name('role-perms.index');
    Route::post('/role-permission', [RolePermissionController::class, 'store'])->name('role-perms.store');
    Route::post('/role-permission-revoke', [RolePermissionController::class, 'revoke'])->name('role-perms.revoke');
    Route::get('/role-permission/{id}/data', [RolePermissionCOntroller::class, 'dataPermission'])->name('role-perms.data');

    // news
    Route::get('/news', [NewsController::class, 'index'])->name('news.index');
    Route::post('/news', [NewsController::class, 'store'])->name('news.store');
    Route::post('/news-publish', [NewsController::class, 'publish'])->name('news.publish');
    Route::get('/news-create', [NewsController::class, 'create'])->name('news.create');
    Route::get('/news/{id}/edit', [NewsController::class, 'edit'])->name('news.edit');
    Route::put('/news/{id}/unpublish', [NewsController::class, 'unpublish'])->name('news.unpublish');

    // media
    Route::get('/media', [MediaController::class, 'index'])->name('media.index');

    // setting
    Route::get('/setting', [SettingController::class, 'index'])->name('setting.index');

    // category
    Route::get('/category', [SettingController::class,  'dataCategory'])->name('category.data');
    Route::post('/category', [SettingController::class, 'storeCategory'])->name('category.store');
    Route::put('/category/{id}/update', [SettingController::class, 'updateCategory'])->name('category.update');
    Route::delete('/category/{id}/delete', [SettingController::class, 'deleteCategory'])->name('category.delete');

    // menu
    Route::get('/menu', [SettingController::class, 'dataMenu'])->name('menu.data');
    Route::post('/menu', [SettingController::class, 'storeMenu'])->name('menu.store');
    Route::put('/menu/{id}/update', [SettingController::class, 'updateMenu'])->name('menu.update');
    Route::delete('/menu/{id}/delete', [SettingController::class, 'deleteMenu'])->name('menu.delete');

    // menu category
    Route::get('/menu-category', [SettingController::class, 'menuCategory'])->name('menu-category.data');
    Route::post('/menu-category-assign', [SettingController::class, 'assignCategory'])->name('menu-category.assign');
    Route::post('/menu-category-remove', [SettingController::class, 'removeCategory'])->name('menu-category.remove');
    Route::get('/menu-category/{id}/available', [SettingController::class, 'categoryAvailableInMenu'])->name('menu-category.available');
    Route::get('/menu-category/{id}/not-available', [SettingController::class, 'categoryNotAvailableInMenu'])->name('menu-category.notavailable');

    // media
    Route::post('/media-upload', [MediaController::class, 'uploadImage'])->name('media.upload');


});

require __DIR__.'/auth.php';
