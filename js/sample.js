#!/usr/bin/env nodejs

var dbObj;
conObj = createConnection();
console.log(conObj);

/*dbconObj.collection('detectorstation').find().limit(10).forEach(function(doc)
  {
        console.log(doc);
  });
dbconObj.close();*/

function createConnection(){

// Define connection parameters
var MongoClient = require('mongodb').MongoClient,
f = require('util').format;
var user = encodeURIComponent('trafficteam');
var password = encodeURIComponent('tuesday3pm0076');
var authMechanism = 'DEFAULT';

// Encode the connection parameters into a url string
var url = f('mongodb://%s:%s@volare.kdd.cs.ksu.edu:7017/traffic?authMechanism=%s',user,password,authMechanism);


// Connect to the db
var conn = MongoClient.connect(url, callBack(err,db));
return conn;
}

function callBack(err,db){
	console.log("Callback function called");
	if(err) return console.log(err);
	else{
		console.log("Connected Successfully");
		dbObj = db;
	}
}
