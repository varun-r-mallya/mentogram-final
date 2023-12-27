// this function is going to use the mentees array in the database under the mentor and render the mentees in a list with a TO-DO lsit like
// fashion. There will be tiny dustbins as delete buttons. There will be a button to add mentees. Which will redirect the mentor to the
// AddMentees.jsx. There will also be a button on each mentee to "Connect mentee". This will redirect the mentor to the collaborative coding
// /chat/videochat/filemanager page. 

import { useEffect, useState } from "react";
import { getToken } from "../tokenService";
import { serverURL } from "../../serverURL";

export default function ListOfMentees() {
            const [mentees, setMentees] = useState([]);
            const token = getToken();
            const sendTokenToServer = async () => {
                try {
                    const response = await fetch(`${serverURL}/listsender`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "token": token,
                        },
                    });
                    const data = await response.json();
                    console.log(data);
                    setMentees(data.mentees);
                } catch (error) {
                    console.error(error);
                }
            };

            useEffect(() => {
                sendTokenToServer();
            }, []);

            // can be written like mentee.email if i pass more stuff along with email in mentee

            return (
                <div>
                    <h1>List Of Mentees</h1>
                    <ul>
                        {mentees.map((mentee, index) => (
                            <li key={index}>{mentee}</li>
                        ))}
                    </ul>
                </div>
            );
        }