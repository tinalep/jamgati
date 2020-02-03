@extends('layout')

@section('header')
<header>
    <div class="header">
        <div class="header-nav" role="navigation" aria-label="Main Navigation">
            <a class="header-logo" href=""><img src="assets/images/img-logo-jamgati.png"> </a>
            <nav>
                <ul role="menubar" aria-label="string">
                    <li role="none"><a role="menuitem" tabindex="0" class="nav-link activ-link" href="">Accueil</a></li>
                    <li role="none"><a role="menuitem" tabindex="0" class="nav-link" href="">Tableau</a></li>
                    <li role="none"><a role="menuitem" tabindex="0" class="nav-link" href="">Formulaire</a></li>
                    <li role="none"><a role="menuitem" tabindex="0" class="nav-link" href="">Menu</a></li>
                    <li role="none"><a role="menuitem" tabindex="0" class="nav-link" href="">Documentation</a></li>
                </ul>
            </nav>
        </div>
        <div class="header-id">
            <a class="button button-bgnone" href="">Connexion</a>
            <a class="button button-bgred" href="">Inscription</a>
        </div>
        <div class="cross" id="cross"><i class="fas fa-times"></i></div>
    </div>
    <div class="burger" id="burger"><i class="fas fa-bars"></i></div>
</header>
@endsection

@section('content')
<main role="main">
    <div class="section header-home">
        <div class="container">
            <div class="row main-title">
                <h1 class="heading-1">Editer simplement</h1>
                <p>Jamgati est un générateur de lignes de codes en ligne qui vous permettra de créer simplement et
                    rapidement différentes sortes de fonctionnalités accessibles à votre site web</p>
            </div>
            <div class="row highlight-navigation">
                <div class="col-4">
                    <h2 class="heading-4">Tableau</h2>
                    <p>Il est souvent utile de présenter ses idées sous forme de tableaux. Profitez de notre système de
                        création de tableaux pour publier vos idées de façon plus structurée.</p>
                    <a href="#">Commencer</a>
                </div>
                <div class="col-4">
                    <h2 class="heading-4">Formulaire</h2>
                    <p>Il est souvent utile de présenter ses idées sous forme de tableaux. Profitez de notre système de
                        création de tableaux pour publier vos idées de façon plus structurée.</p>
                    <a href="#">Commencer</a>
                </div>
                <div class="col-4">
                    <h2 class="heading-4">Menu</h2>
                    <p>Il est souvent utile de présenter ses idées sous forme de tableaux. Profitez de notre système de
                        création de tableaux pour publier vos idées de façon plus structurée.</p>
                    <a href="">Commencer</a>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="container">
            <div class="row">
                <h2 class="heading-2"><span>Comment ça marche</span>Les 3 étapes</h2>
            </div>
            <div class="row steps-home">
                <div class="col-4 d-flex justify-content-around">
                    <p class="number">1</p>
                    <p class="w-75"><b>Choisissez le type de contenu</b> que vous souhaitez éditer</p>
                </div>
                <div class="col-4 d-flex justify-content-around">
                    <p class="number">2</p>
                    <p class="w-75"><b>Ajoutez vos données</b> à l’aide de l’éditeur</p>
                </div>
                <div class="col-4 d-flex justify-content-around">
                    <p class="number">3</p>
                    <p class="w-75"><b>Exportez</b> votre fichier pour obtenir le code HTML/CSS</p>
                </div>
            </div>

            <div class="video">
                <img class="d-block m-auto" src="{{asset("assets/images/img-video.png")}}" alt="video">
            </div>
    
    </div>
    
    <div class="section">
        <div class="container">
            <div class="row">
                <h2 class="heading-2"><span>L'avantage</span>Allez plus vite !</h2>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="d-flex align-items-center">
                        <div class="illustration w-50">
                                <img src="assets/images/img-upload.png" alt="upload-file">
                        </div>
                        <div class="w-50 offset-1">
                            <div class="content">
                                <h3>Importez vos fichiers</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="d-flex align-items-center">
                        <div class="w-50">
                            <div class="content">
                                <h3>Utiliser un modèle</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                            </div>
                        </div>
                        <div class="illustration w-50 offset-1">
                                <img src="assets/images/img-form.png" alt="img-form">
                        </div>
                    </div>
                </div>
            </div>    
    </div>
    
    <div class="section tools-home">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="heading-2"><span>Un outil</span>Pour tous</h2>
                    <p class="w-75 m-auto text-center mt-50">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </div>
            <div class="row justify-content-between cards-home">
                <div class="card">
                    <h3>Accessible</h3>
                    <p>Jamgati porte une grande attention à l’accessibilité dans le but de donner la possibilité à tous d’utiliser votre site.</p>
                </div>
                <div class="card">
                    <h3>Open source</h3>
                    <p>Une remarque ou une question ? Dirigez vous vers le footer pour accéder à notre Git et nous permettre de faire évoluer notre application web.</p>
                </div>
            </div>

</main>

@endsection

@section('footer')
<footer class="footer">
    <div class="footer-links">
        <ul>
            <li>
                <a href="#">
                    Mentions légales
                </a>
            </li>
            <li>
                <a href="#">
                    Données personnelles
                </a>
            </li>
            <li>
                <a href="#" class="help">
                    <div class="icon">
                        <img src="assets/images/icon-help.svg" alt="Page d'aide">
                    </div>
                    Aide
                </a>
            </li>
            <li>
                <a href="#">
                    <div class="icon">
                        <img src="assets/images/icon-github.svg" alt="Git Hub">
                    </div>
                </a>
            </li>
        </ul>
    </div>
    <div class="footer-name">
        © Jamgati - 2019
    </div>
</footer>
@endsection
