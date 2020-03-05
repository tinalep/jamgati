<?php
$user = Auth::user();
?>

@extends('layout-board')

@section('title')
    Création menus - Jamgati
@endsection

@section('link')
<a class="link-back" href="{{route('board')}}">Tableau de board</a>
@endsection

@section('content')
<div id="nav-root" data-nav={{ isset($nav) ? $nav->id : null}}></div>
@endsection
