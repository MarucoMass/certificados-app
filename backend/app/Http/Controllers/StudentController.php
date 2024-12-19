<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            $students = Student::all();
        } else {
            $students = $user->students()->get();
        }

        return response()->json([
            'message' => 'Estudiantes obtenidos correctamente',
            'data' => $students,
        ], 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'dni' => 'required|string|size:8|unique:students,dni' // Validación de longitud fija
        ]);

        $student = $request->user()->students()->create($validatedData);

        $student->makeHidden(['email', 'dni', 'user_id', 'created_at', 'updated_at']);

        return response()->json([
            'message' => 'Estudiante creado correctamente',
            'data' => $student,
        ], 201);
    }

    public function update(Request $request, Student $student)
    {
        Gate::authorize('modify', $student);

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'lastname' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:students,email,' . $student->id, // Excluir el email del propio estudiante
            'dni' => 'nullable|string|size:8|unique:students,dni,' . $student->id, // Excluir el DNI del propio estudiante
        ]);

        $student->update(array_filter($validated));

        $student->makeHidden(['email', 'dni', 'user_id', 'created_at', 'updated_at']);

        return response()->json([
            'message' => 'Estudiante actualizado correctamente',
            'data' => $student
        ], 200);
    }

    public function destroy(Student $student)
    {
  
        Gate::authorize('modify', $student);

        $student->delete();

        $student->makeHidden(['email', 'dni', 'user_id', 'created_at', 'updated_at']);

        return response()->json([
            'message' => 'Alumno eliminado con éxito',
            'data' => $student 
        ], 200);
    }
}


