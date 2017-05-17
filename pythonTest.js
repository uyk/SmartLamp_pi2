var PythonShell = require('python-shell');
var pyshell = new PythonShell('script.py');

pyshell.send(JSON.stringify([1,2,3,4,5]));

pyshell.on('message', function(message) {
	console.log(message);
});

pyshell.end(function (err){
	if(err) {
		throw err;
	}
	console.log('finished');
});
