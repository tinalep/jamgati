<?php
$user = Auth::user();
?>

@extends('layout-board')

@section('title')
    Création menu - Jamgati
@endsection

@section('link')
    <a class="link-back" href="{{route('board')}}">Tableau de board</a>
@endsection

@section('content')
<div id="nav-root"></div>
@endsection
