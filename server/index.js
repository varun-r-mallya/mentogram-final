const express = require('express');
const app = express();
var cors = require('cors')
const menteelogin = require('./routes/menteelogin/menteelogin');
const mentorlogin = require('./routes/mentorlogin/mentorlogin');
const mentorregister = require('./routes/mentorregister/mentorregister');
const collaborativeside = require('./routes/collaborativeside');
const creatementee = require('./routes/creatementee/creatementee');
const auth = require('./routes/authenticate/auth');
const listsender = require('./routes/listsender');

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

app.post('/creatementee', (req, res) => {
  creatementee.creatementee(req, res);
});

app.post('/auth', (req, res) => {
  auth.auth(req, res);
});

app.post('/listsender', (req,res) => {
  listsender.listsender(req,res);
});

collaborativeside.collaborativeside();

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
