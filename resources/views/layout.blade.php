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
        @guest
    <header class="header header__fixed">
        <div class="header__noauth">
            <div class="header-nav" role="navigation" aria-label="Main Navigation">
                <a class="header-logo" href=""><img src="{{asset("assets/images/img-logo-jamgati.png")}}"> </a>
                <nav>
                    <ul role="menubar" aria-label="string">
                        <li role="none"><a role="menuitem" tabindex="0" class="nav-link activ-link" href="{{ route('home') }}">Accueil</a></li>
                        <li role="none"><a role="menuitem" tabindex="0" class="nav-link" href="">Tableau</a></li>
                        <li role="none"><a role="menuitem" tabindex="0" class="nav-link" href="">Formulaire</a></li>
                        <li role="none"><a role="menuitem" tabindex="0" class="nav-link" href="">Menu</a></li>
                        <li role="none"><a role="menuitem" tabindex="0" class="nav-link" href="">Documentation</a></li>
                    </ul>
                </nav>
            </div>
            <div class="header-id">
                <a class="button button-bgnone" href="{{ route('login') }}">Connexion</a>
                <a class="button button-bgred" href="{{ route('register') }}">Inscription</a>
            </div>
            <div class="cross" id="cross"><i class="fas fa-times"></i></div>
        </div>
        <div class="burger" id="burger"><i class="fas fa-bars"></i></div>
    </header>
    @endguest
    
    <main role="main">
    @yield('content')
    </main>

    <footer class="footer">
        <div class="footer-links">
            <ul>
                <li>
                    <a href="{{ route('mentions') }}">
                        Mentions légales
                    </a>
                </li>
                <li>
                    <a href="{{ route('data') }}">
                        Données personnelles
                    </a>
                </li>
                <li>
                    <a href="#" class="help">
                        <div class="icon">
                            <img src="{{asset("assets/images/icon-help.svg")}}" alt="Page d'aide">
                        </div>
                        Aide
                    </a>
                </li>
                <li>
                    <a href="https://github.com/tinalep/jamgati">
                        <div class="icon">
                            <img src="{{asset("assets/images/icon-github.svg")}}" alt="Git Hub">
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="footer-name">
            © Jamgati - 2019
        </div>
    </footer>
<script src="{{asset("js/app.js")}}"></script>
</body>

</html>
