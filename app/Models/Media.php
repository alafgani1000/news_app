<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    protected $table = 'media';

    protected $fillable = ['file_name', 'name', 'path', 'size', 'caption', 'user_id', 'extension'];
}
