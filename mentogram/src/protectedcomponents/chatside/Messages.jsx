import socketIO from 'socket.io-client';
import Body from "./Body"
import Footer from "./Footer"
const socket = socketIO.connect('http://localhost:5001');
import React, { useState } from 'react';
import "./Message.css"
const userName = localStorage.getItem('userName');
import { useEffect } from 'react';

const Messages = (props) => {
  useEffect(() => {
    // Join a room
    socket.emit('joinRoom', props.room);

    // Leave a room
    // socket.emit('leaveRoom', 'roomName');

    // Listen for events in a room
    // socket.on('roomMessage', (data) => {
    //   // Handle the event data
    // });
    return () => {
      // Leave the room when the component unmounts
      // socket.emit('leaveRoom', 'roomName');
    };
  }, []);

  return (
    <div className='messages_total'>
      <Body socket={socket} room={props.room}/>
      <Footer socket={socket} room={props.room} userName = {userName} />
    </div>
  );
};

export default Messages;