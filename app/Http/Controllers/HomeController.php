<?php

namespace App\Http\Controllers;

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
        return view('home');
    }

    public function createFormGuest()
    {
        return view('form.guest');
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
        return view('doc');
    }

    public function settings()
    {
        return view('settings');
    }
}

