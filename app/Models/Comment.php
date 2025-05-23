<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Comment extends Model
{
    use HasFactory;

    protected $table =  'comments';

    protected $fillable = ['news_id', 'content', 'parent_id', 'order'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
