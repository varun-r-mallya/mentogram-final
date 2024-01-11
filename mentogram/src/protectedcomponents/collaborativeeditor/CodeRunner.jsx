import React, { useState } from 'react';
import axios from 'axios';

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
      <button onClick={handleSubmit}>Run</button>
      <select value={language} onChange={handleDropDown}>
        <option value="Python">
            Python
        </option>
        <option value="JavaScript">
          JavaScript
        </option>
      </select>
      <br />
      <h3>Output</h3>
      <textarea readOnly value={result.Output} />
      <h3>Error</h3>
      <textarea readOnly value={result.Error} />
    </div>
  );
};

export default CodeRunner;
