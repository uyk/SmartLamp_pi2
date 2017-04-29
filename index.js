var express = require("express");
var bodyParser = require("body-parser");
var request = require('request');

var app = express();
var port = 5000;

var optionsSmartLamp = {
	uri : "http://218.150.183.150:3000/smartLamp",
	method : "GET",
	headers : { "Content-Type" : "application/x-www-form-urlencoded"},
}

app.use(bodyParser.urlencoded( {extended : false } ));

app.get('/', function(req,res) {
	console.log('smart void lamp');
	res.send('Smart Voice Lamp');
});

app.listen(port,function() {
	console.log("create Server");

	//1초마다 smartLamp 함수 호출
	setInterval(smartLamp,1000);
});

function smartLamp() {
	//GET 요청 전송
	request(optionsSmartLamp, function(error, response, body) {
		if(body == "empty" ) {
			console.log("no data");
		}
		else {
			console.log(body);
		}
	});
}
