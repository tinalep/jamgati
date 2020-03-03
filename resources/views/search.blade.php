@extends('layout-board')

@section('title')
    Tableau de bord - Jamgati
@endsection

@section('content')

<?php
$user = Auth::user();
?>
        
<div class="dashboard">
    <div class="dashboard_header">
        <h1>Rechercher un projet</h1> 
    </div>
    <div>
        <input type="text" name="search" id="search" placeholder="Rechercher" class="search_form">
    </div>

    <div class="search__data">
        <table class="table_dashboard" style="width:100%">
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Dernière modification</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="table_dashboard__title">Titre tableau 1</td>
                    <td class="table_dashboard__update">20/10/2019</td>
                    <td class="table_dashboard__action"><a href="download"><i class="fas fa-download"></i></a><a href=""><i class="fas fa-edit"></i></a><a href="delete"><i class="fas fa-trash"></i></a></td>
                </tr>
            </tbody>
        </table>
    
    </div>
        @endsection


