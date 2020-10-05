const HID = require('node-hid');			//Imports library required for interfacing with ps3 controller

const device = new HID.HID(0x54c, 0x268);	//creates instance of the HID device with specified vendor and product ID's

device.inFunction = receiveData;		//Specifies the input function for our device as receiveData

device.read(device.inFunction.bind(device));		//Binds the input function to the device and calls read, enabling us to start reading in input

//The callback to be executed upon recieving data
function receiveData(err, data)
{
 // Handle any errors that occur because of the read() function
 if(err) console.log("Error received when receiving data”, err);
 // Handle the receipt of the data when it comes from the USB device
 console.log('Received data: ', data);
 // Call read() again to capture the next packet of data
 this.read(this.inFunction.bind(this));
}