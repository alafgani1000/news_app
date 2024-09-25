<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\NewsCategory;

class News extends Model
{
    use HasFactory;

    protected $table = 'news';

    protected $fillable = ['title', 'content', 'writer', 'keywords', 'editor', 'like', 'click', 'tag', 'status', 'code', 'image'];

    public function writer()
    {
        return $this->belongsTo(User::class, 'writer');
    }

    public function newsCategory()
    {
        return $this->hasOne(NewsCategory::class, 'news_id');
    }
}

