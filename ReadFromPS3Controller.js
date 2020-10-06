const HID = require('node-hid');		//Imports the library required to collect input from the usb device (ps3 controller)

const mqtt = require('mqtt');			//Imports the library required to connect/subscribe/publish to/from the MQTT broker server

//Log in information used to authenticate with the MQTT broker
const options = {
	username: 'koiserve',
	password: 'Tarnoff',
};

//Creates the client and connects it to the MQTT broker server with the log in info
const client = mqtt.connect('mqtt://192.168.1.107:1883', options);

//Creates the usb device object and connects it to the ps3 controller using the vendorId: 0x54c and productId: 0x268 of the ps3 controller
const device = new HID.HID(0x54c, 0x268);

//Specifies the callback to be used upon connection
//Here we first log a succesful connection, and then subscribe to the pub/data topic, logging the error if the subscribe fails
client.on('connect', function() {
	console.log('\nPi MQTT client connected to broker.\n');
	client.subscribe('pub/data', function(err) {
		if(err) throw "Error description:  " + err;
	});
});

//Here we specify the inFunction of our usb device as the recieveData function implemented below
//This allows us to perform a custom callback, and publish the results of the read
device.inFunction = receiveData;

//Next we initiate the device read, specifying the previously set callback function
device.read(device.inFunction.bind(device))

//Here we initialize variables to store the bitwise flags for the various inputs we are tracking
directionButtons = 0;
namedButtons = 0;

//This is the callback funtion to be run on a succesful read from our usb device
//It is responisble for logging the results of the read, publishing the data if neccessary, and triggering the next read
function receiveData(err, data) {
	if(err) console.log("Error received when receiving data", err);			//Log error with message if the read fails
	
	console.log('Recieved data: ', data);			//If the read is succesful, log the recieved data to the console

	//Here, we want to avoid flooding the topic with uneccesarry messages, as the ps3 reads occur very quickly
	//We achieve this by checking if the newly read data differs from our last read, and only publish if we have new data
	if(directionButtons !== data[2] || namedButtons !== data[3]) {
		//Since we care about the various bitwise flags being set, we need to first convert the data to a binary string, adding padding if necessary to ensure we always have 8 bits
		client.publish('pub/data', data[2].toString(2).padStart(8, '0') + ':' + data[3].toString(2).padStart(8, '0'), function(err) {
			if(err) throw "Error description:  " + err;
		});
	}

	//Set our data variables to the last read data, so we can diff check on the next pass
	directionButtons = data[2];
	namedButtons = data[3];

	//Trigger the next read
	this.read(this.inFunction.bind(this));
}
