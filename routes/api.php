<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TacheController;
use App\Http\Controllers\Api\ProjetController;
use App\Http\Controllers\Api\ServiceController;

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
Route::middleware('auth:sanctum')->group(function() {

    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/me', [UserController::class, 'me']);

    //Personnel routes action
    Route::get('/user/liste-user', [UserController::class,'index']);
    //chef de service action route projet
    Route::post('/user/projet/add-projet', [ProjetController::class, 'store']);
    Route::get('/user/projet/liste-projet', [ProjetController::class, 'index']);
    Route::get('/user/projet/liste-projet/detail-projet/{id}', [ProjetController::class, 'show']);
    //tache route action
    Route::post('/user/taches/add-tache', [TacheController::class, 'store']);
    Route::patch('/user/tache/detail-tache/{id}', [TacheController::class, 'updatestatut']);
    Route::get("/user/projet/liste-user/{id}", [TacheController::class, 'userprojet']);
    // Route::get("/user/projet/liste-projet/detail-projet/evolution/{id}", [TacheController::class, 'pourcentage']);

    //Admin routes action
    Route::post('/admin/add-service', [ServiceController::class, 'store']);
    Route::post('/admin/add-role', [RoleController::class, 'store']);
    Route::get('/admin/adduser/data-partial', [UserController::class, 'etrangeres']);
    Route::post('/admin/user/add-user', [UserController::class, 'store']);

});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
//login route action
Route::post('/user/login', [UserController::class, 'login']);
