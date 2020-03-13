@extends('layout-board')

@section('title')
    Tableau de bord - Paramètres
@endsection

@section('content')
    <h1>Paramètres</h1>


    <div class="hidden">{{$user->id}}</div>
    <p>Nom</p>
    {{$user->name}}

    <p>Adresse mail</p>
    {{$user->email}}

    <p>Mot de passe</p>
    <input type="password" name="password" id="password" value="{{$user->password}}">

@endsection