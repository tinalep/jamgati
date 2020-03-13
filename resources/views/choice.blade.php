@extends('layout-board')

@section('title')
    Tableau de bord - Contenu - Jamgati
@endsection

<?php
$user = Auth::user();
?>

@section('content')
<div class="choice">
    <div class="choices">
        <div class="choices_bloc">
            <h3>Créer un tableau</h3>
            <div class="choices_bloc_item">
              <a href="{{route('table.create')}}">Vierge</a>        
              <a href="#">Liste de courses</a>
              <a href="#">Agenda de la semaine</a>
              <a href="#">Facture</a>
            </div> 
        </div>
        <div class="choices_bloc">
            <h3>Créer un menu</h3>
          <div class="choices_bloc_item">
            <a href="{{route('nav.create')}}">Vierge</a>
            <a href="#">Menu basique</a>
            <a href="#">Menu burger</a>  
          </div>  
        </div>
        <div class="choices_bloc">
            <h3>Créer un formulaire</h3>
            <div class="choices_bloc_item">
              <a href="{{route('form.create')}}">Vierge</a>
              <a href="#">Formulaire de contact</a>
              <a href="#">Inscription</a>
              <a href="#">Connexion</a>
            </div>
        </div>
    </div>
</div>
@endsection