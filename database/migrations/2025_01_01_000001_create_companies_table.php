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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('company_name')->nullable();
            $table->string('company_profile')->nullable();
            $table->string('industry_type');
            $table->text('company_description')->nullable();
            $table->string('company_address');
            $table->string('company_phone')->unique();
            $table->string('company_email')->unique();
            $table->string('company_website')->nullable();
            $table->year('year_establish')->nullable();
            $table->json('company_socialmed')->nullable();
            $table->string('registration_number')->nullable();
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
        Schema::dropIfExists('companies');
    }
};