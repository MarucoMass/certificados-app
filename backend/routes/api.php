<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas públicas
Route::post('/auth/login', [AuthController::class, 'login']);

// Rutas protegidas
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/auth/register', [AuthController::class, 'register'])->middleware('restrictRole:admin');
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Usuarios (solo admins)
    Route::apiResource('/users', UserController::class)->except(['show', 'store']);

    // Estudiantes
    Route::apiResource('/students', StudentController::class)->except(['show']);
});


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// //public route
// Route::post('/auth/login', [AuthController::class, 'login']);
// //protected route
// Route::group(['middleware' => ['auth:sanctum']], function () {
//     Route::post('/auth/register', [AuthController::class, 'register'])->middleware('restrictRole:admin');
//     Route::post('/auth/logout', [AuthController::class, 'logout']);

//     Route::get('/users', [UserController::class, 'index']);

//     Route::put('/user/{user}', [UserController::class, 'update']);

//     Route::delete('/user/{user}', [UserController::class, 'destroy']);

//     // Ruta para registrar estudiantes (solo accesible por administradores)
//     Route::post('/students', [StudentController::class, 'store']);

//     Route::put('/students/{student}', [StudentController::class, 'update']);
    
//     Route::delete('/students/{student}', [StudentController::class, 'destroy']);
// });

