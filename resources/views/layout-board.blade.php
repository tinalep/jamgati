<?php
$user = Auth::user();
?>

<!doctype html>
<html lang="fr">
<head>
    <title>@yield('title')</title>
    <meta charset="utf-8">
    <meta name="description" content="description de la page">
    <link rel="stylesheet" href="{{asset("css/app.css")}}">
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap" rel="stylesheet">
    
    {{-- Script qui permet de charger FONTAWESOME plus rapidement --}}
    <script type="text/javascript"> (function() { var css = document.createElement('link'); css.href = 'https://use.fontawesome.com/releases/v5.1.0/css/all.css'; css.rel = 'stylesheet'; css.type = 'text/css'; document.getElementsByTagName('head')[0].appendChild(css); })(); </script>
    <link rel="icon" type="image/png" href="{{asset("assets/images/logo-jamgati.png")}}" />
</head>
<body>
    <div class="page-dashboard d-flex">
        <div class="sidebar d-flex flex-column justify-content-between">
            <div class="sidebar-nav">
                <a href="{{ route('board') }}">
                <div class="logo">
                    <img src="{{asset("assets/images/logo-sidebar.png")}}" alt="jamgati">
                </div>
                </a>
                <nav class="sidebar-nav sidebar-nav-top">
                <a class="icon-plus-circle" href="{{ route('choice')}}"><span>Nouveau</span></a>
                <a class="icon-dashboard" href="{{ route('board')}}"><span>Tableau de bord</span></a>
                <a class="icon-search" href="#"><span>Rechercher</span></a>
                </nav>
            </div>
            <nav class="sidebar-nav sidebar-nav-bottom">
                <a class="icon-settings" href="#"><span>Paramètres</span></a>
            </nav>
        </div>
    
        <main role="main">
            <div class="header-board">
                @yield('link')
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
            </div>
            @yield('content')
        </main>
    </div>
    <script src="{{asset("js/app.js")}}"></script>
</body>