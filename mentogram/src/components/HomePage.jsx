import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
export default function HomePage(){
    const navigate = useNavigate();
    
    return(
        <div>
            <h1>HomePage</h1>
            <Link to="/login">Login</Link>
        </div>
    );
}
