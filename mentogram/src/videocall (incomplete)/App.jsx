import { useState, useEffect } from 'react';
import "./style.css";

import { initializeApp } from 'firebase/app';
import { collection, getDoc, doc, getFirestore, setDoc, addDoc, onSnapshot, updateDoc } from 'firebase/firestore'; 
import {APISecret} from "./secrets.js";

const firebaseConfig = APISecret;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

let localStream = null;
let remoteStream = null;

export default function App() {
  const [callId, setCallId] = useState('');
  const pc = new RTCPeerConnection(servers);

  useEffect(() => {
    const setupMediaSources = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream = stream;
      remoteStream = new MediaStream();

      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });

      pc.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track);
        });
      };

      webcamVideo.srcObject = localStream;
      remoteVideo.srcObject = remoteStream;

    };

    setupMediaSources();

    return () => {
      localStream && localStream.getTracks().forEach((track) => track.stop());
      remoteStream && remoteStream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  async function handleAnswer(){
    
            const callDocRef = await doc(db, "calls", callId);
            const callDoc = await getDoc(callDocRef);
            const answerCandidatesRef = await collection(db, "calls", callId, "answerCandidates");
            const offerCandidatesRef = await collection(db, "calls", callId, "offerCandidates");

            pc.onicecandidate = async (event) => {
                if (event.candidate) {
                    await addDoc(answerCandidatesRef, event.candidate.toJSON());
                }
            };

            
            onSnapshot(callDocRef,async (snapshot) => {
                const callData = snapshot.data();
                if (!pc.currentRemoteDescription && callData?.offer) {
                  const offerDescription = new RTCSessionDescription(callData.offer);
                  await pc.setRemoteDescription(offerDescription);
                }
              });

              // comment all three, then run once, uncomment last two, then run once, uncomment top, then run. 
            const callData = (callDoc).data();
            const offerDescription = callData.offer;
            await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

            const answerDescription = await pc.createAnswer();
            await pc.setLocalDescription(answerDescription);
    
            const answer = { type: answerDescription.type, sdp: answerDescription.sdp };
            await updateDoc(callDocRef, { answer });
    
            onSnapshot(offerCandidatesRef, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        const data = change.doc.data();
                        pc.addIceCandidate(new RTCSessionDescription(data));
                    }
                });
            });
    };


  async function handleCall() {
  const callDoc = doc(collection(db, 'calls'));
  const offerCandidates = collection(callDoc, 'offerCandidates');
  const answerCandidates = collection(callDoc, 'answerCandidates');
  const callDocument = collection(callDoc, callDoc.id);
  setCallId(callDoc.id);

   pc.onicecandidate = (event) => {
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDoc, { offer });
    
    onSnapshot(callDoc,(snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

   
    onSnapshot(answerCandidates, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  }

  return (
    <div>
      <h1>Video Chat</h1>
      <button onClick={handleCall}>
        Call
      </button>
      <input
        type="text"
        value={callId}
        onChange={(e) => setCallId(e.target.value)}
        placeholder="Enter call ID"
      />
      <button onClick={handleAnswer}>
        Answer
      </button>
      <video id="webcamVideo" autoPlay playsInline muted/>
      <video id="remoteVideo" autoPlay playsInline />
    </div>
  );
}