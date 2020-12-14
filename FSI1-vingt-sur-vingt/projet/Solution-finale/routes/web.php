<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'ProgDistrib'],function($router){
	$router->get('billet','ControllerBillet@showBillet');

	$router->get('reserver/{id}','ControllerBillet@reserver');

	$router->post('connexion','ControllerBillet@connexion');

	$router->get('index','ControllerBillet@ShowIndex');

	$router->get('MesResa','ControllerBillet@showReservation');

	$router->get('Deconnexion','ControllerBillet@Deco');

});
