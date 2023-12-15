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

    registeredMentors.findOne({ $or: [{ username: username }, { email: email }] })
        .then((existingUser) => {
            if (existingUser) {
                console.log('User already exists');
                res.status(400).json({ message: 'User already exists' });
                return;
            }

            const user = new registeredMentors({username: username, email: email, hashedPassword: hashedpassword});
            user.save()
                .then(() => {
                    console.log('Mentor registered successfully')
                    res.status(200).json({ message: 'Registration successful' });
                })
                .catch((error) => {
                    console.error('Failed to register Mentor:', error);
                    res.status(400).json({ message: 'Invalid credentials' });
                });
        })
        .catch((error) => {
            console.error('Failed to check existing user:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
}
