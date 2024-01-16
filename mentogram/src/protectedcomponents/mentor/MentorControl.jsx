import React from "react";
import DarkModeSwitch from '../../components/DarkModeSwitch.jsx';
import logoformentogram2 from '../../assets/logoformentogram2.png';
import ListOfMentees from './ListOfMentees.jsx';
import { useState } from "react";
import AddMentees from "./AddMentees.jsx";
import bg2pic from '../../assets/SVG-background-animation.gif';
import Button from '@mui/material/Button';

export default function MentorControl(props){
    
    const [showAddMentees, setShowAddMentees] = useState(false);
    const [showListOfMentees, setShowListOfMentees] = useState(false);

    const handleAddMenteesClick = () => {
        setShowAddMentees(true);
        setShowListOfMentees(false);
    };

    const handleListOfMenteesClick = () => {
        setShowAddMentees(false);
        setShowListOfMentees(true);
    };

    return(
        <div style={{ backgroundImage: `url(${bg2pic})`, height: "1070px" }} onLoad={handleListOfMenteesClick}>
        <header><img src={logoformentogram2} alt="Mentogram Logo" className="logo" /></header>
        <h1 className="mentorcontrolpanelhead">Mentor Control Panel</h1>
        <div className="mentorcontrolpanel">
        <Button variant='outlined' style={{fontWeight: '3000'}} className="pagebutton" onClick={handleAddMenteesClick}>Add Mentees</Button>
        <Button variant='outlined' style={{fontWeight: '3000'}} className="pagebutton" onClick={handleListOfMenteesClick}>List Of Mentees</Button>
        </div>    

        
        {showAddMentees && <AddMentees />}
        {showListOfMentees && <ListOfMentees />}
        <button className="mentorpagebutton" onClick={props.signout}>Sign Out</button>
        <footer>Made by Varun R Mallya, as the Winter Of Code project under SDSLabs-IITR</footer>
        </div>
    );
}