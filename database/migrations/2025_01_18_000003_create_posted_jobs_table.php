<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posted_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->nullable()->constrained();
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->string('background_img')->nullable();
            $table->string('job_title');
            $table->longText('job_description');
            $table->json('type');
            $table->string('location');
            $table->string('salary_range')->nullable();
            $table->string('experience_level')->nullable();
            $table->json('job_function');
            $table->json('industry');
            $table->date('job_expiry')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posted_jobs');
    }
};