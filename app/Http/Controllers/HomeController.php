<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
      * @return void
      */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        if(Auth::check()){
            return ['redirect'=> route('board')];
        } else {
            return view('home');
        }
    }

    public function createFormGuest()
    {
        return view('form.guest');
    }

    public function createTabGuest()
    {
        return view('tab.guest');
    }

    public function createNavGuest()
    {
        return view('nav.guest');
    }

    public function mentions()
    {
        return view('mentions');
    }

    public function data()
    {
        return view('data');
    }

    public function doc()
    {
        if (Auth::check()) {
            return view('doc');
        } else {
            return view('docguest');
        }
    }

    public function settings()
    {
        return view('settings');
    }
}

