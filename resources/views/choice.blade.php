@extends('layout')

<?php
$user = Auth::user();
?>

@section('content')
<div class="choice">
    <div class="choices">
        <div class="choices_bloc">
            <h3>Créer un tableau</h3>
            <div class="choices_bloc_item"><a href="#">Vierge</a></div>         
              <div class="dropdown choice_drop">
                <a class="btn btn-  dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  A partir d'un modèle
                </a>
              
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a class="dropdown-item" href="#">Liste de courses</a>
                  <a class="dropdown-item" href="#">Agenda de la semaine</a>
                  <a class="dropdown-item" href="#">Facture</a>
                </div>
              </div>
        </div>
        <div class="choices_bloc">
            <h3>Créer un menu</h3>
        <div class="choices_bloc_item"><a href="{{route(nav.create)}}">Vierge</a></div>
            <div class="dropdown choice_drop">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  A partir d'un modèle
                </a>
              
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a class="dropdown-item" href="#">Menu basique</a>
                  <a class="dropdown-item" href="#">Menu burger</a>
                </div>
              </div>        </div>
        <div class="choices_bloc">
            <h3>Créer un formulaire</h3>
            <div class="choices_bloc_item"><a href="#">Vierge</a></div>
            <div class="dropdown choice_drop">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  A partir d'un modèle
                </a>
              
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a class="dropdown-item" href="#">Formulaire de contact</a>
                  <a class="dropdown-item" href="#">Inscription</a>
                  <a class="dropdown-item" href="#">Connexion</a>
                </div>
              </div>
        </div>
    </div>
</div>
@endsection