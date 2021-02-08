<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/login', 'UsersController@login');
Route::post('/logout', 'UsersController@logout_user');

Route::group(['middleware' => 'auth:api', 'prefix' => 'users'], function () {
    Route::get('/', 'UsersController@index');
    Route::post('/', 'UsersController@store');
    Route::put('/', 'UsersController@put');
    Route::delete('/{id}', 'UsersController@delete');
    
});