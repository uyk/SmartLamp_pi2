var express = require("express");
var request = require('request');
var PythonShell = require('python-shell');
var fs = require('fs');

var app = express();
var port = 5000;
var work;

var optionsSmartLamp = {
	uri : "http://218.150.183.150:3000/pi2",
	method : "GET",
	headers : { "Content-Type" : "application/x-www-form-urlencoded"},
};

var optionsMP3 = {
	uri : 'http://218.150.183.150:3000/tts1.mp3'
};

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
			var writeStream = fs.createWriteStream('./tts.mp3');
			var _req = request.get(optionsMP3).on('response', function(response) {
				console.log(response.statusCode);
				console.log(response.headers['content-type']);
			});
			_req.pipe(writeStream);
			var audio = new Audio('tts.mp3');
			audio.play();
		}
	});
}
