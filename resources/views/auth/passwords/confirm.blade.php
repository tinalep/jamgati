@extends('layout')

@section('content')
<main  name="content" role="main">    
    <div class="container sign">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header heading-3">{{ __('Confirmer son mot de passe') }}</div>

                    <div class="card-body">
                        {{ __('Merci de confirmer avant de continuer.') }}

                        <form method="POST" action="{{ route('password.confirm') }}">
                            @csrf

                            <div class="form-group">
                                <label for="password" class="col-md-4 col-form-label">{{ __('Mot de passe') }}</label>

                                <div class="col-12">
                                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                    @error('password')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-12">
                                    <button type="submit" class="button button-no-border button-bgred btn btn-primary">
                                        {{ __('Confirmer le mot de passe') }}
                                    </button>

                                    @if (Route::has('password.request'))
                                        <a class="btn btn-link" href="{{ route('password.request') }}">
                                            {{ __('Mot de passe oublié ?') }}
                                        </a>
                                    @endif
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
@endsection
