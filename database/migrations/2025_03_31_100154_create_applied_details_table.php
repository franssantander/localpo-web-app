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
        Schema::create('applied_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applied_job_id')->constrained('applied_jobs');
            $table->foreignId('user_id')->constrained('users');
            $table->string('hire_status')->nullable()->default('In Review');
            $table->timestamp('interview_date')->nullable();
            $table->string('interview_type')->nullable();
            $table->string('interview_location')->nullable();
            $table->json('assigned_interviewer')->nullable();
            $table->string('interview_status')->nullable();
            $table->timestamp('shortlisted_date')->nullable();
            $table->string('shortlisted_by')->nullable();
            $table->string('shortlisted_status')->nullable();
            $table->json('assigned_review')->nullable();
            $table->timestamp('date_hired')->nullable();
            $table->timestamp('offer_accepted')->nullable();
            $table->string('offer_status')->nullable();
            $table->json('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applied_details');
    }
};