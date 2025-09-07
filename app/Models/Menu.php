<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Category;
use App\Models\MenuCategory;

class Menu extends Model
{
    use HasFactory;

    protected $table = 'menus';

    protected $fillable = ['name', 'url', 'status', 'user_id', 'order_index'];

    /**
     * The roles that belong to the Menu
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'menu_category', 'menu_id', 'category_id')->using(MenuCategory::class)->withPivot('user_id')->withTimestamps();
    }

    /**
     * Get all of the
     *  for the Menu
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function menuCategories(): HasMany
    {
        return $this->hasMany(MenuCategory::class, 'menu_id');
    }
}
