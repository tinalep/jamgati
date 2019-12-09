<!doctype html>
<html>

<head>
    <title>Jamgati</title>
    <meta charset="utf-8">
    <meta name="description" content="description de la page">
    <link rel="stylesheet" href="css/app.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Script qui permet de charger FONTAWESOME plus rapidement --}}
    <script type="text/javascript"> (function() { var css = document.createElement('link'); css.href = 'https://use.fontawesome.com/releases/v5.1.0/css/all.css'; css.rel = 'stylesheet'; css.type = 'text/css'; document.getElementsByTagName('head')[0].appendChild(css); })(); </script>
    <link rel="icon" type="image/png" href="assets/images/logo-jamgati.png" />
</head>



<body>
    @yield('header')

    @yield('content')
</body>

</html>
