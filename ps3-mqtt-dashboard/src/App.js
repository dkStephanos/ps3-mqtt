import React, { useState, Fragment } from 'react';
import './App.css';
import PS3Controller from './PS3Controller.js';
import mqtt from "mqtt";

//This object contains the log in info for the mqtt broker -- update to your own settings
var options = {
    username: 'koiserve',
    password: 'Tarnoff',
};

//Here, we declare the mqtt client, connecting with the options declared above using a websocket so we can connect via the browser
var client  = mqtt.connect('ws://192.168.1.107:9001/', options);

//Here, we delcare the callback function for the connect. In this case, we want to go ahead and subscribe to the pub/data topic so we can recieve data from the raspberry pi
//We also publish a success message that we can see in the browser to confirm a succesful connection
client.on('connect', function () {
  client.subscribe('pub/data', function (err) {
    if (!err) {
      client.publish('pub/data', 'Connected to MQTT broker')
    }
  })
})

//This function returns the App component, which serves as a the interface for the mqtt client and the wrapper for the PS3Controller compnent
function App() {
  //Here, we delcare a variable to hold the message incoming from the mqtt broker and a callback to be performed upon receiving a message
  //We log the message to the browser console, and set the message to the internal state of App, triggering a re-render so the new data can be injected into the PS3Controller via is properties
  var note;
  client.on('message', function (topic, message) {
    note = message.toString();
    // Updates React state with message 
    setMesg(note);
    console.log(note); 
   });

  //Here we use a hook to declare the mesg variable and a setter, using Nothing heard as our default message that will appear in the browser until the mqtt connection is made 
  const [mesg, setMesg] = useState("Nothing heard");

  //This return statement gives us the actual App component rendered in the browser. It contains some display information similar to HTML, and the PS3Controller component
  //The PS3Controller component takes various properties (directionFlags, namedFlags and analog stick values --- explained further in the PS3Controller component file)
  //We use turnary operators to to detect the colon deliminator in the passed message and pass in either the values sent from the raspberry pi, or the default states
  return (
    <div className="App">
      <header className="App-header">
        <h1>PS3 Controller via MQTT</h1>
        <PS3Controller
          directionFlags={mesg.includes(':') ? mesg.split(':')[0] : '00000000'}
          namedFlags={mesg.includes(':') ? mesg.split(':')[1] : '00000000'}
          leftAnalogHoriz={mesg.includes(':') ? parseInt(mesg.split(':')[2]) : 135}
          leftAnalogVert={mesg.includes(':') ? parseInt(mesg.split(':')[3]) : 125}
          rightAnalogHoriz={mesg.includes(':') ? parseInt(mesg.split(':')[4]) : 135}
          rightAnalogVert={mesg.includes(':') ? parseInt(mesg.split(':')[5]) : 125}
        />
        <p>The message is: {mesg}</p
>      </header>
    </div>
  );
}

export default App;