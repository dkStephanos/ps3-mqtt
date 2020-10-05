const HID = require('node-hid');

const mqtt = require('mqtt');

const options = {
	username: 'koiserve',
	password: 'Tarnoff',
};

const client = mqtt.connect('mqtt://192.168.1.107:1883', options);

const device = new HID.HID(0x54c, 0x268);

client.on('connect', function() {
	console.log('\nPi MQTT client connected to broker.\n');
	client.subscribe('pub/data', function(err) {
		if(err) throw "Error description:  " + err;
	});
});


device.inFunction = receiveData;

device.read(device.inFunction.bind(device))

directionButtons = 0;
namedButtons = 0;

function receiveData(err, data) {
	if(err) console.log("Error received when receiving data", err);
	
	console.log('Recieved data: ', data);
	if(directionButtons !== data[2] || namedButtons !== data[3]) {
		client.publish('pub/data', data[2].toString(2).padStart(8, '0') + ':' + data[3].toString(2).padStart(8, '0'), function(err) {
			if(err) throw "Error description:  " + err;
		});
	}

	directionButtons = data[2];
	namedButtons = data[3];

	this.read(this.inFunction.bind(this));
}
