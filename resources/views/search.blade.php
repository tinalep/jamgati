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
        <input type="text" name="search_text" id="search_text" class="form-control" placeholder="Rechercher un projet" value="">
    </div>
    @csrf
       <button type="button" name="search" id="search" class="btn btn-success">Search</button>

    <div class="search__data">
        <table class="table_dashboard" style="width:100%">
            <thead>
                <tr>
                    <th>Name</th>
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

