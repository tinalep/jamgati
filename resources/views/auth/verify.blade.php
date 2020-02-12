@extends('layout')

@section('content')
<main role="main">
    <div class="container sign">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header heading-3">{{ __('Vérifier son adresse email') }}</div>

                    <div class="card-body">
                        @if (session('resent'))
                            <div class="alert alert-success" role="alert">
                                {{ __('A fresh verification link has been sent to your email address.') }}
                            </div>
                        @endif

                        {{ __('Avant de continuer, merci de verifier votre boite mail.') }}
                        {{ __('Si vous n\'avez pas reçu de mail') }},
                        <form class="d-inline" method="POST" action="{{ route('verification.resend') }}">
                            @csrf
                            <button type="submit" class=" button button-no-border button-bgred btn btn-link p-0 m-0 align-baseline">{{ __('Recevoir un mail') }}</button>.
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
@endsection
