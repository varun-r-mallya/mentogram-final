import FrontPage from './components/FrontPage';
import HomePage from './components/HomePage';
import {useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthChecker from './components/AuthChecker';
import MentorControl from './protectedcomponents/mentor/MentorControl';
import MenteeFrontPage from './protectedcomponents/mentee/MenteeFrontPage';
import { removeToken, getToken } from './protectedcomponents/tokenService';
import MentorFrontPage from './protectedcomponents/mentor/MentorFrontPage';


export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(null)
  const signin = () => {
    setIsSignedIn(true)
  }
  const signout = () => {
    removeToken();
    setIsSignedIn(false)
  }

  return(
    <div>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<FrontPage signin={signin} signout={signout} />} />
        <Route path="/mentee" element={<AuthChecker isSignedIn={isSignedIn} type="mentee" ><MenteeFrontPage signout={signout} /></AuthChecker>} />
        <Route path="/mentor" element={<AuthChecker isSignedIn={isSignedIn} type="mentor" ><MentorControl signout={signout} /></AuthChecker>} />
        <Route path="/mentor/access" element={<AuthChecker isSignedIn={isSignedIn} type="mentor" ><MentorFrontPage signout={signout} /></AuthChecker>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}


// check for cookies here
// if cookies exist, render the main page
// check if valid cookies exist. If not, render the login page
// if cookies do not exist, render the login page
// keyword: Conditional routing
// check for cookies on frontend 
// create function to check for cookies on every render of page and redirect to login page if cookies do not exist
// useEffect for single render per redirect. 
