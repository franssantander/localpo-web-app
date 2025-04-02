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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('employment_id')->unique()->nullable();
            $table->string('company_name')->nullable();
            $table->foreignId('company_id')->nullable()->constrained()->onDelete('set null');
            $table->string('profile_picture')->nullable();
            $table->string('name');
            $table->string('position')->nullable();
            $table->longText('description')->nullable();
            $table->json('skills')->nullable();
            $table->json('experience')->nullable();
            $table->string('address_1')->nullable();
            $table->string('address_2')->nullable();
            $table->string('barangay')->nullable();
            $table->string('barangay_code')->nullable();
            $table->string('municipalities')->nullable();
            $table->string('municipalities_code')->nullable();
            $table->date('date_birth')->nullable();
            $table->string('province')->nullable();
            $table->string('province_code')->nullable();
            $table->string('region')->nullable();
            $table->string('region_code')->nullable();
            $table->string('email')->unique();
            $table->string('role')->nullable();
            $table->string('status')->nullable();
            $table->string('verification_code')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->string('password');
            $table->string('department')->nullable();
            $table->string('phone_number');
            $table->string('reports_to')->nullable();
            $table->text('token')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};