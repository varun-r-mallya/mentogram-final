import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import {Input} from '@mui/material';
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
        <form onSubmit={handleSubmit} className="messages_form" style={{display: 'flex', flexDirection: 'row'}}>
            <Input
                placeholder="Type a message"  
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoComplete="off"
                width="500px"
            />
            <Button type="submit">Send</Button>
        </form>
    )
}