import DarkModeSwitch from './DarkModeSwitch.jsx';
import '../App.css'
import logoformentogram2 from '../assets/logoformentogram2.png';
import { useState, useEffect, useRef } from 'react';
import MentorLogin from './MentorLogin.jsx';
import MenteeLogin from './MenteeLogin.jsx';
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import AuthChecker from './AuthChecker';
// import HomePage from './HomePage';
// import MentorControl from '../protectedcomponents/mentor/MentorControl';
// import MenteeFrontPage from '../protectedcomponents/mentee/MenteeFrontPage';

export default function FrontPage(props) {
  const [ choice, setChoice ] = useState('null');
  // const [isSignedIn, setIsSignedIn] = useState(null)
  // const signin = () => {
  //   setIsSignedIn(true)
  // }
  // const signout = () => {
  //   setIsSignedIn(false)
  // }

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
    <div>
      <header onClick={() => setChoice("null")}><img src={logoformentogram2} alt="Mentogram Logo" className="logo" /></header>
      <DarkModeSwitch />
      {display()}
      <footer>Made by Varun R Mallya, as the Winter Of Code project under SDSLabs-IITR</footer>
    </div>
  );
}