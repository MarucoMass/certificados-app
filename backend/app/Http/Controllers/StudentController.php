<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class StudentController extends Controller
{
    // public function __construct()
    // {
    //     // Aplicar el middleware de autenticación
    //     $this->middleware('auth:sanctum');
    // }

    public function store(Request $request)
    {
        // Validar los datos
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'dni' => 'required|string|size:8|unique:students,dni' // Validación de longitud fija
        ]);

        // Crear el estudiante asociado al usuario autenticado
        $student = $request->user()->students()->create($validatedData);

        // Ocultar los campos sensibles
        $student->makeHidden(['email', 'dni', 'user_id', 'created_at', 'updated_at']);

        return response()->json([
            'message' => 'Estudiante creado correctamente',
            'data' => $student,
        ], 201);
    }

    public function update(Request $request, Student $student)
    {
        // Verificar si el usuario tiene permiso para modificar este estudiante
        Gate::authorize('modify', $student);

        // Validar los datos
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,' . $student->id,  // Excluir el email del propio estudiante al actualizar
            'dni' => 'required|string|size:8|unique:students,dni,' . $student->id  // Excluir el DNI del propio estudiante
        ]);

        // Actualizar el estudiante
        $student->update($validated);

        // Ocultar los campos sensibles
        $student->makeHidden(['email', 'dni', 'user_id', 'created_at', 'updated_at']);

        return response()->json([
            'message' => 'Estudiante actualizado correctamente',
            'data' => $student,
        ], 200);
    }

    public function destroy(Student $student)
    {
        // Verificar si el usuario tiene permiso para modificar este estudiante
        Gate::authorize('modify', $student);

        // Eliminar el estudiante
        $student->delete();

        $student->makeHidden(['email', 'dni', 'user_id', 'created_at', 'updated_at']);

        return response()->json([
            'message' => 'Alumno eliminado con éxito',
            'data' => $student  // Opcionalmente, devolver los detalles del estudiante eliminado
        ], 200);
    }
}


// namespace App\Http\Controllers;

// use App\Models\Student;
// use Illuminate\Http\Request;
// use Illuminate\Routing\Controllers\HasMiddleware;
// use Illuminate\Routing\Controllers\Middleware;
// use Illuminate\Support\Facades\Gate;

// class StudentController extends Controller implements HasMiddleware
// {

//     public static function middleware()
//     {
//         return [
//             new Middleware('auth:sanctum')
//         ];
//     }

//     public function store(Request $request)
//     {
//         // Validar los datos
//         $validatedData = $request->validate([
//             'name' => 'required|string|max:255',
//             'lastname' => 'required|string|max:255',
//             'email' => 'required|email|unique:students,email',
//             'dni' => 'required|string|size:8|unique:students,dni' // Validación de longitud fija
//         ]);

//         // Crear el estudiante asociado al usuario autenticado
//         $student = $request->user()->students()->create($validatedData);

//         // Ocultar los campos sensibles
//         $student->makeHidden(['email', 'dni', 'user_id', 'created_at', 'updated_at']);

//         return response()->json([
//             'message' => 'Estudiante creado correctamente',
//             'data' => $student,
//         ], 201);
//     }

//     public function update(Request $request, Student $student)
//     {
//         Gate::authorize('modify', $student);
//         // Validar los datos
//         $validated = $request->validate([
//             'name' => 'required|string|max:255',
//             'lastname' => 'required|string|max:255',
//             'email' => 'required|email|unique:students,email,',  // Excluir el email del propio estudiante al actualizar
//             'dni' => 'required|string|size:8|unique:students,dni,'  // Excluir el DNI del propio estudiante
//         ]);

//         // Buscar el estudiante y actualizarlo
//         // $student = Student::findOrFail($id);
//         $student->update($validated);

//         // Ocultar los campos sensibles
//         $student->makeHidden(['email', 'dni', 'user_id', 'created_at', 'updated_at']);

//         return response()->json([
//             'message' => 'Estudiante actualizado correctamente',
//             'data' => $student,
//         ], 200);
//     }

//     public function destroy( Student $student)
//     {
//         Gate::authorize('modify', $student);
//         // Buscar y eliminar el estudiante
//         // $student = Student::findOrFail($id);
//         $student->delete();

//         return response()->json([
//             'message' => 'Alumno eliminado con éxito',
//             'data' => $student  // Opcionalmente, devolver los detalles del estudiante eliminado
//         ], 200);
//     }
// }
