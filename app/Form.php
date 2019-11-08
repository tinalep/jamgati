<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    function simput(){
        return $this->hasMany('App\Simput');
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
