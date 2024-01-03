import React from "react";
import DarkModeSwitch from '../../components/DarkModeSwitch.jsx';
import logoformentogram2 from '../../assets/logoformentogram2.png';
import CollaborativeEditor from "../collaborativeeditor/CollaborativeEditor.jsx";
import Messages from "../chatside/Messages.jsx";
import { jwtDecode } from 'jwt-decode'

const room = "roomName"

function usernameSet(){

function getEmailFromJWT(){
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken;
    }
    return null;
};    

const userName = getEmailFromJWT().email.substring(0, getEmailFromJWT().email.indexOf('@'));
localStorage.setItem('userName', userName);

}

export default function MentorFrontPage(props) {
    usernameSet();
    return (
        <div>
            <header><img src={logoformentogram2} alt="Mentogram Logo" className="logo" /></header>
            <DarkModeSwitch />
            <h1>Mentor Front Page</h1>
            <button onClick={() => {window.location.href = "/mentor";}}>Back</button>
            <div><Messages room={room}/></div>
            <div>
                <CollaborativeEditor />
            </div>
            <button className="mentorpagebutton" onClick={props.signout}>Sign Out</button>
        </div>
    );
}

