var WebSocket =  require('ws');

var ip = '127.0.0.1'
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
	console.log('recieved message from server:'+message);
});