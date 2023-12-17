import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DarkModeSwitch from './DarkModeSwitch.jsx';
import logoformentogram2 from '../assets/logoformentogram2.png';

export default function HomePage(){
    const navigate = useNavigate();
    
    return(
        <div>
            <header onClick={() => setChoice("null")}><img src={logoformentogram2} alt="Mentogram Logo" className="logo" /></header>
            <DarkModeSwitch />
            <h1>HomePage</h1>
            <Link to="/login">Login</Link>
            <footer>Made by Varun R Mallya, as the Winter Of Code project under SDSLabs-IITR</footer>
        </div>
    );
}
