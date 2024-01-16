import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

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

const CodeRunner = (props) => {
  const [result, setResult] = useState('');
  const[language, setLanguage] = useState('Python');

  const handleSubmit = async () => {
    const body = {
      language: language,
      code: props.value,
    }
    console.log(body);
    try {
      const response = await axios.post('http://127.0.0.1:3000/log', body);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function handleDropDown(event){
    setLanguage(event.target.value);
  }

  return (
    <div>
      <Button variant='outline' onClick={handleSubmit}>Run</Button>
      <select value={language} onChange={handleDropDown}>
        <option value="Python">
            Python
        </option>
        <option value="JavaScript">
          JavaScript
        </option>
      </select>
      <br />
      <div style={{display: 'flex', flexDirection: 'row' }}>
      <h3>Output</h3>
      <Textarea readOnly value={result.Output} style={{margin: '10px'}}/>
      <h3>Error</h3>
      <Textarea readOnly value={result.Error} style={{margin: '10px'}}/>
      </div>
    </div>
  );
};

export default CodeRunner;
