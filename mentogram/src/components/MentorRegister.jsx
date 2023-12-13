import '../App.css';
import {serverURL} from '../serverURL';
import { useState } from 'react';

export default function MentorRegister(){
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmpassword: '',
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
        const response = await fetch(`${serverURL}/mentorregister/`, {                // https://wbhr9zdg-1234.inc1.devtunnels.ms/mentorlogin/ , http://192.168.29.29:1234/mentorlogin/
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
                <div>
                <h2>Mentor Registration</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input type="email" name="email" className="input-field" value={formData.email} onChange={handleInputChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" className="input-field" value={formData.password} onChange={handleInputChange} />
                    </label>
                    <label>
                        Confirm Password:
                        <input type="password" name="confirmpassword" className="input-field" value={formData.confirmpassword} onChange={handleInputChange} />
                    </label>
                    <div className="submitalign">
                        <input type="submit" value="Submit" className="submitbutton" />
                    </div>
                </form>
                </div>
            </div>
                )
}