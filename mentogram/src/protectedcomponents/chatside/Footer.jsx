import React, { useState } from 'react';
export default function Footer(props) {
    const [inputValue, setInputValue] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const sendingMessage = {room: props.room, username: props.userName, message: inputValue};
        if (inputValue.trim() !== '') {
            props.socket.emit('roomMessage', sendingMessage);
            setInputValue('');
        }
    };
    return(
        <form onSubmit={handleSubmit} className="messages_form">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
          width="500px"
        />
        <button type="submit">Send</button>
       </form>
    )
}