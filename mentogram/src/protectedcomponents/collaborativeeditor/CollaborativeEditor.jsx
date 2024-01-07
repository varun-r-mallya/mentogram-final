import {basicSetup} from "codemirror"
import {python} from "@codemirror/lang-python"
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { yCollab } from 'y-codemirror.next'
import * as random from 'lib0/random'
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import Save from './Save.jsx';
import './CollaborativeEditor.css';

const userName = localStorage.getItem('userName');

export const usercolors = [
  { color: '#30bced', light: '#30bced33' },
  { color: '#6eeb83', light: '#6eeb8333' },
  { color: '#ffbc42', light: '#ffbc4233' },
  { color: '#ecd444', light: '#ecd44433' },
  { color: '#ee6352', light: '#ee635233' },
  { color: '#9ac2c9', light: '#9ac2c933' },
  { color: '#8acb88', light: '#8acb8833' },
  { color: '#1be7ff', light: '#1be7ff33' }
]

export const userColor = usercolors[random.uint32() % usercolors.length]

const ydoc = new Y.Doc()
const provider = new WebrtcProvider('codemirror6-demo-room', ydoc, { signaling: ['ws://localhost:4444'] }) // { password: 'optional-room-password' })
const ytext = ydoc.getText('codemirror')


const undoManager = new Y.UndoManager(ytext)

provider.awareness.setLocalStateField('user', {
  name: userName,
  color: userColor.color,
  colorLight: userColor.light
})

export default function CollaborativeEditor(props){

  const onChange = React.useCallback((val, viewUpdate) => {
    props.setValue(val);
  }, []);

  function Saver(){
    Save(props.value, props.title);
    window.location.reload();
  }

  return (
  <div>
    <div className="ballsdiv">
    <input type="text" onChange={(e) => props.setTitle(e.target.value)} placeholder={props.title} className='titlebox' />
    <button onClick={Saver} className="saver">Save</button>
    </div>
    <CodeMirror value={props.value} doc={ytext.toString()} theme={okaidia} height='70vw' width='49vw' extensions={[python(), basicSetup, yCollab(ytext, provider.awareness, { undoManager }) ]} onChange={onChange}/>
    
  </div>
  );
}


