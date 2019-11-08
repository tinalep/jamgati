@extends('layout')

@section('header')
<header class="header">
        <div class="header-nav">
                <a href=""><img src="assets/images/img-logo-jamgati.png"> </a>
            <nav>
                <ul>
                    <li><a class="activ-link" href="">Accueil</a></li>
                    <li><a href="">Tableau</a></li> 
                    <li><a href="">Formulaire</a></li>
                    <li><a href="">Menu</a></li>
                    <li><a href="">Documentation</a></li>
                </ul>
            </nav>
        </div>
        <div class="header-id">
            <a class="button button-bgnone" href="">Connexion</a>
            <a class="button button-bgred" href="">Inscription</a>
        </div>
    </header>
@endsection
