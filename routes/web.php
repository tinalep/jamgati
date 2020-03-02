<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Accueil  
Route::get('/', 'HomeController@index')->name('home');
Route::get('/form/loadall', 'FormController@loadall')->name('form.loadall');
Route::get('/form/{form}/load', 'FormController@load')->name('form.load');
Route::resource('/form', 'FormController');
Route::get('/board', 'BoardController@index')->name('board');
Route::get('/choice', 'BoardController@choice')->name('choice');
Route::get('/search', 'SearchController@index')->name('search');
Route::get('/nav/create', 'HomeController@create')->name('nav.create');

//Footer
Route::get('/mentions', 'HomeController@mentions')->name('mentions');
Route::get('/data', 'HomeController@data')->name('data');

Auth::routes();
Route::get('logout', 'Auth\LoginController@logout')->name('logout');

