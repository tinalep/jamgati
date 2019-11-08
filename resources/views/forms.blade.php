<!doctype html>
<html>

<head>
    <title>Forms</title>
    <meta charset="utf-8">
    <meta name="description" content="description de la page">
    <link rel="stylesheet" href="css/app.css">
    <link rel="icon" type="image/png" href="assets/images/img-logo-jamgati.png" />
</head>

<body>
    <h1>Formulaires</h1>
    <ul>
        @foreach ($forms as $form)
        <li><a href="{{route('form.show', $form)}}"> {{$form->name}}</a></li>
        @endforeach
        <br>
    </ul>



</body>
