import DarkModeSwitch from './DarkModeSwitch.jsx';
import '../App.css'
import logoformentogram2 from '../assets/logoformentogram2.png';
import { useState, useEffect, useRef } from 'react';
import MentorLogin from './MentorLogin.jsx';
import MenteeLogin from './MenteeLogin.jsx';
import bg2pic from '../assets/bg2pic.jpg';

export default function FrontPage(props) {
  const [ choice, setChoice ] = useState('null');

  const display = () => {
    if (choice === 'null') {
      return (
      <div className = "choicepage">
      <h1>Are You a Mentor or a Mentee ?</h1>
      <br></br>
      <button  onClick = {() => setChoice("Mentor")}>Mentor</button>
      <button  onClick = {() => setChoice("Mentee")}>Mentee</button>  
      </div>);
    }
    else if(choice === "Mentor") {
      return (
      <div className = "choicepage">
      <MentorLogin signin={props.signin} />
      <button  onClick = {() => setChoice("null")}>Back</button>
      </div>);
    }
    else if(choice === "Mentee") {
      return (
      <div className = "choicepage">
      <MenteeLogin signin = {props.signin}/>
      <button variant='outline' onClick = {() => setChoice("null")}>Back</button>
      </div>);
    }
  }
  
  return(
    <div style={{ backgroundImage: `url(${bg2pic})`, height: "1070px" }}>
      <header onClick={() => setChoice("null")}><img src={logoformentogram2} alt="Mentogram Logo" className="logo" /></header>
      <DarkModeSwitch />
      {display()}
      <footer>Made by Varun R Mallya, as the Winter Of Code project under SDSLabs-IITR</footer>
    </div>
  );
} 