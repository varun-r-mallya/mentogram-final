//this function will render a list of mentees that the mentor has.
// The mentor can add mentees from here. The mentor can also delete mentees from here.
// This will have a form to add mentee email and a password will be generated and a share button can be used to share the 
// password with the mentee.

import React, { useEffect, useState } from 'react';
import "../../App.css"
import { serverURL } from '../../serverURL';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


export default function AddMentees() {
    const [mentorEmail, setMentorEmail] = useState('');
    const [mentorPassword, setMentorPassword] = useState('');
    const [menteeEmail, setMenteeEmail] = useState('');
    const [password, setPassword] = useState('');
    const[serverMessage, setServerMessage] = useState('');

    const generatePassword = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setPassword(result);
    };

    useEffect(() => {
        generatePassword();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send mentorEmail, mentorPassword, menteeEmail, and password to the server
        fetch(`${serverURL}/creatementee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mentorEmail,
                mentorPassword,
                menteeEmail,
                password
            })
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            console.log(data);
            setServerMessage(data.message);
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
    };

    const copyToClipboard = async () => {
        try {
          await navigator.clipboard.writeText("To the mentee:" + "\n\n" + "Email: " + menteeEmail + "\n" + "Password: " + password);
        } catch (error) {
          alert('Error copying to clipboard:', error);
        }
      };

    return (
        <div className="add-mentees">
            <h1 className="add-mentees__title">Add Mentees</h1>
            {/* <form className="add-mentees__form" onSubmit={handleSubmit}> */}
                <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                >
                <TextField
                    label="Mentor Email" variant="outlined"
                    type="email"
                    
                    
                    value={mentorEmail}
                    onChange={(e) => setMentorEmail(e.target.value)}
                    style={{marginBottom: '10px'}}
                />
                <br></br>
                <TextField
                    label="Mentor Password" variant="outlined"
                    type="password"
                   
                    value={mentorPassword}
                    onChange={(e) => setMentorPassword(e.target.value)}
                    style={{marginBottom: '10px'}}
                />
                <br />
                <TextField
                    label="Mentee Email" variant="outlined"
                    type="email"
                   
                    value={menteeEmail}
                    onChange={(e) => setMenteeEmail(e.target.value)}
                    style={{marginBottom: '10px'}}
                />
                <br />
                <Button variant='outlined' type="button" onClick={generatePassword} className="add-mentees__button">
                    Generate New Password
                </Button>
                <br />
                <label htmlFor="password" className="add-mentees__label">Password:</label>
                <b className="add-mentees__password">{password}</b>
                <Button variant='outlined' className="copybutton" onClick={copyToClipboard}>Copy Login Info</Button>
                <br />
                <button type="submit" className="add-mentees__button">Add Mentee</button>
                </Box>
            {/* </form> */}
            <p className="add-mentees__server-message">{serverMessage}</p>
        </div>
    );
}