<?php

namespace App\Models;

use App\Models\User;
use App\Models\Projet;
use App\Models\Document;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_service',
        'status_service',
        'description_service',
    ];

        /**
         * Get all of the comments for the Service
         *
         * @return \Illuminate\Database\Eloquent\Relations\HasMany
         */
        public function users()
        {
            return $this->hasMany(User::class);
        }
        public function projets()
        {
            return $this->hasMany(Projet::class);
        }
        /**
         * Get all of the comments for the Service
         *
         * @return \Illuminate\Database\Eloquent\Relations\HasMany
         */
        public function documents()
        {
            return $this->hasMany(Document::class);
        }
}