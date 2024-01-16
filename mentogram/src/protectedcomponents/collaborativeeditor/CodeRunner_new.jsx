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
        "input": iNput,
        "version": 'latest',
    });
    let config = {
        method: 'post',
        url: 'https://online-code-compiler.p.rapidapi.com/v1/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '709e1782d7mshbeaee63ccac5ad1p1666aajsna962815b2571',
          'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
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
        <option value="ada">
            Ada
        </option>
        <option value="algol">
          Algol 68
        </option>
        <option value="awk">
            AWK
        </option>
        <option value="bash">
          Bash Shell
        </option>
        <option value="bc">
            BC
        </option>
        <option value="befunge">
          Befunge
        </option>
        <option value="blockly">
            Blockly
        </option>
        <option value='brainfuck'>
          Brainf**k
        </option>
        <option value='c'>
          C
        </option>
        <option value='c99'>
          C-99
        </option>
        <option value='clisp'>
          Clisp
        </option>
        <option value='clojure'>
          Clojure
        </option>
        Copy code
        <option value='cobol'>
          COBOL
        </option>
        <option value='coffeescript'>
          CoffeeScript
        </option>
        <option value='cpp'>
          C++
        </option>
        <option value='cpp14'>
          C++ 14
        </option>
        <option value='cpp17'>
          C++ 17
        </option>
        <option value='csharp'>
          C#
        </option>
        <option value='d'>
          D
        </option>
        <option value='dart'>
          Dart
        </option>
        <option value='elixir'>
          Elixir
        </option>
        <option value='erlang'>
          Erlang
        </option>
        <option value='factor'>
          Factor
        </option>
        <option value='falcon'>
          Falcon
        </option>
        <option value='fantom'>
          Fantom
        </option>
        <option value='fasm'>
          FASM
        </option>
        <option value='forth'>
          Forth
        </option>
        <option value='fortran'>
          Fortran
        </option>
        <option value='freebasic'>
          FREE BASIC
        </option>
        <option value='fsharp'>
          F#
        </option>
        <option value='gccasm'>
          Assembler - GCC
        </option>
        <option value='go'>
          GO Lang
        </option>
        <option value='groovy'>
          Groovy
        </option>
        <option value='hack'>
          Hack
        </option>
        <option value='haskell'>
          Haskell
        </option>
        <option value='haxe'>
          Haxe
        </option>
        <option value='icon'>
          Icon
        </option>
        <option value='intercal'>
          Intercal
        </option>
        <option value='java'>
          Java
        </option>
        <option value='jbang'>
          JBang
        </option>
        <option value='jlang'>
          J Language
        </option>
        <option value='kotlin'>
          Kotlin
        </option>
        <option value='lolcode'>
          LOLCODE
        </option>
        <option value='lua'>
          Lua
        </option>
        <option value='mozart'>
          OZ Mozart
        </option>
        <option value='nasm'>
          Assembler - NASM
        </option>
        <option value='nemerle'>
          Nemerle
        </option>
        <option value='nim'>
          Nim
        </option>
        <option value='nodejs'>
          NodeJS
        </option>
        <option value='objc'>
          Objective C
        </option>
        <option value='ocaml'>
          Ocaml
        </option>
        <option value='octave'>
          Octave
        </option>
        <option value='pascal'>
          Pascal
        </option>
        <option value='perl'>
          Perl
        </option>
        <option value='php'>
          PHP
        </option>
        <option value='picolisp'>
          Picolisp
        </option>
        <option value='pike'>
          Pike
        </option>
        <option value='prolog'>
          Prolog
        </option>
        <option value='python2'>
          Python 2
        </option>
        <option value='python3'>
          Python 3
        </option>
        <option value='r'>
          R Language
        </option>
        <option value='racket'>
          Racket
        </option>
        <option value='rhino'>
          Rhino JS
        </option>
        <option value='ruby'>
          Ruby
        </option>
        <option value='rust'>
          RUST
        </option>
        <option value='scala'>
          Scala
        </option>
        <option value='scheme'>
          Scheme
        </option>
        <option value='smalltalk'>
          SmallTalk
        </option>
        <option value='spidermonkey'>
          SpiderMonkey
        </option>
        <option value='sql'>
          SQL
        </option>
        <option value='swift'>
          Swift
        </option>
        <option value='tcl'>
          TCL
        </option>
        <option value='unlambda'>
          Unlambda
        </option>
        <option value='vbn'>
          VB.Net
        </option>
        <option value='verilog'>
          VERILOG
        </option>
        <option value='whitespace'>
          Whitespace
        </option>
        <option value='yabasic'>
          YaBasic
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

