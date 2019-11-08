@extends('layout')

@section('header')
<header class="header">
        <div class="header-nav">
                <a href=""><img src="assets/images/img-logo-jamgati.png"> </a>
            <nav>
                <ul>
                    <li><a href="">Accueil</a></li>
                    <li><a href="">Tableau</a></li> 
                    <li><a href="">Formulaire</a></li>
                    <li><a href="">Menu</a></li>
                    <li><a href="">Documentation</a></li>
                </ul>
            </nav>
        </div>
        <div class="header-id">
            <a class="button button-bgrred" href="">Connexion</a>
            <a class="button button-bgnone" href="">Inscription</a>
        </div>
    </header>
@endsection

@section('content')
<main role="main">
    <div class="section">
        <div class="container">
            <div class="row">
                <h1 class="heading-1">Editer simplement</h1>
                <p>Jamgati est un générateur de lignes de codes en ligne qui vous permettra de créer simplement et rapidement différentes sortes de fonctionnalités accessibles à votre site web</p>
            </div>
            <div class="row">
                <div class="col-4">
                    <h2 class="heading-4">Tableau</h2>
                    <p>Il est souvent utile de présenter ses idées sous forme de tableaux. Profitez de notre système de création de tableaux pour publier vos idées de façon plus structurée.</p>
                    <a href="#">Commencer</a>
                </div>
                <div class="col-4">
                    <h2 class="heading-4">Formulaire</h2>
                    <p>Il est souvent utile de présenter ses idées sous forme de tableaux. Profitez de notre système de création de tableaux pour publier vos idées de façon plus structurée.</p>
                    <a href="#">Commencer</a>
                </div>
                <div class="col-4">
                    <h2 class="heading-4">Menu</h2>
                    <p>Il est souvent utile de présenter ses idées sous forme de tableaux. Profitez de notre système de création de tableaux pour publier vos idées de façon plus structurée.</p>
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
            <div class="row">
                <div class="col-4">
                    <p class="number">1</p>
                    <p><b>Choisissez le type de contenu</b> que vous souhaitez éditer</p>
                </div>
                <div class="col-4">
                    <p class="number">1</p>
                    <p><b>Ajoutez vos données</b> à l’aide de l’éditeur</p>
                </div>
                <div class="col-4">
                    <p class="number">1</p>
                    <p><b>Exportez</b> votre fichier pour obtenir le code HTML/CSS</p>
                </div>
            </div>
    
    </div>
    
    <div class="section">
        <div class="container">
            <div class="row">
                <h2 class="heading-2"><span>L'avantage</span>Allez plus vite !</h2>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="illustration">
                        <img src="" alt="">
                    </div>
                    <div class="content">
                        <h3>Importez vos fichiers</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    </div>
                </div>
                <div class="col-6">
                    <div class="illustration">
                        <img src="" alt="">
                    </div>
                    <div class="content">
                        <h3>Utiliser un modèle</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    </div>
                </div>
            </div>    
    </div>
    
    <div class="section">
        <div class="container">
            <div class="row">
                    <h2 class="heading-2"><span>Un outil</span>Pour tous</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            </div>
            <div class="row">
                <div class="col-6">
                    <h3>Accessible</h3>
                    <p>Jamgati porte une grande attention à l’accessibilité dans le but de donner la possibilité à tous d’utiliser votre site.</p>
                </div>
                <div class="col-6">
                    <h3>Open source</h3>
                    <p>Une remarque ou une question ? Dirigez vous vers le footer pour accéder à notre Git et nous permettre de faire évoluer notre application web.</p>
                </div>
            </div>
        </div>
    </div>
    
    <div class="section">
        <div class="container">
            <div class="row">
                <h2 class="heading-2">Pour les développeurs</h2>
            </div>
            <div class="row">
                <div class="col-6">
                    <h2 class="heading-4">HTML 5</h2>
                    <p>Pour pouvoir mettre en forme votre contenu, Jamgati utilise la technologie HTML5, nécessaire pour intégrer les éléments proposés.</p>
                </div>
                <div class="col-6">
                    <h2 class="heading-4">CSS 6</h2>
                    <p>Pour une agréable mise en forme de vos éléments. Ajouter vos couleurs, typographies ou encore taille de texte pour une personnalisation la plus complète possible.</p>
                </div>
                <div class="col-6">
                    <h2 class="heading-4">Bootstrap</h2>
                    <p>Pour permettre aux utilisateurs de votre site d’accéder au contenu quelque soit</p>
                </div>
                <div class="col-6">
                    <h2 class="heading-4">Javascript</h2>
                    <p>Principalement utilisé pour les menus, le langage javascript permet de créer des animations simples telles que celle utilisé pour l’ouverture du menu burger.</p>
                </div>
            </div>
        </div>
    </div>
    
</main>
    
@endsection