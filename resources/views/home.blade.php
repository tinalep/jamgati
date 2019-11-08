@extends('layout')

@section('header')
<header class="header">
        <div class="header-nav">
                <a href=""><img src="assets/images/img-logo-jamgati.png"> </a>
            <nav>
                <ul role ="menubar" aria-label="string">
                    <li role="none"><a role="menuitem" tabindex="0" class="nav-link activ-link" href="">Accueil</a></li>
                    <li role="none"><a role="menuitem" tabindex="0" class="nav-link"  href="">Tableau</a></li> 
                    <li role="none"><a role="menuitem" tabindex="0" class="nav-link" href="">Formulaire</a></li>
                    <li role="none"><a role="menuitem" tabindex="0" class="nav-link" href="">Menu</a></li>
                    <li role="none"><a role="menuitem" tabindex="0" class="nav-link" href="">Documentation</a></li>
                </ul>
            </nav>
        </div>
        <div class="header-id">
            <a class="button button-bgnone" href="">Connexion</a>
            <a class="button button-bgred" href="">Inscription</a>
        </div>
    </header>
@endsection
