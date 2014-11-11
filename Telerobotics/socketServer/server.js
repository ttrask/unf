//var app = require('express');
//var http = require('http').Server(app);
//var app = require('http').createServer(handler)
var io = require('socket.io').listen(1337);
var notifier = require('node-notifier');
var twilio = require('twilio');

/*
var util = require('util'),
    connect = require('connect'),
	serveStatic = require('serve-static'),
    port = 1337;

connect().use(serveStatic(__dirname)).listen(port);

util.puts('Serving web on ' + port + '...');
util.puts('Press Ctrl + C to stop.');
*/


var pong = io.of('/pong').on('connection', function(socket){
	  console.log('pong connected');
	  socket.join('pongClient');
	 
	 socket.on('pong', function(){
		io.to('pingClient').emit('pong');
		console.log('PING MOTHERFUCKER');
	 });
});

var ping = io.of('/ping').on('connection', function(socket){
	  console.log('ping connected');
	  socket.join('pingClient');
	 
	 socket.on('ping', function(){
		io.to('pongClient').emit('ping');
		console.log('PONG MOTHERFUCKER');
	
	 });
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.broadcast.emit('User Connected');
  notifier.notify({
	'title': 'Node Server',
	'message': 'User Connected!'
	});
	/*
	client.sendSms({
		to:'+19045140688',
		from: "+19046395631", 
		body:'User has logged in to Server.'
	}, function(error, message) {
		if (!error) {
			console.log('Success! The SID for this SMS message is:');
			console.log(message.sid);
			console.log('Message sent on:');
			console.log(message.dateCreated);
		} else {
			console.log('Oops! There was an error.');
			console.log(error);
		}
	});
	*/
  socket.on('disconnect', function(){
    console.log('user disconnected');
	socket.broadcast.emit('User disconnected');
	notifier.notify({
	'title': 'Node Server',
	'message': 'User Disonnected'
	});
  });
  
  socket.on('ping', function(time){
	console.log(socket.id+" "+time);
	io.to(socket.id).emit('pingReturn',time);
  });
  
  
  socket.on('chat', function(msg){
    console.log('message: ' + msg);
	io.emit('chat', msg);
  });
});
