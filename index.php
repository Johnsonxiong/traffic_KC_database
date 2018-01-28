<?php
require 'vendor/autoload.php';

$username = "trafficteam";
$password = "tuesday3pm0076";

try {
// Specifying the username and password in the connection URI (preferred)
$mongo = new MongoDB\Driver\Manager("mongodb://${username}:${password}@volare.kdd.cs.ksu.edu:7017/traffic");


$IntId = 7289;
$filter = ['IntId' => $IntId];
//$filter = [];
$options = ['projection' => ['_id' => 0,'Name' => 1]];
$query = new MongoDB\Driver\Query($filter, $options);
$rows = $mongo->executeQuery('traffic.detectorstation', $query); // $mongo contains the connection object to MongoDB
foreach($rows as $r){
	echo $r-> Name;
}
} catch (Exception $e) {
	echo 'Caught exception: ',  $e->getMessage(), "\n";
}

?>