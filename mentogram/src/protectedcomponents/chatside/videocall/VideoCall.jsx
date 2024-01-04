import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

export default function VideoCall(props) {

    const room = props.room
    const userName = props.userName;
    const socket = props.socket;
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const [peerId, setPeerId] = useState('');
    const [callInstance, setCallInstance] = useState(null);
    // const [mentorName, setMentorName] = useState('');

    useEffect(() => {
        const peer = new Peer();

        socket.on('videosend', (data) => {
            console.log(data)
            setRemotePeerIdValue(data.peerId);
            call(data.peerId);
        }
        );       
       
        peer.on('open', (id) => {
            setPeerId(id)

        });

        peer.on('call', (call) => {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            getUserMedia({ video: true, audio: true }, (mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                call.answer(mediaStream)
                call.on('stream', function(remoteStream) {
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.play();
                });
            });
        })

        peerInstance.current = peer;

      
    }, [])


    const handleConnect = () => {
        const obj = {room: props.room, username: props.userName, peerId: peerId };
        console.log(obj);
        socket.emit('video', obj);
         
        
    };

    const call = (remotePeerId) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        getUserMedia({ video: true, audio: true }, (mediaStream) => {

            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();

            const call = peerInstance.current.call(remotePeerId, mediaStream)

            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream
                remoteVideoRef.current.play();
            });

            setCallInstance(call);
        });
    }

    const endCall = () => {
        if (callInstance) {
            callInstance.close();
            currentUserVideoRef.current.srcObject = null;
            remoteVideoRef.current.srcObject = null;
        }
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
            socket.off('videosend');

    }

    return (
        <div className="App">
            <p>PeerId: {peerId}</p>
            {/* <input type="text" value={mentorName} onChange={e => setMentorName(e.target.value)} /> */}
            <button onClick={handleConnect}>Connect</button>
            <button onClick={() => call(remotePeerIdValue)}>Call</button>
            <button onClick={endCall}>End Call</button>
            <div>
                <video ref={currentUserVideoRef} muted />
            </div>
            <div>
                <video ref={remoteVideoRef} />
            </div>
        </div>
    );
}