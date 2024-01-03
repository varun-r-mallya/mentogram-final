//this function will render a list of mentees that the mentor has.
// The mentor can add mentees from here. The mentor can also delete mentees from here.
// This will have a form to add mentee email and a password will be generated and a share button can be used to share the 
// password with the mentee.

import React, { useState } from 'react';
import "../../App.css"
import { serverURL } from '../../serverURL';

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

    return (
        <div className="add-mentees">
            <h1 className="add-mentees__title">Add Mentees</h1>
            <form className="add-mentees__form" onSubmit={handleSubmit}>
                <label htmlFor="mentorEmail" className="add-mentees__label">Mentor Email:</label>
                <input
                    type="email"
                    id="mentorEmail"
                    className="add-mentees__input"
                    value={mentorEmail}
                    onChange={(e) => setMentorEmail(e.target.value)}
                />
                <br />
                <label htmlFor="mentorPassword" className="add-mentees__label">Mentor Password:</label>
                <input
                    type="password"
                    id="mentorPassword"
                    className="add-mentees__input"
                    value={mentorPassword}
                    onChange={(e) => setMentorPassword(e.target.value)}
                />
                <br />
                <label htmlFor="menteeEmail" className="add-mentees__label">Mentee Email:</label>
                <input
                    type="email"
                    id="menteeEmail"
                    className="add-mentees__input"
                    value={menteeEmail}
                    onChange={(e) => setMenteeEmail(e.target.value)}
                />
                <br />
                <button type="button" onClick={generatePassword} className="add-mentees__button">
                    Generate Password
                </button>
                <br />
                <label htmlFor="password" className="add-mentees__label">Password:</label>
                <b className="add-mentees__password">{password}</b>
                <br />
                <button type="submit" className="add-mentees__button">Add Mentee</button>
            </form>
            <p className="add-mentees__server-message">{serverMessage}</p>
        </div>
    );
}