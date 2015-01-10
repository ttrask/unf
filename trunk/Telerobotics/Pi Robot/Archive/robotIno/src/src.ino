// See http://friendsoftheunicorn.net/content/raspberry-pi-gertduino-serial
// for information on this file

#include <Wire.h>
#include <Adafruit_MotorShield.h>

Adafruit_MotorShield AFMS = Adafruit_MotorShield(); 

Adafruit_DCMotor *motor1 = AFMS.getMotor(1);
Adafruit_DCMotor *motor2 = AFMS.getMotor(2);

int led_pin[6]={13, 9, 10, 3, 5, 6};
int led_state[6]={};
boolean runMotor1 = false;
boolean runMotor2 = false;
int botDirection = 0;

void setup()
{
  Serial.begin(9600);
  for(int i=0; i<6; i++)
    pinMode(led_pin[i], OUTPUT);

  //start motor shield
  AFMS.begin();
  
  //init motor 1 & 2 
  motor1->setSpeed(200);
  motor2->setSpeed(200);
  motor1->run(FORWARD);
  motor2->run(FORWARD);
  
  //turn motors on
  motor1->run(RELEASE);
  motor2->run(RELEASE);
}

void loop()
{
	digitalWrite(led_pin[0], 1);
  
	if(runMotor1==true){
		switch(botDirection){
			case 1:
				motor1->run(FORWARD);
				motor2->run(FORWARD);		
				break;
			case 2:
				motor1->run(BACKWARD);
				motor2->run(BACKWARD);		
				break;
		}
	}
	else{
		motor1->run(RELEASE);
		motor2->run(RELEASE);
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
			botDirection=1;
			if(runMotor1==true){
				Serial.println("Robot forward!");
			}
			else{
				Serial.println("Robot Stopping!");
			}
		}
		else if(i==7){
			runMotor1 = !runMotor1;
			runMotor2 = !runMotor2;
			botDirection = 2;
			
			if(runMotor1==true){
				Serial.println("Robot Reverse!");
			}
			else{
				Serial.println("Robot Stopping!");
			}
		}
	}
}
