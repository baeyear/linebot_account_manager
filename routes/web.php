<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OfficialAccountController;

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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::group(['prefix' => 'api', 'middleware' => ['auth']], function () {
    Route::get('users', 'Api\UserController@index');
    Route::post('official_accounts/create', 'Api\OfficialAccountController@store');
    Route::get('official_accounts', 'Api\OfficialAccountController@index');
});

Route::get('{any}', 'HomeController@index');
