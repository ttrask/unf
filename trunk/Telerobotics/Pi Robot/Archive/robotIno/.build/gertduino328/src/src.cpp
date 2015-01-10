#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_MotorShield.h>
void setup();
void loop();
#line 1 "src/src.ino"
// See http://friendsoftheunicorn.net/content/raspberry-pi-gertduino-serial
// for information on this file

//#include <Wire.h>
//#include <Adafruit_MotorShield.h>

Adafruit_MotorShield AFMS = Adafruit_MotorShield(); 

Adafruit_DCMotor *motor1 = AFMS.getMotor(1);
Adafruit_DCMotor *motor2 = AFMS.getMotor(2);

int led_pin[6]={13, 9, 10, 3, 5, 6};
int led_state[6]={};
boolean runMotor1 = false;
boolean runMotor2 = false;

void setup()
{
  Serial.begin(9600);
  for(int i=0; i<6; i++)
    pinMode(led_pin[i], OUTPUT);
  motor1->setSpeed(200);
  motor2->setSpeed(200);
}

void loop()
{
  digitalWrite(led_pin[0], 1);
  
  if(runMotor1==true){
	motor1->run(FORWARD);
        motor2->run(FORWARD);
  }

  if(Serial.available()>0)
  {
    Serial.println("Recieved Request");
    int i, inByte;
    inByte = Serial.read();

    i = inByte - '0';

    if(i>=0 && i<=5)
    {
      led_state[i] = !led_state[i];
      digitalWrite(led_pin[i], led_state[i]);
      Serial.print("Led ");
      Serial.write(inByte);
      Serial.print(" turned ");
      if(led_state[i])
        Serial.println("on");
      else
        Serial.println("off");
    }
    else if(i==6){
	runMotor1 = !runMotor1;
        runMotor2 = !runMotor2;
	if(runMotor1==true){
		Serial.println("Robot Starting!");
	}
	else{
		Serial.println("Robot Stopping!");
	}
    }
    else if(i==7){
//	runMotor2 = !runMotor2;
    }
  }
}
