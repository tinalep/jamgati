@extends('layout-board')

@section('content-board')
<?php
$user = Auth::user();
?>
<div class="profil card">
    <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <p class="m-0"><?php echo $user->name;?></p>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item"  href="{{ route('logout') }}">Déconnexion</a>
        </div>
        </div>
</div>

<div class="dashboard">
    <div class="dashboard_header">
        <h1>Tableau de bord</h1> 
        <button class="button button-bgred button-no-border button-round">+</button>
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
            <li>
                <a class="active" href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
            </li>
        </ul>
    </nav>
</div>
@endsection


