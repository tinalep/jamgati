<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    function user(){
        return $this->belongsTo('App\User');
    }
}
