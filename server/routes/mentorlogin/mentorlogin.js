exports.mentorlogin = (req, res) => {
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
}