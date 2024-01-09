import React from 'react'
import { Navigate } from 'react-router-dom'
import { getToken, isLoggedIn } from '../protectedcomponents/tokenService'
import {jwtDecode} from 'jwt-decode'


function AuthChecker({ isSignedIn, type, children }) {
  const token = getToken();

  const checkTokenType = () => {
    function getTypeFromJWT(){
      if (token) {
          const decodedToken = jwtDecode(token);
          return decodedToken;
      }
      return null;
  };    

  if(getTypeFromJWT() === null){
    return null;
  }
  return getTypeFromJWT().type;
  }



  if(isLoggedIn() && type === checkTokenType()){
    isSignedIn = true;
  }
  if (!isSignedIn || type !== checkTokenType()) {
    return <Navigate to="/" replace />
  }
  return children
}
export default AuthChecker