import FrontPage from './components/FrontPage';
import AuthChecker from './components/AuthChecker';
import HomePage from './components/HomePage';
import {useEffect, useState} from 'react'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
  AuthChecker(setIsAuthenticated);
  },[])
  return(
    <div>
     {isAuthenticated ? <HomePage /> : <FrontPage />}
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
