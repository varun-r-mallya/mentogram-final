import {serverURL} from '../../serverURL.jsx';
import {getToken} from '../tokenService';

export default function Save(value, title){
    const accessCreds = localStorage.getItem('accessCreds');
    const token = getToken();
    const body = {
        accessCreds,
        title,
        value
    }
    console.log(body);
    fetch(`${serverURL}/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "token": token,
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}