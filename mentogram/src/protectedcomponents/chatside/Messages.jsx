import socketIO from 'socket.io-client';
import Body from "./Body"
import Footer from "./Footer"
import VideoCall from "./videocall/VideoCall"
const socket = socketIO.connect('http://localhost:5001');
import React, { useState } from 'react';
import "./Message.css"
import { jwtDecode } from 'jwt-decode'


function usernameSet(){

  function getEmailFromJWT(){
      const token = localStorage.getItem('token');
      if (token) {
          const decodedToken = jwtDecode(token);
          return decodedToken;
      }
      return null;
  };    
  
  if(getEmailFromJWT() === null){
    return null;
  }
  return getEmailFromJWT().email.substring(0, getEmailFromJWT().email.indexOf('@'));
  
  }
  
const userName = usernameSet();
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
      <VideoCall socket={socket} room={props.room} userName = {userName} />
    </div>
  );
};

export default Messages;