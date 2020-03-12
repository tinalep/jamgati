@extends('layout-board')

@section('title')
    Tableau de bord - Jamgati
@endsection

@section('content')

<?php
$user = Auth::user();
$content = (isset($_GET['content'])?$_GET['content']:'form');
?>
        
<div class="dashboard">
    <div class="dashboard_header">
        <h1>Tableau de bord</h1> 
        <form method="get" action="{{ route('choice') }}">
            <div class="dropdown">
            {{-- <button class=>+</button> --}}

                <button aria-label="New" class="button button-bgorange button-no-border button-round" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  +
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="{{route('tab.create')}}">Tableau</a>
                    <a class="dropdown-item" href="{{route('form.create')}}">Formulaire</a>
                    <a class="dropdown-item" href="{{route('nav.create')}}">Menu</a>
                </div>
              </div>
        </form>
    </div>
    <nav class="dashboard_nav">
        <a class="dashboard_nav__link {{$content=='tab'?'dashboard_nav__link--active':''}}" href="?content=tab">Tableau</a>
        <a class="dashboard_nav__link {{$content=='form'?'dashboard_nav__link--active':''}}" href="?content=form">Formulaire</a>
        <a class="dashboard_nav__link {{$content=='nav'?'dashboard_nav__link--active':''}}" href="?content=nav">Menu</a>
    </nav>

    <table class="table_dashboard" style="width:100%">
        @switch($content)
            @case('nav')
                @if ($navs->items())
                <thead>
                    <tr>
                        <th scope="col">Titre</th>
                        <th scope="col">Dernière modification</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                @else
                <div class="dashboard_empty">
                    <p>Vous n'avez pas encore créé de menu. <a href="{{route('nav.create')}}">Commencez</a></p>
                </div>
                @endif

                @break
            @case('form')
                @if ($forms->items())
                <thead>
                    <tr>
                        <th scope="col">Titre</th>
                        <th scope="col">Dernière modification</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                @else
                <div class="dashboard_empty">
                    <p>Vous n'avez pas encore créé de formulaire. <a href="{{route('form.create')}}">Commencez</a></p>
                </div>
                @endif
                
                @break
            @default
            <div class="dashboard_empty">
                <p>Vous n'avez pas encore créé de contenu</p>
            </div>
        @endswitch

        <tbody>
            @switch($content)
                @case(1)
                    
                    @break
                @case('form')
                    @foreach ($forms as $form)
                    <tr>
                        <td scope="row" data-label="Titre" class="table_dashboard__title">{{ $form->name }}</td>
                        <td data-label="Dernière modification" class="table_dashboard__update">{{date('d/m/y', strtotime($form->updated_at )) }}</td>
                        <td  data-label="Actions" class="table_dashboard__action">
                            <a href="#"><em class="fas fa-download"></em></a>
                            <a href="{{ route('form.edit', ['form'=>$form]) }}"><em class="fas fa-edit"></em></a> 
                            <!-- Button trigger modal -->
                            <a type="button" data-toggle="modal" data-target="{{'#exampleModal'.$form->id}}">
                                <em class="fas fa-trash"></em>
                            </a>
        
                            <!-- Modal -->
                            <div class="modal fade" id="{{'exampleModal'.$form->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <button aria-label="Close" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <em class="fas fa-times"></em>
                                    </button>
                                    </div>
                                    <div class="modal-body">
                                        <form action="{{ route('form.destroy', ['form'=>$form])}}" method="post">
                                            @csrf
                                            @method('DELETE')
                                            <p>Etes-vous sûr de vouloir supprimer ce contenu</p>
                                            <button aria-label="Submit" type="submit" class="button button-bgred button-no-border">Supprimer</button>
                                            <button type="button" class="cancel" data-dismiss="modal" aria-label="Close">
                                                Annuler
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    @endforeach
                    @break
                @case('nav')
                    @foreach ($navs as $nav)
                    <tr>
                        <td scope="row" data-label="Titre" class="table_dashboard__title">{{ $nav->name }}</td>
                        <td data-label="Dernière modification" class="table_dashboard__update">{{date('d/m/y', strtotime($nav->updated_at )) }}</td>
                        <td  data-label="Actions" class="table_dashboard__action">
                            <a href="#"><em class="fas fa-download"></em></a>
                            <a href="{{ route('nav.edit', ['nav'=>$nav]) }}"><em class="fas fa-edit"></em></a> 
                            <!-- Button trigger modal -->
                            <a type="button" data-toggle="modal" data-target="{{'#exampleModal'.$nav->id}}">
                                <em class="fas fa-trash"></em>
                            </a>
        
                            <!-- Modal -->
                            <div class="modal fade" id="{{'exampleModal'.$nav->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <em class="fas fa-times"></em>
                                    </button>
                                    </div>
                                    <div class="modal-body">
                                        <form action="{{ route('nav.destroy', ['nav'=>$nav])}}" method="post">
                                            @csrf
                                            @method('DELETE')
                                            <p>Etes-vous sûr de vouloir supprimer ce contenu</p>
                                            <button aria-label="Delete" type="submit" class="button button-bgred button-no-border">Supprimer</button>
                                            <button type="button" class="cancel" data-dismiss="modal" aria-label="Close">
                                                Annuler
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    @endforeach
                    @break
                @default
            @endswitch
        </tbody>
    </table>

    @switch($content)
        @case(1)
            
            @break
        @case('form')
            {{ $forms->appends(['content' => 'form'])->links() }}
            @break
        @case('nav')
            {{ $navs->appends(['content' => 'nav'])->links() }}
            @break
        @default
    @endswitch
</div>
@endsection


