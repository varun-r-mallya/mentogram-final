import React from "react";
import DarkModeSwitch from '../../components/DarkModeSwitch.jsx';
import logoformentogram2 from '../../assets/logoformentogram2.png';
import ChangePassword from './ChangePassword.jsx';
import CollaborativeEditor from "../collaborativeeditor/CollaborativeEditor.jsx";
import Messages from "../chatside/Messages.jsx";
import { jwtDecode } from 'jwt-decode'
import FileManager from "../fileaccess/FileManager.jsx";
import bg2pic from '../../assets/bg2pic.jpg';

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

export default function MenteeFrontPage(props) {
    const [title, setTitle] = React.useState('');
    const [value, setValue] = React.useState("");
    usernameSet();
    return (
        <div style={{ backgroundImage: `url(${bg2pic})` }}>
            <header><img src={logoformentogram2} alt="Mentogram Logo" className="logo" /></header>
            <DarkModeSwitch />
            <h1 style={{textAlign: "center"}}>Mentee</h1>
            <div><Messages room={room}/></div>
            <div className="maindivision">
            <FileManager setTitle={setTitle} title={title} setContent={setValue} value={value} />
            <div className="editor"><CollaborativeEditor setTitle={setTitle} title={title} setValue={setValue} value={value}/></div>
            </div>
            <button className="mentorpagebutton" onClick={props.signout}>Sign Out</button>
        </div>
    );
}

