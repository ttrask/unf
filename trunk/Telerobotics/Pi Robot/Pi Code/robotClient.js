var SerialPort = require("serialport").SerialPort;
var WebSocket =  require('ws');

var serialport = new SerialPort('/dev/ttyAMA0', {
	baudrate: 9600
});

serialport.on('open', function(){
        console.log('Arduino Serial Port open');
});

serialport.on('data', function(data) {
	console.log('arduino says: ' + data);
});

serialport.on('close', function(){
	console.log('arduino closed serial connection');
});

var ip = '192.168.1.104'
var port = 8085;
var connection = ip+":"+port;
console.log('Node Client Listening on :' + port);

var client = new WebSocket( 'ws://'+connection);
console.log('Node connected on :'+connection);

client.on('open', function(){
	client.send('message');
});

client.on('recieveCommand', function(message){
	console.log('recieved command: '+message);
});

client.on('message', function(message){
	console.log('Sending message from server to serial:'+message );
	serialport.write(message, function(err, results){
		console.log('err '+err);
		console.log('results '+results);
	});
});
