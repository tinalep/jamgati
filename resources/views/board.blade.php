@extends('layout-board')

@section('title')
    Tableau de bord - Jamgati
@endsection

@section('content')

<?php
$user = Auth::user();
?>
        
<div class="dashboard">
    <div class="dashboard_header">
        <h1>Tableau de bord</h1> 
        <form method="get" action="{{ route('choice') }}">
            <button class="button button-bgorange button-no-border button-round">+</button>
        </form>
    </div>
    <nav class="dashboard_nav">
        <a class="dashboard_nav__link dashboard_nav__link--active" href="#">Tableau</a>
        <a class="dashboard_nav__link" href="#">Formulaire</a>
        <a class="dashboard_nav__link" href="#">Menu</a>
    </nav>

    <table class="table_dashboard" style="width:100%">
        <thead>
            <tr>
                <th>Titre</th>
                <th>Dernière modification</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($forms as $form)
            <tr>
                <td class="table_dashboard__title"> {{ $form->name }}</td>
                <td class="table_dashboard__update">{{date('d/m/y', strtotime($form->updated_at )) }}</td>
                <td class="table_dashboard__action"><a href="download"><i class="fas fa-download"></i></a><a href="{{ route('form.edit', ['form'=>$form]) }}"><i class="fas fa-edit"></i></a>
                <form action="{{ route('form.destroy', ['form'=>$form])}}" method="post">
                    @csrf
                    @method('DELETE')
                    <button type="submit"><i class="fas fa-trash"></i></button>
                </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    {{ $forms->links() }}
</div>
@endsection


