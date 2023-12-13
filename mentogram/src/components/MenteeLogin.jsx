import { useState, useRef, useEffect} from 'react';
import '../App.css';
import {serverURL} from '../serverURL';

export default function MenteeLogin() {
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
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
          } else {
            console.error('Failed to send form data');
            alert('Incorrect email or password');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error contacting server');
        }
      };
    
    
    return(
        <div>
        <h2>Mentee Login</h2>
        <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" className="input-field"  value={formData.email} onChange={handleInputChange}/>
      </label>
      <label>
        Password:
        <input type="password" name="password" className="input-field" value={formData.password} onChange={handleInputChange} />
      </label>
      <div className="submitalign">
      <input type="submit" value="Submit" className="submitbutton" />
      </div>
    </form>
        </div>
    );
}