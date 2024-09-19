<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\News;
use App\Models\Category;

class NewsCategory extends Model
{
    use HasFactory;

    protected $table = "news_categories";

    protected $fillable = ['category_id', 'news_id', 'user_id'];

    public function news()
    {
        return $this->belongsTo(News::class, 'news_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
