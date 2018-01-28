#!/usr/bin/env nodejs

function plotCrashSite(){

// Define connection parameters
var MongoClient = require('mongodb').MongoClient,
Db = require('mongodb').Db,
assert = require('assert'),
f = require('util').format;
var user = encodeURIComponent('trafficteam');
var password = encodeURIComponent('tuesday3pm0076');
var authMechanism = 'DEFAULT';

// Encode the connection parameters into a url string
var url = f('mongodb://%s:%s@volare.kdd.cs.ksu.edu:7017/traffic?authMechanism=%s',user,password,authMechanism);


    
// Connect to the db
MongoClient
	.connect(url,function(err,db){
			assert.equal(null,err);
			findCrashSites(db,function () {
				db.close();
		});
			});


var findCrashSites = function(db,callback){
	db.collection('crashGeometry').aggregate([
						  {
						   $project:
						            {
							     _id:0,
							     DOT_LONGIT:1,
							     DOT_LATITU:1
							    }
						  }
					         ])
						.toArray(function(err,result){
								    assert.equal(err,null);
					    			    console.log(result);
								    callback(result);
								   }
					     );

					   };


}


plotCrashSite();
