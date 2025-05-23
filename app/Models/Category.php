<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\NewsCategory;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = ['name', 'user_id'];

    /**
     * The roles that belong to the Category
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function menus(): BelongsToMany
    {
        return $this->belongsToMany(Menu::class, 'menu_category', 'menu_id', 'category_id')->using(MenuCategory::class);
    }

    public function newsCategory()
    {
        return $this->hasMany(NewsCategory::class, 'category_id');
    }

    public function newsCategory4()
    {
        return $this->hasMany(NewsCategory::class, 'category_id')->limit(4);
    }


}
