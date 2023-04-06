<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjetUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'projet_id',
        'user_id',
    ];
}