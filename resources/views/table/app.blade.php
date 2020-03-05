<?php
$user = Auth::user();
?>

@extends('layout-board')

@section('title')
    Création tableau - Jamgati
@endsection

@section('link')
<a class="link-back" href="{{route('board')}}">Tableau de board</a>
@endsection

@section('content')
<div id="table-root" data-table={{ isset($table) ? $table->id : null}}></div>
@endsection
