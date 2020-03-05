<?php

namespace App\Http\Controllers;

use Auth;
use App\nav;
use App\Http\Requests\StoreFormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NavController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('nav.app');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->input();
        $nav = new \App\Nav();
        $nav->elements = json_encode($data['elements']);
        $nav->style = json_encode($data['style']);
        $nav->name = $data['name'];
        $nav->user_id = Auth::user()->id;
        $nav->save();
        return ['redirect'=> route('nav.edit', ['nav'=>$nav])];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\nav  $nav
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json($nav);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\nav  $nav
     * @return \Illuminate\Http\Response
     */
    public function loadall()
    {
        $navs = \App\Nav::where('user_id',Auth::user()->id)->get();
        return response()->json($navs); ;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\nav  $nav
     * @return \Illuminate\Http\Response
     */
    public function load(\App\Nav $nav)
    {
        if($nav->user_id == Auth::user()->id)
            return response()->json($nav);
        else
            return response()->json('forgiven');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\nav  $nav
     * @return \Illuminate\Http\Response
     */
    public function edit(\App\Nav $nav)
    {
        if(auth()->check())
            return view('nav.app', ['nav'=>$nav]);
        else
            return redirect()->route('login');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\nav  $nav
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, nav $nav)
    {
        $data = $request->input();
        $nav->elements = json_encode($data['elements']);
        $nav->style = json_encode($data['style']);
        $nav->name = $data['name'];
        $nav->user_id = Auth::user()->id;
        $nav->save();
        return response()
        ->json($nav);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\nav  $nav
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $nav->delete();
        return redirect()->route('board');
    }
}
