<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'mario',
            'email' => 'mario@mail.com',
            'password' => bcrypt('mario1234'),
            'email_verified_at' => now(),
            'role_id' => 1, // Administrator
        ]);
    }
}
