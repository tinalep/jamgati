<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forms', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->softDeletes();

            $table->string('name');
            $table->string('slug');
<<<<<<< HEAD
            
            $table->integer('nb_fields');
=======
            $table->integer('nb_fields');

>>>>>>> 60b64f29ef7b0e2a8c1d5b07bbd1937b8be542ac
            $table->string('html_class');
            $table->string('html_id');
        });
    }
<<<<<<< HEAD
=======

>>>>>>> 60b64f29ef7b0e2a8c1d5b07bbd1937b8be542ac
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forms');
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 60b64f29ef7b0e2a8c1d5b07bbd1937b8be542ac
