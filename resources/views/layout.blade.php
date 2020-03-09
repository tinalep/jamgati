<!doctype html>
<html lang="fr">
    
    <head>
        <title>Jamgati</title>
        <meta charset="utf-8">
        <meta name="description" content="description de la page">
        <link rel="stylesheet" href="{{asset("css/app.css")}}" async>
        
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap" rel="stylesheet" async>
        
        {{-- Script qui permet de charger FONTAWESOME plus rapidement --}}
        <script type="text/javascript" async> (function() { var css = document.createElement('link'); css.href = 'https://use.fontawesome.com/releases/v5.1.0/css/all.css'; css.rel = 'stylesheet'; css.type = 'text/css'; document.getElementsByTagName('head')[0].appendChild(css); })(); </script>
        <link rel="icon" type="image/png" href="{{asset("assets/images/logo-jamgati.png")}}" />
        
        <script  src="../tarteaucitron/tarteaucitron.js" async></script>

        <script type="text/javascript">
        tarteaucitron.init({
    	  "privacyUrl": "", /* Privacy policy url */

    	  "hashtag": "#tarteaucitron", /* Open the panel with this hashtag */
    	  "cookieName": "tarteaucitron", /* Cookie name */
    
    	  "orientation": "middle", /* Banner position (top - bottom) */
    	  "showAlertSmall": true, /* Show the small banner on bottom right */
    	  "cookieslist": true, /* Show the cookie list */

    	  "adblocker": false, /* Show a Warning if an adblocker is detected */
    	  "AcceptAllCta" : true, /* Show the accept all button when highPrivacy on */
    	  "highPrivacy": true, /* Disable auto consent */
    	  "handleBrowserDNTRequest": false, /* If Do Not Track == 1, disallow all */

    	  "removeCredit": false, /* Remove credit link */
    	  "moreInfoLink": true, /* Show more info link */
    	  "useExternalCss": false, /* If false, the tarteaucitron.css file will be loaded */

    	  //"cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for multisite */
                          
    	  "readmoreLink": "/cookiespolicy" /* Change the default readmore link */
        });
        </script>
    </head>
    
    <body>
        <a class="hidden" href="sitemap.xml">Site Map</a>
        @guest
    <header class="header header__fixed">
        <div class="header__noauth">
            <div class="header-nav" role="navigation" aria-label="Main Navigation">
                <a class="header-logo" href="{{ route('home') }}"><img src="{{asset("assets/images/img-logo-jamgati.png")}}" loading="lazy" alt="Logo Jamgati"> </a>
                <nav>
                    <ul role="menubar" aria-label="string">
                        <li role="none"><a role="menuitem" tabindex="0" class="{{request()->routeIs('home') ? 'nav-link activ-link' : 'nav-link' }}" href="{{ route('home') }}">Accueil</a></li>
                        <li role="none"><a role="menuitem" tabindex="0" class="{{request()->routeIs('tab.create') ? 'nav-link activ-link' : 'nav-link' }}" href="{{ route('tab.create') }}">Tableau</a></li>
                        <li role="none"><a role="menuitem" tabindex="0" class="{{request()->routeIs('form.create') ? 'nav-link activ-link' : 'nav-link' }}" href="{{ route('form.create') }}">Formulaire</a></li>
                        <li role="none"><a role="menuitem" tabindex="0" class="{{request()->routeIs('nav.create') ? 'nav-link activ-link' : 'nav-link' }}" href="{{ route('nav.create') }}">Menu</a></li>
                        <li role="none"><a role="menuitem" tabindex="0" class="{{request()->routeIs('doc') ? 'nav-link activ-link' : 'nav-link' }}" href="{{ route('doc') }}">Documentation</a></li>
                    </ul>
                </nav>

                {{-- class="nav-link activ-link" --}}
            </div>
            <div class="header-id">
                <a class="button button-bgnone" href="{{ route('login') }}">Connexion</a>
                <a class="button button-bgred" href="{{ route('register') }}">Inscription</a>
            </div>
            <div class="cross" id="cross"><em class="fas fa-times"></em></div>
        </div>
        <div class="burger" id="burger"><em class="fas fa-bars"></em></div>
    </header>
    @endguest
    
   
    @yield('content')

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
                            <img src="{{asset("assets/images/icon-help.svg")}}" loading="lazy" alt="Page d'aide">
                        </div>
                        Aide
                    </a>
                </li>
                <li>
                    <a href="https://github.com/tinalep/jamgati">
                        <div class="icon">
                            <img src="{{asset("assets/images/icon-github.svg")}}" loading="lazy" alt="Git Hub">
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="footer-name">
            © Jamgati - 2019
        </div>
    </footer>
<script src="{{asset("js/app.js")}}" async></script>
<script type="text/javascript">
    tarteaucitron.user.gtagUa = 'UA-130290147-2';
    tarteaucitron.user.gtagMore = function () { /* add here your optionnal gtag() */ };
    (tarteaucitron.job = tarteaucitron.job || []).push('gtag');
    </script>
</body>

</html>
