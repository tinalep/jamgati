@extends('layout-board')

@section('title')
    Création formulaire - Jamgati
@endsection

@section('content')
<div id="form-root" data-form={{ isset($form) ? $form->id : null}}></div>
@endsection
