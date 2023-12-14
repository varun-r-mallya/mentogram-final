const mentorRegistration = require('./mentorregister/mentorRegistration');

exports.mentorregister = async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  console.log(`Username: ${username} Email: ${email} Password: ${password}`);
  if (password !== confirmpassword) {
    res.status(400).json({ message: 'Passwords do not match' });
    console.log('Passwords do not match');
  } else {
    mentorRegistration.mentorRegistration(username, email, password, res);
  }
}
