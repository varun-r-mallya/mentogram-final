import React from "react";
import DarkModeSwitch from '../../components/DarkModeSwitch.jsx';
import logoformentogram2 from '../../assets/logoformentogram2.png';
import CollaborativeEditor from "../collaborativeeditor/CollaborativeEditor.jsx";
import Messages from "../chatside/Messages.jsx";
import FileManager from "../fileaccess/FileManager.jsx";
import Button from '@mui/material/Button';


const room = "roomName"

export default function MentorFrontPage(props) {
    const [title, setTitle] = React.useState('');
    const [value, setValue] = React.useState("");
    // usernameSet();
    return (
        <div style={{ backgroundImage: `url(https://cdn.svgator.com/images/2022/06/background-svg-image-pattern.svg)` }}>
            <header><img src={logoformentogram2} alt="Mentogram Logo" className="logo" /></header>
            <h1 style={{color: 'Highlight', textAlign: "center"}}>Mentor</h1>
            <Button variant= 'contained' style={{ backgroundColor: 'purple'}} onClick={() => {window.location.href = "/mentor";}} className="backbutton6">Back</Button>
            <div><Messages room={room}/></div>
            <div className="maindivision">
            <FileManager setTitle={setTitle} title={title} setContent={setValue} value={value} />
            <div className="editor"><CollaborativeEditor setTitle={setTitle} title={title} setValue={setValue} value={value}/></div>
            </div>
            <button className="mentorpagebutton" onClick={props.signout}>Sign Out</button>
        </div>
    );
}

