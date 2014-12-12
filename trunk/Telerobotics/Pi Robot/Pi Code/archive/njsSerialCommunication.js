var SerialPort = require("serialport").SerialPort;
var serialport = new SerialPort("/dev/ttyAMA0");
serialport.on('open', function(){
  console.log('Serial Port Opend');
  serialport.on('data', function(data){
      console.log(data[0]);
  });
});

