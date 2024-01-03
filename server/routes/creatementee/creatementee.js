const registeredMentors = require('../mentorregister/mentorregistrationschema');
const registeredMentees = require('../menteelogin/menteeregistrationschema');
const { passwordHasher } = require('../passwordHasher');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

exports.creatementee = (req, res) => {
    const { mentorEmail, mentorPassword, menteeEmail, password } = req.body;
    
    console.log("creatementee request received");
    console.log(`mentorEmail: ${mentorEmail} mentorPassword: ${mentorPassword} menteeEmail: ${menteeEmail} password: ${password}`);
    checkMentor(mentorEmail, mentorPassword, menteeEmail, password, res);

}


async function checkMentor(mentorEmail, mentorPassword, menteeEmail, password, res){
    
    
    mongoose.connect('mongodb://127.0.0.1:27017/testdb')
        .then(() => {
            console.log('Successfully connected to MongoDB');
        })
        .catch((error) => {
            console.error('Failed to connect to MongoDB:', error);
        });
    
    try {
        const mentor = await registeredMentors.findOne({ email: mentorEmail });
        if (!mentor) {
            console.log("Mentor not found");
            res.status(400).json({ message: 'Mentor Not Found' });
        }
        else{
        const isMatch = await bcrypt.compare(mentorPassword, mentor.hashedPassword);
        if (isMatch) {
            console.log("Mentor verification successful");
            menteeCreate(menteeEmail, password, mentorEmail, res);
            return;
        } else {
            console.log("Mentor Password incorrect");
            res.status(400).json({ message: 'Mentor Password incorrect' });
        }
    }} catch (err) {
        console.log("Error in mentorLoginDB: " + err);
        res.status(400).json({ message: 'Error in mentorLoginDB' });
        throw new Error("Error in mentorLoginDB");
    }
}

function menteeCreate(menteeEmail, password, mentorEmail, res) {
    // Your menteeCreate logic here
    console.log(`Creating mentee with email: ${menteeEmail} and password: ${password}`);

    const hashedPassword = passwordHasher(password);

    registeredMentees.findOne( { email:menteeEmail } )
    .then((existingUser) => {
        if (existingUser) {
            console.log('Mentee already exists');
            res.status(400).json({ message: 'Mentee already exists' });
            return;
        }

        const user = new registeredMentees({email: menteeEmail, hashedPassword: hashedPassword, folderlocation: `/${mentorEmail}/${menteeEmail}` });
        user.save()
            .then((savedUser) => {
                console.log('Mentee registered successfully ' + savedUser._id);
                registeredMentors.findOneAndUpdate(
                    { email: mentorEmail },
                    { $push: { mentees: { $each: [savedUser._id], $position: 0 } } },
                    { upsert: true }
                )
                .then(() => {
                    res.status(200).json({ message: 'Registration successful', email: menteeEmail, password: password });
                })
                .catch((error) => {
                    console.error('Failed to update mentor:', error);
                    res.status(500).json({ message: 'Internal server error' });
                });
            })
            .catch((error) => {
                console.error('Failed to register Mentee:', error);
                res.status(400).json({ message: 'Invalid credentials' });
            });
    })
    .catch((error) => {
        console.error('Failed to check existing user:', error);
        res.status(500).json({ message: 'Internal server error' });
    });
}