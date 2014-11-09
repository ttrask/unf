var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var notifier = require('node-notifier');
var twilio = require('twilio');

var accountSid = 'AC11b6f70fcc26ab92a3d053a760f63915'; 
var authToken = '9296259abe65f59554fad9e18a136cd1'; 
var client = require('twilio')(accountSid, authToken);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
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


http.listen(3000, function(){
  console.log('listening on *:3000');
});
