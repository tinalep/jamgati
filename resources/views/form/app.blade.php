<!doctype html>
<html>

    <head>
    <title>Formulaire création</title>
        <meta charset="utf-8">
        <meta name="description" content="description de la page">
        <link rel="stylesheet" href="{{asset(mix("css/app.css"))}}">
        <link rel="icon" type="image/png" href="assets/images/img-logo-jamgati.png" />
    </head>

    <body>
    <h1>Formulaire:</h1>

    <div id="form-root" data-form={{ isset($form) ? $form->id : null}}></div>
    </body>
    <script type="text/javascript" src="{{asset(mix("js/app.js"))}}"></script>
</html>
