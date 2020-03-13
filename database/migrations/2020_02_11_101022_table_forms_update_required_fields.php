<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TableFormsUpdateRequiredFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('forms', function (Blueprint $table) {
            
            $table->string('action')->nullable()->change();
            $table->string('method')->nullable()->change();
            $table->string('html_class')->nullable()->change();
            $table->string('html_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('forms', function (Blueprint $table) {
            
            $table->string('action')->nullable(false)->change();
            $table->string('method')->nullable(false)->change();
            $table->string('html_class')->nullable(false)->change();
            $table->string('html_id')->nullable(false)->change();
        });
    }
}
