import React, { useState } from 'react';
import axios from 'axios';

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
      <button onClick={handleSubmit}>Run</button>
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
      <h3>Input</h3>
      <textarea value={iNput} onChange={(e) => setINput(e.target.value)} />
      <h3>Output</h3>
      <textarea readOnly value={result} />
    </div>
  );
};

