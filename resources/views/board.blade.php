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
        <h1>Tableau de bord</h1> 
        <form method="get" action="{{ route('choice') }}">
            <button class="button button-bgred button-no-border button-round">+</button>
        </form>
    </div>
    <nav class="dashboard_nav">
        <a class="dashboard_nav__link dashboard_nav__link--active" href="#">Tableau</a>
        <a class="dashboard_nav__link" href="#">Formulaire</a>
        <a class="dashboard_nav__link" href="#">Menu</a>
    </nav>

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

    <nav class="nav_pagination">
        <ul>
            <li><a class="previous previous-all disable" href=""><i class="fas fa-chevron-left"></i><i class="fas fa-chevron-left"></i></a></li>
            <li><a href="" class="previous-page disable"><i class="fas fa-chevron-left"></i></a></li>
            <li><a class="active" href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="" class="next-page"><i class="fas fa-chevron-right"></i></a></li>
            <li><a class="next next-all" href=""><i class="fas fa-chevron-right"></i><i class="fas fa-chevron-right"></i></a></li>

        </ul>
    </nav>
</div>
@endsection


