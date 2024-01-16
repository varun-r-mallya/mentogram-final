import React, { useState } from 'react';
import axios from 'axios';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';

  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );


export default function CodeRunner_new(props){
  const [result, setResult] = useState('');
  const[language, setLanguage] = useState('Python');
  const[iNput, setINput] = useState('');

  const handleSubmit = async () => {
 
    let data = ({
        "code": props.value,
        "language": language,
        "input": iNput
    });
    let config = {
        method: 'post',
        url: 'https://codex7.p.rapidapi.com/',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Host': 'codex7.p.rapidapi.com',
            'X-RapidAPI-Key': 'fcc2d6c6b3msh404adbe533c36f5p148528jsn4a93557ee62f'
        },
        data: data
    };
    axios(config)
        .then((response) => {
            setResult(response.data.output);
        }).catch((error) => {
            console.log(error);
        });
  };

  function handleDropDown(event){
    setLanguage(event.target.value);
  }

  return (
    <div>
      <Button onClick={handleSubmit}>Run</Button>
      <select value={language} onChange={handleDropDown}>
        <option value="c">
            C
        </option>
        <option value="cpp">
          C++
        </option>
        <option value="py">
            Python
        </option>
        <option value="java">
          Java
        </option>
      </select>
      <br />
      <div style={{display: 'flex', flexDirection: 'row' }}>
      <h3>Input</h3>
      <Textarea value={iNput} onChange={(e) => setINput(e.target.value)} style={{margin: '10px'}}/>
      <h3>Output</h3>
      <Textarea readOnly value={result} style={{margin: '10px'}}/>
      </div>
    </div>
  );
};

