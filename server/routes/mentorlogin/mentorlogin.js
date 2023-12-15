const mentorLoginDB = require('./mentorLoginDB')

exports.mentorlogin = (req, res) => {
    const { email, password } = req.body;
  
  console.log(`Email: ${email} Password:"+++++++" `)
  // Here you would typically hash the password before storing or comparing it
  // Example: bcrypt hashing or other encryption techniques

  mentorLoginDB.mentorLoginDB(email, password, res);
}