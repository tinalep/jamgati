<?php

namespace App\Http\Controllers;

use Auth;
use App\Form;
use App\Http\Requests\StoreFormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FormController extends Controller
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
        return view('form.app');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreFormRequest $request)
    {
        $data = $request->input();
        $form = new \App\Form();
        $form->fields = json_encode($data['fields']);
        $form->name = $data['name'];
        $form->user_id = Auth::user()->id;
        $form->slug = Str::slug($form->name);
        $form->nb_fields = $data['nbFields'];
        $form->save();
        return ['redirect'=> route('form.edit', ['form'=>$form])];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\form  $form
     * @return \Illuminate\Http\Response
     */
    public function show(\App\Form $form)
    {
        return response()->json($form);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\form  $form
     * @return \Illuminate\Http\Response
     */
    public function loadall()
    {
        $forms = \App\Form::where('user_id',Auth::user()->id)->get();
        return response()->json($forms); ;
    }

        /**
     * Display the specified resource.
     *
     * @param  \App\form  $form
     * @return \Illuminate\Http\Response
     */
    public function loadForDashboard(\App\Form $form)
    {
        $forms = \App\Form::where('user_id',Auth::user()->id)->get();
        return view('board', ['forms'=>$forms]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\form  $form
     * @return \Illuminate\Http\Response
     */
    public function load(\App\Form $form)
    {
        if($form->user_id == Auth::user()->id)
            return response()->json($form);
        else
            return response()->json('forgiven');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\form  $form
     * @return \Illuminate\Http\Response
     */
    public function edit(\App\Form $form)
    {
        if(auth()->check())
            return view('form.app', ['form'=>$form]);
        else
            return redirect()->route('login');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\form  $form
     * @return \Illuminate\Http\Response
     */
    public function update(StoreFormRequest $request, form $form)
    {
        $data = $request->input();
        $form->fields = json_encode($data['fields']);
        $form->name = $data['name'];
        $form->slug = Str::slug($form->name);
        $form->nb_fields = $data['nbFields'];
        $form->save();
        return response()
        ->json($form);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\form  $form
     * @return \Illuminate\Http\Response
     */
    public function destroy(\App\Form $form)
    {
        $form->delete();
        return redirect()->route('board');
    }
}
