<?php

namespace App\Models;

use App\Models\User;
use App\Models\Tache;
use App\Models\Service;
use App\Models\Document;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Projet extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom_projet',
        'chef_projet',
        'user_id',
        'service_id',
        'date_debut',
        'auteur_id',
        "date_fin",
        'statut_projet',
        'description_projet',
    ];

    /**
     * Get all of the comments for the Projet
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function caisses(): HasMany
    {
        return $this->hasMany(Caisse::class);
    }

    /**
     * Get all of the comments for the Projet
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function taches(): HasMany
    {
        return $this->hasMany(Tache::class);
    }
    /**
     * Get the user that owns the Projet
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
    /**
     * Get all of the comments for the Projet
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }
}
