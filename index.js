var express = require("express");
var request = require('request');
var fs = require('fs');
var exec = require('child_process').exec;

var app = express();
var port = 5000;
var work;

var optionsSmartLamp = {
	uri : "http://218.150.183.150:3000/pi2",
	method : "GET",
	headers : { "Content-Type" : "application/x-www-form-urlencoded"},
};
var client_id = 'fa5RCa6jbNzwl9FnkdKj';
var client_secret = 'Xdfz2Cg1kr';
var optionsTTS = {
    url: "https://openapi.naver.com/v1/voice/tts.bin",
    form: {'speaker':'mijin', 'speed':'0', 'text':''},
    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
};

app.get('/', function(req,res) {
	console.log('smart void lamp');
	fs.readFile('hello.html', function(err,data) {
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.end(data);
	});
//	res.send('Smart Voice Lamp');
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
			optionsTTS.form.text=body;
			var writeStream = fs.createWriteStream('./newTTS.mp3');
			var _req = request.post(optionsTTS).on('response', function(response) {
				console.log(response.statusCode);
				console.log(response.headers['content-type']);
			});
			_req.pipe(writeStream);
			work = exec('chromium-browser -no-sandbox http://218.150.183.150:3000/tts1.mp3',function(err, stdout, stderr) {
				if(err) {
					console.log("ERROR");
				}
				console.log(stdout);
			});
		}
	});
}
