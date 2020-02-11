@extends('layout')

<?php
$user = Auth::user();
?>

@section('content')
    <div class="page-dashboard d-flex">
        <div class="sidebar d-flex flex-column justify-content-between">
            <div class="sidebar-nav">
                <a href="{{ route('board') }}">
                <div class="logo">
                    <img src="assets/images/logo-sidebar.png" alt="jamgati">
                </div>
                </a>
                <nav class="sidebar-nav sidebar-nav-top">
                    <a class="icon-plus-circle" href="#">Nouveau</a>
                    <a class="icon-dashboard" href="#">Tableau de bord</a>
                    <a class="icon-search" href="#">Rechercher</a>
                </nav>
            </div>
            <nav class="sidebar-nav sidebar-nav-bottom">
                <a class="icon-settings" href="#">Paramètres</a>
            </nav>
        </div>
        
            <main role="main">
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
                    <h1>Tableau de bord</h1>
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
                                <td class="table_dashboard__action">Upload Edit Delete</td>
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
            </main>
    </div>
@endsection