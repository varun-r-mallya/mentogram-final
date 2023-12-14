exports.mentorregister = (req, res) => {
    const { username, email, password, confirmpassword } = req.body;
  
  console.log(`Username: ${username} Email: ${email} Password: ${password}`)
  //hash password here
  const checkemail = 'mentor@gmail.com'
  const checkpassword = 'mentor1234'


  //response stimulation
  if (email===checkemail && password===checkpassword) {
    res.status(200).json({ message: 'Register successful' });
    console.log('Mentor Registration successful')
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
    console.log('Invalid Registration credentials')
  }
}