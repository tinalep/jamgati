<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Board;
use App\form;
use App\table;
use Illuminate\Contracts\Support\Jsonable;

class BoardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return view('board');
        $forms = \App\Form::where('user_id',Auth::user()->id)->paginate(3);
        $navs = \App\Nav::where('user_id',Auth::user()->id)->paginate(3);
        $tables = \App\Table::where('user_id',Auth::user()->id)->paginate(3);
        return view('board', ['forms'=>$forms, 'navs'=>$navs, 'tables'=>$tables]);
    }

    public function choice()
    {
        return view('choice');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function show(Board $board)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function edit(Board $board)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Board $board)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function destroy(Board $board)
    {
        //
    }

    /**
     * Downloading
     * 
     * @return void \Illuminate\Http\Response
     */
    public function dl(Request $request){
        $html = $request->input()['html'];
        $name = $request->input()['filename'];
        return response()->streamDownload(function () use ($html) {
            echo $html;
        }, $name);
    }
}
