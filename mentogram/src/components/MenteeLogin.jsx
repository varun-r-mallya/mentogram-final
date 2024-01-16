import { useState, useRef, useEffect} from 'react';
import '../App.css';
import {serverURL} from '../serverURL';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../protectedcomponents/tokenService';


//problems with accessCreds here

export default function MenteeLogin(props) {
    
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
          type: 'mentee',
        });
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`${serverURL}/menteelogin/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            console.log('Form data sent successfully!');
            response.json().then(data => {
              localStorage.setItem("accessCreds", data.accessCreds)
            });
            SetAuth(formData);

          } else {
            console.error('Failed to send form data');
            alert('Incorrect email or password');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error contacting server');
        }
      };

      function SetAuth(formData) {
        axios.post(`${serverURL}/auth/`, formData)
            .then(response => {
                const token = response.data.token;
                setToken(token);
                props.signin();
                navigate('/mentee');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error contacting server');
            });
    }
    
    
    return(
        <div>
        <h2>Mentee Login</h2>
        <form onSubmit={handleSubmit}>
      <label>
      <div style={{textAlign: 'left', fontSize: '18px', fontFamily: 'initial', fontWeight: 'bold'}}>
        Email:
      </div>
        <input type="email" name="email" className="input-field"  value={formData.email} onChange={handleInputChange}/>
      </label>
      <label>
      <div style={{textAlign: 'left', fontSize: '18px', fontFamily: 'initial', fontWeight: 'bold'}}>
        Password:
      </div>
        <input type="password" name="password" className="input-field" value={formData.password} onChange={handleInputChange} />
      </label>
      <br />
      <div className="submitalign">
      <input type="submit" value="Submit" className="submitbutton" />
      </div>
    </form>
    <br />
        </div>
    );
}