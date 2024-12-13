<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        "nombre",
        "apellido",
        "dni",
        "email"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
