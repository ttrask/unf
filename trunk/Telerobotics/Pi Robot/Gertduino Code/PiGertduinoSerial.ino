// See http://friendsoftheunicorn.net/content/raspberry-pi-gertduino-serial
// for information on this file

int led_pin[6]={13, 9, 10, 3, 5, 6};
int led_state[6]={};

void setup()
{
  Serial.begin(9600);
  for(int i=0; i<6; i++)
    pinMode(led_pin[i], OUTPUT);
}

void loop()
{
  digitalWrite(led_pin[0], 1);
  
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
  }
}
