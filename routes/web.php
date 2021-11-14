<?php

use Illuminate\Support\Facades\Auth;

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

Route::view('/', 'welcome');

Auth::routes();

Route::group(['prefix' => 'api', 'middleware' => ['auth']], function () {
    Route::get('users', 'Api\UserController@index');
    Route::post('official_accounts/create', 'Api\OfficialAccountController@store');
    Route::get('official_accounts', 'Api\OfficialAccountController@index');
    Route::get('official_account/{id}', 'Api\OfficialAccountController@show');
    Route::get('official_account/{id}/users', 'Api\OfficialAccountController@showUsers');
    Route::delete('official_account/user', 'Api\UserController@destroyPermission');
    Route::post('official_account/user/create', 'Api\UserController@storePermission');
    Route::post('official_account/check', 'Api\OfficialAccountController@checkAccount');
    Route::get('user_list/{id}', 'Api\LineUserController@index');
    Route::get('chat/{line_user_id}', 'Api\ChatController@index');
    Route::post('chat', 'LineController');
});

Route::get('{any}', 'HomeController@index')->where('any', '.*');
