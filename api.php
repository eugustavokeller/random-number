<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['PATH_INFO'] === '/random-number') {
    $randomNumber = rand(0, 100);
    echo json_encode(array('number' => $randomNumber));
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['PATH_INFO'] === '/save-number') {
    $data = json_decode(file_get_contents('php://input'), true);
    $number = $data['number'];
    
    file_put_contents('numbers.txt', $number . "\n", FILE_APPEND);
    
    echo json_encode(array('message' => 'Número salvo com sucesso!'));
} else {
    echo json_encode(array('message' => 'Rota inválida.'));
}
