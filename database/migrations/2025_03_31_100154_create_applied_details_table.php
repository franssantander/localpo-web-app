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
            $table->timestamp('interview_date')->nullable();
            $table->string('interview_type')->nullable()->default();
            $table->string('interview_location')->nullable()->default();
            $table->json('assigned_interviewer')->nullable()->default();
            $table->string('interview_status')->nullable()->default();
            $table->timestamp('shortlisted_date')->nullable();
            $table->string('shortlisted_by')->nullable()->default();
            $table->string('shortlisted_status')->nullable()->default();
            $table->json('assigned_review')->nullable()->default();
            $table->timestamp('date_hired')->nullable();
            $table->timestamp('offer_accepted')->nullable();
            $table->string('offer_status')->nullable()->default();
            $table->json('notes')->nullable()->default();
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