<?php

require __DIR__ . '/vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

include __DIR__ . '/database.php';

// Instantiate app
$app = AppFactory::create();

//permet de parsé en json 
$app->addBodyParsingMiddleware();

// Add Error Handling Middleware
//$app->addErrorMiddleware(false, false, false);

// route donnant la liste des vols
$app->post('/liste_vol', function (Request $request, Response $response, array $args) {
    $database = new Database();
    $response->getBody()->write(json_encode($database->getListVol()));
    $response = $response->withHeader('Access-Control-Allow-Origin', '*');
    return $response->withHeader('Content-Type', 'application/json');
});

// route permettant de reservé
$app->post('/reserv_vol', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();    
    $database = new Database();
    $res = $database->reservation($data['id'], $data['client']);
    if(!$res)
        $res = array("error" => "Vol inconnu"); 
    $response->getBody()->write(json_encode($res));
    $response = $response->withHeader('Access-Control-Allow-Origin', '*');
    return $response->withHeader('Content-Type', 'application/json');
});

// route de savoir ce qui a été reservé
$app->post('/voir_reserv', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();    
    $database = new Database();
    $response->getBody()->write(json_encode($database->getReservation($data['client'])));
    $response = $response->withHeader('Access-Control-Allow-Origin', '*');
    return $response->withHeader('Content-Type', 'application/json');
});

// Run application
$app->run();

?>