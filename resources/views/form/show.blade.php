<!doctype html>
<html>

<head>
<title>{{$form->name}}</title>
    <meta charset="utf-8">
    <meta name="description" content="description de la page">
    <link rel="stylesheet" href="css/app.css">
    <link rel="icon" type="image/png" href="assets/images/img-logo-jamgati.png" />
</head>

<body>
<h1>Formulaire: {{$form->name}}</h1>

{{-- <form action="{{$form->action}}" method="{{$form->method}}">
    @foreach ($form->simput as $item)
        @switch($item->category)
            @case('text' || )
                
                @break
            @case(2)
                
                @break
            @default
                
        @endswitch
        <input type="{{$item->category}}"
        @isset($item->placeholder)placeholder="{{$item->placeholder}}"
        name="{{$item->name}}">
    @endforeach
</form> --}}

</body>
