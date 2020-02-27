<?php
$user = Auth::user();
?>

@extends('layout-board')

@section('title')
    Création formulaire - Jamgati
@endsection

@section('link')
<a class="link-back" href="{{route('board')}}">Tableau de board</a>
@endsection

@section('content')
<div id="form-root" data-form={{ isset($form) ? $form->id : null}}></div>
@endsection
