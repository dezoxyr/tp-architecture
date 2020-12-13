<?php
//$data = print_r(json_decode(file_get_contents('php://input'), true), true);
$data = print_r(json_decode(file_get_contents('php://input'), true), true);

$data = substr($data, 8,-1);
$data = preg_replace("/[\r\n]/", "", $data);
$data = preg_replace('#\[#','","',$data );
$data = preg_replace('#\]#','"',$data );
$data = preg_replace('#\=>#', ': "', $data);
$data = substr($data, 6);
$data .= '"}]';
$data = ',{' . $data;
$fulldata = print_r(file_get_contents("./data/Billets.json"), true);
$fulldata = substr($fulldata, 0, -1);
$fulldata .= $data;
$fulldata = preg_replace("@\)@", "", $fulldata);
$fulldata = str_replace(" ", "", $fulldata);
file_put_contents("./data/Billets.json", $fulldata);
