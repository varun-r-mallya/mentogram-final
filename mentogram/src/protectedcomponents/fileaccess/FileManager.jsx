import React, { useState, useEffect } from 'react';
import { serverURL } from '../../serverURL';
import './Fileman.css';
import { getToken } from '../tokenService';

const firstRequest = async (user) => {
    const token = getToken();
    return fetch(`${serverURL}/load`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        },
        body: JSON.stringify({user}),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Server response:', data);
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

export default function MyFileBrowser(props) {
    const [files, setFiles] = useState([{ id: 1, name: 'test' }]);
    const user = localStorage.getItem('accessCreds');

    useEffect(() => {
        const fetchData = async () => {
            setFiles(await firstRequest(user));
        };
        fetchData();
    }, []);

    const handleFileClick = async (file) => {
        console.log('File clicked:', file);
        const token = getToken();
        const response = await fetch(`${serverURL}/load/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token,

            },
            body: JSON.stringify({user, file}),
        });
        const data = await response.json();
        console.log('Server response:', data);
        props.setContent(data.fileContent)
        props.setTitle(data.fileName)
    };

    const handleDelete = async (file) => {
        console.log('File deleted:', file);
        const token = getToken();
        const response = await fetch(`${serverURL}/load/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify({user, file}),
        });
        const data = await response.json();
        console.log('Server response:', data);
    }

    return (
        <div className='filelist'>
            <h4>Files</h4>
            <ol className='file-list'>
                {files.map((file) => {
                    
                        return (
                            <li key={file.id} value={file.name} className='list-item-fileman'>
                                <button className='option-folder-select' onClick={() => handleFileClick(file)}>
                                    {file.name}
                                </button>
                                <button className='option-folder-delete' onClick={() => {handleDelete(file); window.location.reload();}}>
                                    Delete
                                </button>
                            </li>
                        );
                    })}
            </ol>
        </div>
    );
}

