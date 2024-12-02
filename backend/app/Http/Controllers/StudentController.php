<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

use function Termwind\render;

class StudentController extends Controller
{
    public function index()
    {
        return Student::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required',
            'apellido' => 'required',
            'dni' => 'required',
            'email' => 'nullable|email'
        ]);

        if($validated)
        {
            $student = Student::create($validated);
            return ["student" => $student];
        }
    }
    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'nombre' => 'required',
            'apellido' => 'required',
            'dni' => 'required',
            'email' => 'nullable|email'
        ]);

        if($validated)
        {
            $student = Student::findOrFail($id);
            $student->update($validated);
            return ["student" => $student];
        }
    }
}
