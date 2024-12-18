<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//public route
Route::post('/auth/login', [AuthController::class, 'login']);
//protected route
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/auth/register', [AuthController::class, 'register'])->middleware('restrictRole:admin');
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Ruta para registrar estudiantes (solo accesible por administradores)
    Route::post('/students', [StudentController::class, 'store']);

    Route::put('/students/{student}', [StudentController::class, 'update']);
    
    Route::delete('/students/{student}', [StudentController::class, 'destroy']);
});

