<?php

namespace Database\Seeders;

use App\Models\PostedJobs;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostedJobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        for ($i = 0; $i < 50; $i++) {
            PostedJobs::create([
                'company_id' => 1,
                'user_id' => 1,
                'background_img' => null,
                'title' => fake()->jobTitle(),
                'job_description' => fake()->paragraph(1),
                'type' => json_encode(fake()->randomElements(['Full-time', 'On-site', 'Hybrid'], rand(1, 3))), // JSON array with 1-3 random elements
                'location' => fake()->city(),
                'salary_range' => fake()->randomElement(['$40k-$50k', '$50k-$60k', '$60k-$80k']),
                'experience_level' => fake()->randomElement(['Entry-Level', 'Mid-Level', 'Senior-Level']),
                'job_function' => json_encode(fake()->randomElements(['Engineering', 'Marketing', 'Sales'], rand(1, 3))), // JSON array with 1-3 random elements
                'industry' => json_encode(fake()->randomElements(['Technology', 'Healthcare', 'Finance'], rand(1, 3))),   // JSON array with 1-3 random elements
                'job_expiry' => fake()->date('Y-m-d', '+30 days'),
            ]);
        }
    }
}