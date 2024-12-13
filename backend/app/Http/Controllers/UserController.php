<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $students = auth()->user()->students;

        return response()->json($students);
    }
}
