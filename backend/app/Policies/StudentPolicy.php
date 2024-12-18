<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Student;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class StudentPolicy
{
    use HandlesAuthorization;

    public function update(User $user, Student $student)
    {
        // Verificar que el usuario sea el dueño del estudiante o un administrador
        return $user->id === $student->user_id || $user->role === 'admin';
    }

    public function modify(User $user, Student $student): Response
    {
        return $user->id === $student->user_id || $user->role === 'admin' ? Response::allow() : Response::deny('You are not allowed');
    }

    public function delete(User $user, Student $student)
    {
        // Verificar que el usuario sea el dueño del estudiante o un administrador
        return $user->id === $student->user_id || $user->role === 'admin';
    }
}
