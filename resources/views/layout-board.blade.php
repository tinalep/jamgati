<?php
// $user = Auth::user();
?>

<!doctype html>
<html lang="fr">
<head>
    <title>Jamgati</title>
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
            @yield('content-board')
        </main>
    </div>
</body>