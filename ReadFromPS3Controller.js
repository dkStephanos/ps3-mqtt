const HID = require('node-hid');			

const device = new HID.HID(0x54c, 0x268);

device.inFunction = receiveData;

device.read(device.inFunction.bind(device));

function receiveData(err, data)
{
 // Handle any errors that occur because of the read() function
 if(err) console.log("Error received when receiving data”, err);
 // Handle the receipt of the data when it comes from the USB device
 console.log('Received data: ', data);
 // Call read() again to capture the next packet of data
 this.read(this.inFunction.bind(this));
}