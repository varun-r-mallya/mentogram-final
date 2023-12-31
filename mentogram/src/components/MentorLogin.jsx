import { useState, useRef, useEffect} from 'react';
import '../App.css';
import MentorRegister from './MentorRegister';
import {serverURL} from '../serverURL';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../protectedcomponents/tokenService';

export default function MentorLogin(props) {
    
    
    const [mentorPage, setMentorPage] = useState(null);
    const navigate = useNavigate();
    const[registerlogin, setRegisterLogin] = useState(false);

    const handleRegisterChange = () => {
        setRegisterLogin((prevState) => (!prevState));
    }

    function Login(){
        
        const [formData, setFormData] = useState({
            email: '',
            password: '',
            type: 'mentor',
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
            const response = await fetch(`${serverURL}/mentorlogin/`, {                // https://wbhr9zdg-1234.inc1.devtunnels.ms/mentorlogin/ , http://192.168.29.29:1234/mentorlogin/
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setMentorPage(data.message);
        
            if (response.ok) {
                console.log('Login data sent successfully!');
                SetAuth(formData);
            } else {
                console.error('Failed to send login data');
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
                    navigate('/mentor');
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error contacting server');
                });
        }
        
    return(
    <div>
        <div>
        <h2>Mentor Login</h2>
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
        <h5 className="registerprompt">First time?<button onClick={handleRegisterChange} className="registerlink"> Register here</button></h5>
        </div>
    </div>
        )
    }

    
    function display(){
        if(registerlogin){
            return (
            <div>
            <MentorRegister />
            <div className='registerprompt'><button onClick={handleRegisterChange} className="registerlink">Already registered? Login here</button></div>
            </div>
            )
        }
        else{
            return <Login />
        }
    }
    
    return(
        <div>
        {display()}
        {mentorPage}
        </div>
    );
}

