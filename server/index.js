const express = require('express');
const app = express();
var cors = require('cors')

app.use(cors())

app.use(express.json());

app.post('/menteelogin', (req, res) => {
  const { email, password } = req.body;
  
  console.log(`Email: ${email} Password: ${password}`)
  // Here you would typically hash the password before storing or comparing it
  // Example: bcrypt hashing or other encryption techniques
  const checkemail = 'mentee@gmail.com'
  const checkpassword = 'mentee1234'


  // Simulating a response
  if (email===checkemail && password===checkpassword) {
    res.status(200).json({ message: 'Login successful' });
    console.log('Mentee Login successful')
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
    console.log('Invalid Mentee credentials')
  }
});

app.post('/mentorlogin', (req, res) => {
  const { email, password } = req.body;
  
  console.log(`Email: ${email} Password: ${password}`)
  // Here you would typically hash the password before storing or comparing it
  // Example: bcrypt hashing or other encryption techniques
  const checkemail = 'mentor@gmail.com'
  const checkpassword = 'mentor1234'


  // Simulating a response
  if (email===checkemail && password===checkpassword) {
    res.status(200).json({ message: 'Login successful' });
    console.log('Mentor Login successful')
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
    console.log('Invalid Mentor credentials')
  }
});


const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
