import React from "react";
import DarkModeSwitch from '../../components/DarkModeSwitch.jsx';
import logoformentogram2 from '../../assets/logoformentogram2.png';
import ChangePassword from './ChangePassword.jsx';
import CollaborativeEditor from "../collaborativeeditor/CollaborativeEditor.jsx";
import Messages from "../chatside/Messages.jsx";

localStorage.setItem('userName', 'vroon');
const room = "roomName"

export default function MenteeFrontPage(props) {
    return (
        <div>
        <header><img src={logoformentogram2} alt="Mentogram Logo" className="logo" /></header>
        <DarkModeSwitch />
        <h1>Mentee Front Page</h1>
        <div><Messages room={room}/></div>
        <div>
        <CollaborativeEditor />
        </div>
        <button className="mentorpagebutton" onClick={props.signout}>Sign Out</button>
        </div>
    );
}