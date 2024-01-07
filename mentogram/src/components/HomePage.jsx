import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DarkModeSwitch from './DarkModeSwitch.jsx';
import logoformentogram2 from '../assets/logoformentogram2.png';
import bgpic from '../assets/bgpic.jpg';

import { FaGithub } from 'react-icons/fa';

export default function HomePage(){
    const navigate = useNavigate();
    
    return(
        <div  style={{ backgroundImage: `url(${bgpic})`, height: "1070px" }}>
            <header><img src={logoformentogram2} alt="Mentogram Logo" className="logo" /></header>
            {/* <DarkModeSwitch /> */}
            <div className='maindivision2'>
                <button className="button-main" onClick={() => navigate('/login')}>Experience Seamless Mentorship</button>
                <a href="https://github.com/varun-r-mallya/mentogram-final" target="_blank" rel="noopener noreferrer">
                    <button className="github-button">
                        <FaGithub className="github-icon" />
                        Visit GitHub
                    </button>
                </a>
            </div>

            <footer>Made by Varun R Mallya, as the Winter Of Code project under SDSLabs-IITR</footer>
        </div>
    );
}
