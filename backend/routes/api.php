<?php

use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
});

Route::resource('alumnos', StudentController::class);

use Barryvdh\DomPDF\Facade\Pdf;

Route::get('/certificado/{id}', function ($id) {
    $alumno = \App\Models\Student::findOrFail($id);

    $data = [
        'nombre' => $alumno->nombre,
        'apellido' => $alumno->apellido,
        'dni' => $alumno->dni,
        'fecha' => now()->format('d/m/Y'),
    ];

    $pdf = Pdf::loadView('certificado', $data);
    return $pdf->download("Certificado_{$alumno->dni}.pdf");
});

