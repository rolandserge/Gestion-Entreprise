<?php

namespace App\Models;

use App\Models\User;
use App\Models\Projet;
use App\Models\Service;
use App\Models\Document;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{
    use HasFactory;
    protected $fillable = [
        'titre',
        'langue',
        "document",
        'visibilité',
        'service_id',
        'projet_id',
        'user_id',
        'status_doc',
        'description_doc'
    ];

    /**
     * Get the user that owns the Document
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
    /**
     * Get the user that owns the Document
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function projet(): BelongsTo
    {
        return $this->belongsTo(Projet::class);
    }
}