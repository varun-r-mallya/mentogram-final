import React from "react";
import { useState, useEffect, useRef } from 'react';

export default function Body(props) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleIncomingMessage = (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  useEffect(() => {
    props.socket.on("roomMessage", handleIncomingMessage);
    return () => {
      props.socket.off("roomMessage", handleIncomingMessage);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <div className="message_div">
      <ul className="messages_list">
        {messages.map((message, index) => (
          <li key={index}>
            <span style={{ color: "red" }}>{message.username}:</span> {message.message}
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
}