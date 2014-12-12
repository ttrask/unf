#!/usr/bin/env python
import serial

ser = serial.Serial('/dev/ttyAMA0', 9600, timeout=1)
while True:
    inStr = raw_input("Enter an led number between 0 and 5 followed by ENTER ")
    try:
        led = int(inStr)
    except ValueError:
        led = -1
    if led >= 0 and led <= 5:
        ser.write(str(led))
        print ser.readline()[:-2]
