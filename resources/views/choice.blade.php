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
            <button type="button" class="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                A partir d'un modele
              </button>          
            <div class="choices_bloc_item dropdown-menu " aria-labelledby="dropdownMenuOffset">
                <a class="dropdown-item" href="#">Liste de courses</a>
                <a class="dropdown-item" href="#">Agenda Planner</a>
            </div>
        </div>
        <div class="choices_bloc">
            <h3>Créer un menu</h3>
            <div class="choices_bloc_item"><a href="#">Vierge</a></div>
            <button type="button" class="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                A partir d'un modele
              </button>          
            <div class="choices_bloc_item dropdown-menu " aria-labelledby="dropdownMenuOffset">
                <a class="dropdown-item" href="#">Menu de navigation</a>
            </div>
        </div>
        <div class="choices_bloc">
            <h3>Créer un formulaire</h3>
            <div class="choices_bloc_item"><a href="#">Vierge</a></div>
            <button type="button" class="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                A partir d'un modele
              </button>          
            <div class="choices_bloc_item dropdown-menu " aria-labelledby="dropdownMenuOffset">
                <a class="dropdown-item" href="#">Formulaire de contact</a>
                <a class="dropdown-item" href="#">Inscription</a>
                <a class="dropdown-item" href="#">Connexion</a>
            </div>
        </div>
    </div>
</div>
@endsection