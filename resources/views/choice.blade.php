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
              <a href="{{route('table.loadModel')}}">Liste de courses</a>
            </div> 
        </div>
        <div class="choices_bloc">
            <h3>Créer un menu</h3>
          <div class="choices_bloc_item">
            <a href="{{route('nav.create')}}">Vierge</a>
          </div>  
        </div>
        <div class="choices_bloc">
            <h3>Créer un formulaire</h3>
            <div class="choices_bloc_item">
              <a href="{{route('form.create')}}">Vierge</a>
            </div>
        </div>
    </div>
</div>
@endsection