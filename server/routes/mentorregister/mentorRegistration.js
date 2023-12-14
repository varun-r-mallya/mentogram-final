exports.mentorRegistration = function (username, email, hashedpassword, res) 
{
    const mongoose = require('mongoose');
    const registeredMentors = require('./mentorregistrationschema');


    mongoose.connect('mongodb://127.0.0.1:27017/testdb')
        .then(() => {
            console.log('Successfully connected to MongoDB');
        })
        .catch((error) => {
            console.error('Failed to connect to MongoDB:', error);
        });

    const user = new registeredMentors({username: username, email: email, hashedPassword: hashedpassword, mentees: [{username: "mentee1" , hashedpassword:"hashedpassword1"},{username: "mentee2" , hashedpassword:"hashedpassword2"}], locationoffolder:"location"});
    // check if same usernamae and email another user is stored or not
    user.save()
        .then(() => {
            console.log('Mentor registered successfully')
            res.status(200).json({ message: 'Registration successful' });
            
        })
        .catch((error) => {
            console.error('Failed to register Mentor:', error);
            res.status(400).json({ message: 'Invalid credentials' });
        });
}
