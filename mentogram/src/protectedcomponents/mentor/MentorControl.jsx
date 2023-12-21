import React from "react";
import DarkModeSwitch from '../../components/DarkModeSwitch.jsx';
import logoformentogram2 from '../../assets/logoformentogram2.png';
import ListOfMentees from './ListOfMentees.jsx';
import { useState } from "react";
import AddMentees from "./AddMentees.jsx";

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
        <div>
        <header><img src={logoformentogram2} alt="Mentogram Logo" className="logo" /></header>
        <DarkModeSwitch />
        <h1 className="mentorcontrolpanelhead">Mentor Control Panel</h1>
        <div className="mentorcontrolpanel">
        <button className="pagebutton" onClick={handleAddMenteesClick}>Add Mentees</button>
        <button className="pagebutton" onClick={handleListOfMenteesClick}>List Of Mentees</button>
        </div>    

        
        {showAddMentees && <AddMentees />}
        {showListOfMentees && <ListOfMentees />}
        <button className="mentorpagebutton" onClick={props.signout}>Sign Out</button>
        <footer>Made by Varun R Mallya, as the Winter Of Code project under SDSLabs-IITR</footer>
        </div>
    );
}