<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/books', 'BookController@index');
Route::get('/books/find', 'BookController@find');
Route::get('/books/{id}', 'BookController@show');
Route::post('/books', 'BookController@store');
Route::patch('/books/{id}', 'BookController@edit');
Route::delete('/books/{id}', 'BookController@destroy');

