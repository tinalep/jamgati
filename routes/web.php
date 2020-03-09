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

// Download file
Route::post('/dl/test', 'BoardController@dl')->name('dl');

// Table
Route::get('/table/loadall', 'TableController@loadall')->name('table.loadall');
Route::get('/table/{table}/load', 'TableController@load')->name('table.load');
Route::resource('/table', 'TableController');

// Form
Route::get('/form/loadall', 'FormController@loadall')->name('form.loadall');
Route::get('/form/{form}/load', 'FormController@load')->name('form.load');
Route::resource('/form', 'FormController');

// Nav
Route::get('/nav/loadall', 'NavController@loadall')->name('nav.loadall');
Route::get('/nav/{nav}/load', 'NavController@load')->name('nav.load');
Route::resource('/nav', 'NavController');

Route::get('/board', 'BoardController@index')->name('board');
Route::get('/choice', 'BoardController@choice')->name('choice');
Route::get('/search', 'SearchController@index')->name('search');

// Guest routes
Route::get('/nav/create', 'NavController@create')->name('nav.create');
Route::get('/tab/create', 'TableController@create')->name('tab.create');
Route::get('/form/create', 'FormController@create')->name('form.create');

Route::get('/doc', 'HomeController@doc')->name('doc');

//Dashboard
Route::get('/settings', 'HomeController@settings')->name('settings');

//Footer
Route::get('/mentions', 'HomeController@mentions')->name('mentions');
Route::get('/data', 'HomeController@data')->name('data');


Auth::routes();
Route::get('logout', 'Auth\LoginController@logout')->name('logout');

// Route::get('password/reset', 'ForgotPasswordController@showLinkRequestForm')->name('admin.password.reset');
// Route::post('password/email', 'ForgotPasswordController@sendResetLinkEmail');
// Route::get('password/reset/{token}', 'ResetPasswordController@showResetForm')->name('admin.password.token');
// Route::post('password/reset', 'ResetPasswordController@reset');
