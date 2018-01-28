<?php
require 'vendor/autoload.php';

$username=
$password=

$retarr = array();

try {
// Specifying the username and password in the connection URI (preferred)
$mongo = new MongoDB\Driver\Manager("mongodb://${username}:${password}@volare.kdd.cs.ksu.edu:7017/traffic");


    
    
//$IntId = 7289;
//$filter = ['IntId' => $IntId];
$filter = [array('DATETIME_OF_AC' => array('$gte'=>ISODate("2016-01-01T00:00:00.000Z")) )];
$options = ['projection' => ['_id' => 0,'AT_ROAD__1' => 1,'DOT_LATITU' => 1,'DOT_LONGIT' => 1]];

//dont need to change for this line
$query = new MongoDB\Driver\Query($filter, $options);

$rows = $mongo->executeQuery('traffic.crashGeometry', $query); // $mongo contains the connection object to MongoDB


foreach($rows as $r){
	array_push($retarr,array($r-> AT_ROAD__1,$r-> DOT_LATITU,$r->DOT_LONGIT));
}
// encode as a JSON object to return to javascript
echo json_encode($retarr);

} catch (Exception $e) {
	echo 'Caught exception: ',  $e->getMessage(), "\n";
}

?>
