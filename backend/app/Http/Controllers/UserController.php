<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    public function index()
    {
        Gate::authorize('get', User::class);
        return User::where('role', 'user')->get();
    }

    public function update(Request $request, User $user)
    {
        Gate::authorize('modify', $user);

        $validated = $request->validate([
            'username' => 'nullable|string|max:255',  // username es opcional
            'email' => 'nullable|email|unique:users,email,' . $user->id,  // email es opcional, se excluye el propio usuario
            'password' => 'nullable|string|min:8',  // password es opcional, solo se valida si se ingresa
        ]);

        // Si se pasa un nuevo password, encriptarlo
        if ($request->has('password') && $request->password !== '') {
            $validated['password'] = bcrypt($request->password);
        }

        // Actualiza solo los campos que fueron validados y no están vacíos
        $user->update(array_filter($validated));

        return response()->json([
            'message' => 'Usuario actualizado correctamente',
            'data' => $user,
        ], 200);
    }

    public function destroy(User $user)
    {
        Gate::authorize('modify', $user);

        $user->delete();

        return response()->json([
            'message' => 'Usuario eliminado con éxito',
            'data' => $user 
        ], 200);
    }
}
