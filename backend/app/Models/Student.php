<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        "name",
        "lastname",
        "email",
        "dni"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}