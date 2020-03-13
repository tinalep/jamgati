<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Simput extends Model
{
    function form(){
        return $this->belongsTo('App\Form');
    }
}
