//this page has the code for reading data sent by server in it's message. Copy it from here.

import '../App.css';
import {serverURL} from '../serverURL';
import { useState } from 'react';

export default function MentorRegister(){
    
    const [mentorPage, setMentorPage] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
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

        // if (formData.password === formData.confirmpassword) {

            try {
                const response = await fetch(`${serverURL}/mentorregister/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                setMentorPage(data.message);

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
        // } 
        // else {
        //     alert('Passwords do not match');
        // }
    };
    
    
    return(
            <div>
                <div>
                <h2>Mentor Registration</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" className="input-field" value={formData.username} onChange={handleInputChange} />
                    </label>
                    
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
                 <div>
                    {mentorPage}
                </div>
            </div>
                )
}