<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    function user(){
        return $this->belongsTo('App\User');
    }
}
