<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\API;
//use App\Http\Controllers\API\CustomersController;
//use App\Http\Controllers;
//use App\Http\Controllers\CustomerController;

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
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::apiResource ('customers', 'CustomerController');
//Route::apiResource ('customers', 'API\CustomerController');
//Route::apiResource ('customers', 'App\Http\Controllers\API\CustomerController@index');
//App\Http\Controllers\Api\RegisterController@register
