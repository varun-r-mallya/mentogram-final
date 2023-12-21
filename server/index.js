const express = require('express');
const app = express();
var cors = require('cors')
const menteelogin = require('./routes/menteelogin/menteelogin');
const mentorlogin = require('./routes/mentorlogin/mentorlogin');
const mentorregister = require('./routes/mentorregister/mentorregister');
const collaborativeside = require('./routes/collaborativeside');

app.use(cors())

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/menteelogin', (req, res) => {
  menteelogin.menteelogin(req, res);
});

app.post('/mentorlogin', (req, res) => {
  mentorlogin.mentorlogin(req, res);
});

app.post('/mentorregister', (req, res) => {
  mentorregister.mentorregister(req, res);
});


collaborativeside.collaborativeside();

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
