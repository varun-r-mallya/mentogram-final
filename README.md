# MentoGram
<h2>To make this work on your computer:</h2>
<p>On Linux (Debian based distributions), download MongoDB and Mongosh. Also have node and npm preinstalled. <br><b>USE ONLY:<code>node v20.30.0 (npm v10.2.3)</code></b></li>
<br>
Run: <code>service mongod start</code>and enter your password.
<br>
Open up the repo and <code>cd mentogram</code><br>Then, <code>npm install</code><br>To run locally:<code>npm run dev</code><br>To run across the network: <code>npm run hoster</code>
<br>Then, on a different terminal window,<br><code>cd server</code><br><code>npm install</code><br><code>node index</code>
<br><br>To stop mongoDB from running, use: <code>service mongod stop</code>
<br>
You can also update your server URL in the front end in a dedicated JSX.
</p>
<br>
<br>
<h3>Current Progress:</h3>
<ol>
<li>Adding rooms to the collaborative editor and removing constant rooms left
<li>Making it mobile friendly left.
<li>Other than that, completed.
</ol>

**Description:**

MentoGram will allow organisations/clubs/institutions to set up their own personal mentoring sites where a new entrant can be matched with a mentor. This will allow them to communicate over the website using video chat. I will also be adding a collaborative code editor with real time editing access to both the mentor and the mentee. There will also be a persistent text chat in the app. The code that is added can be stored in the database accessible by the mentor and the mentees.

**Use Cases:**

MentoGram has a wide variety of use cases.

It can be used 

- by clubs/institutions which mentor students to code. 

- by educators who teach coding to solve doubts one on one.

- to take online coding rounds of interviews.

- to do collaborative coding during hackathons.

**Context (With respect to SDSLabs):**

MentoGram can be used by clubs like SDSLabs which mentor people new to coding and development. It provides a much cleaner way to code collaboratively by bunching together video chat along with text chat and collaborative code editing. I think this will serve SDSLabs well in the future when they mentor the participants of WoC.


