<?php

namespace App\Models;

use App\Models\Caisse;
use App\Models\Projet;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Caisse extends Model
{
    use HasFactory;
    protected $fillable = [
        'titre_caisse',
        'somme',
        'projet_id',
        'status_caisse',
        'description_caisse'
    ];

    /**
     * Get the user that owns the Caisse
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function projet(): BelongsTo
    {
        return $this->belongsTo(Projet::class);
    }

}