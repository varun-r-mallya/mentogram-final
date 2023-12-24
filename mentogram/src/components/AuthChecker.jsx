import React from 'react'
import { Navigate } from 'react-router-dom'
import { getToken, isLoggedIn } from '../protectedcomponents/tokenService'

function AuthChecker({ isSignedIn, children }) {
  const token = getToken();

  if(isLoggedIn()){
    isSignedIn = true;
  }
  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }
  return children
}
export default AuthChecker