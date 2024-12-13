<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle($request, Closure $next, $role)
    {
        if (auth()->user()?->role !== $role) {
            return response()->json(['message' => 'Acceso denegado.'], 403);
        }

        return $next($request);
    }


}