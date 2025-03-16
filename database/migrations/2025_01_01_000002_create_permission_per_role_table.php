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
        Schema::create('permission_per_role', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained('roles');
            $table->string("title")->nullable();
            $table->string("path");
            $table->string("key")->nullable();
            $table->string("component");
            $table->string("icon")->nullable();
            $table->longText("table")->nullable();
            $table->boolean('create');
            $table->boolean('retrieve');
            $table->boolean('update');
            $table->boolean('delete');
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
        Schema::dropIfExists('permission_per_role');
    }
};