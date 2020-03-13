@extends('layout-board')

<?php
$user = Auth::user();
?>

@section('title')
    Tableau de bord - Paramètres
@endsection

@section('content')
    <div class="settings">
        <div>
        <h1>Paramètres</h1>
        <div class="hidden">{{$user->id}}</div>
        <p>Nom</p>
        {{$user->name}}

        <p>Adresse mail</p>
        {{$user->email}}

        <p>Mot de passe</p>
        <button type="button" class="button button-bgorange button-no-border modify" data-toggle="modal" data-target="#exampleModal">
        Modifier votre mot de passe
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="{{ route('user.update', ['user'=>$user])}}" method="post">
                {{ csrf_field() }}

                <div class="form-group">
                    <label class="col-form-label">Nouveau mot de passe</label>
                    <input class="form-control" type="password" name="password">
                    @if($errors->has('password'))
                        <p class="help is-danger">{{ $errors->first('password') }}</p>
                    @endif
                </div>

                <div class="form-group">
                    <label class="col-form-label">Confirmez votre mot de passe</label>
                    <input class="form-control" type="password" name="password_confirmation">
                    @if($errors->has('password_confirmation'))
                        <p class="help is-danger">{{ $errors->first('password_confirmation') }}</p>
                    @endif
                </div>

                <div class="field">
                    <div class="control">
                        <button class="button button-bgred button-no-border" type="submit">Modifier mon mot de passe</button>
                    </div>
                </div>
                </form>
                </div>
                </div>
            </div>
        </div>
    </div>

    <form action="{{ route('user.destroy', ['user'=>$user]) }}" method="post">
        @csrf
        @method('DELETE')
        <button type="submit" class="button button-link button-no-border">Supprimer votre compte</button>
    </form>

    </div>

@endsection