import React, { useState, Fragment } from 'react';
import './App.css';

import mqtt from "mqtt";

var options = {
    username: 'koiserve',
    password: 'Tarnoff',
};
var client  = mqtt.connect('ws://192.168.1.107:9001/', options);

client.on('connect', function () {
  client.subscribe('pub/data', function (err) {
    if (!err) {
      client.publish('pub/data', 'Hello mqtt')
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
  const [mesg, setMesg] = useState(<Fragment><em>nothing heard</em></Fragment>);

  return (
    <div className="App">
      <header className="App-header">
        <h1>A taste of MQTT in React</h1>
        <p>The message is: {mesg}</p>
      </header>
    </div>
  );
}

export default App;