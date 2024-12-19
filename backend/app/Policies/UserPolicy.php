<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    use HandlesAuthorization;

    public function modify(User $user, User $userAuth): Response
    {
        return $user->id === $userAuth->id || $user->role === 'admin' ? Response::allow() : Response::deny('No tienes permiso para realizar esta acción.');
    }

    public function get(User $userAuth): Response
    {
        return $userAuth->role === 'admin' ? Response::allow() : Response::deny('No tienes permiso de administrador');
    }

}
