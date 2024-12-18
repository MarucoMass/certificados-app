<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class defaultAdmin extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create(
            [
                'username' => 'marucoAdmin',
                'email' => 'maruco@gmail.com',
                'password' => bcrypt('maruco1234'),
                'role' => 'admin',
            ]
        );
    }
}
