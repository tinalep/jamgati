<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Table;
use App\Http\Requests\StoreFormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TableController extends Controller
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
        if (Auth::check()) {
            return view('table.app');
        } else {
            return view('table.guest');
        }
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
        $table = new \App\Table();
        $table->table = json_encode($data['table']);
        $table->name = $data['name'];
        $table->user_id = Auth::user()->id;
        $table->save();
        return ['redirect'=> route('table.edit', ['table'=>$table])];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\table  $table
     * @return \Illuminate\Http\Response
     */
    public function show(\App\Table $table)
    {
        return response()->json($table);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\table  $table
     * @return \Illuminate\Http\Response
     */
    public function loadall()
    {
        $tables = \App\Table::where('user_id',Auth::user()->id)->get();
        return response()->json($tables); ;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\table  $table
     * @return \Illuminate\Http\Response
     */
    public function load(\App\Table $table)
    {
        if($table->user_id == Auth::user()->id)
            return response()->json($table);
        else
            return response()->json('forgiven');
    }

    /**
     * Display the specified resource.
     *
     * @return void
     */
    public function loadModel()
    {
        $table = new \App\Table();
        $model = \App\Table::where('id', '4')->get()[0];
        $table->table = $model->table;
        $table->name = $model->name;
        $table->user_id = Auth::user()->id;
        $table->save();
        return redirect()->route('table.edit', ['table'=>$table]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\table  $table
     * @return \Illuminate\Http\Response
     */
    public function edit(\App\Table $table)
    {
        if(auth()->check())
            return view('table.app', ['table'=>$table]);
        else
            return redirect()->route('login');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\table  $table
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, table $table)
    {
        $data = $request->input();
        $table->table = json_encode($data['table']);
        $table->name = $data['name'];
        $table->user_id = Auth::user()->id;
        $table->save();
        return response()
        ->json($table);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\table  $table
     * @return \Illuminate\Http\Response
     */
    public function destroy(\App\Table $table)
    {
        $table->delete();
        return redirect()->route('board');
    }
}
