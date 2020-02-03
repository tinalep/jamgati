@extends('layout')

@section('content')
    <div class="page-board d-flex">
        <div class="sidebar d-flex flex-column justify-content-between">
                <div class="sidebar-nav">
                    <div class="logo">
                        <img src="assets/images/logo-sidebar.png" alt="jamgati">
                    </div>
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
                    <img src="assets/images/img-profile.jpg" alt="Natasha">
                    <p class="m-0">Nastasha Turner <i class="fas fa-chevron-down"></i></p>
                    <a class="button button-bgnone" href="{{ route('logout') }}">Déconnexion</a>
                </div>
        
                <div class="board">
                    <h1>Tableau de bord</h1>
                    <nav class="board-nav">
                        <a href="#">Tableau</a>
                        <a href="#">Formulaire</a>
                        <a href="#">Menu</a>
                    </nav>
        
                    <table style="width:100%">
                        <tr>
                            <th>Titre</th>
                            <th>Dernière modification</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>Titre tableau 1</td>
                            <td>20/10/2019</td>
                            <td>Upload Edit Delete</td>
                        </tr>
                    </table>
        
                    <nav class="pagination-nav">
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