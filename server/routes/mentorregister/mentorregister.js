const mentorRegistration = require('./mentorRegistration');
const passwordHasher = require('../passwordHasher');

exports.mentorregister = async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  console.log(`Username: ${username} Email: ${email} Password: ${password}`);
  if (password !== confirmpassword) {
    res.status(400).json({ message: 'Passwords do not match' });
    console.log('Passwords do not match');
  } else {
    const hashedPassword = await passwordHasher.passwordHasher(password);
    await mentorRegistration.mentorRegistration(username, email, hashedPassword, res);
  }
}
