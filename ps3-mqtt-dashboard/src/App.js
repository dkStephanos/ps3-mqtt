import React, { useState, Fragment } from 'react';
import './App.css';
import PS3Controller from './PS3Controller.js';
import mqtt from "mqtt";

var options = {
    username: 'koiserve',
    password: 'Tarnoff',
};
var client  = mqtt.connect('ws://192.168.1.107:9001/', options);

client.on('connect', function () {
  client.subscribe('pub/data', function (err) {
    if (!err) {
      client.publish('pub/data', 'Connected to MQTT broker')
    }
  })
})


function App() {
  var note;
  client.on('message', function (topic, message) {
    note = message.toString();
    // Updates React state with message 
    setMesg(note);
    console.log(note); 
   });

  // Sets default React state 
  const [mesg, setMesg] = useState("Nothing heard");

  return (
    <div className="App">
      <header className="App-header">
        <h1>PS3 Controller via MQTT</h1>
        <PS3Controller directionFlags={mesg.includes(':') ? mesg.split(':')[0] : '00000000'} namedFlags={mesg.includes(':') ? mesg.split(':')[1] : '00000000'} />
        <p>The message is: {mesg}</p
>      </header>
    </div>
  );
}

export default App;