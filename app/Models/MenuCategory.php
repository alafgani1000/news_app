<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\Category;

class MenuCategory extends Pivot
{
    use HasFactory;

    /**
     * Get the user that owns the MenuCategory
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the user associated with the MenuCategory
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
