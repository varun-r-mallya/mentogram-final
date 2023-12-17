import React from "react";
import DarkModeSwitch from '../../components/DarkModeSwitch.jsx';
import logoformentogram2 from '../../assets/logoformentogram2.png';
import ChangePassword from './ChangePassword.jsx';


export default function MenteeFrontPage(props) {
    return (
        <div>
        <header><img src={logoformentogram2} alt="Mentogram Logo" className="logo" /></header>
        <DarkModeSwitch />
        <h1>Mentee Front Page</h1>
        <button className="mentorpagebutton" onClick={props.signout}>Sign Out</button>
        <footer>Made by Varun R Mallya, as the Winter Of Code project under SDSLabs-IITR</footer>
        </div>
    );
}