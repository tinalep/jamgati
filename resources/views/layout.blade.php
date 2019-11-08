<!doctype html>
<html>

<head>
    <title>Jamgati</title>
    <meta charset="utf-8">
    <meta name="description" content="description de la page">
    <link rel="stylesheet" href="css/app.css">
    <link rel="icon" type="image/png" href="assets/images/logo-jamgati.png" />
</head>



<body>
    @yield('header')

    @yield('content')
        
    <nav role="navigation" aria-label="Main Navigation">
        <ol>
            <li>
                <a href="#">menu 1</a>
            </li>
            <li>
                <a href="#">menu 2</a>
            </li>
            <li>
                <a href="#">menu 3</a>
            </li>
            <li>
                <a href="#">menu 4</a>
            </li>
        </ol>
    </nav>

    <main role="main">
        <h2>Titre principal</h2>
        <article>
            <p>Contenu</p>
        </article>
    </main>

    <aside>
        <form role="search">
            <input type="search" placeholder="recherche...">
            <input type="submit" value="recherche">
        </form>
        <h3>Contenu complémentaire</h3>
    </aside>

    <footer role="contentinfo">
        <p>Informations à propos de la page</p>
    </footer>

</body>

</html>
