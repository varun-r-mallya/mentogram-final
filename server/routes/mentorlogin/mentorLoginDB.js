const registeredMentors = require('../mentorregister/mentorregistrationschema');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

exports.mentorLoginDB = async (email, password, res) => {
    
    
    mongoose.connect('mongodb://127.0.0.1:27017/testdb')
        .then(() => {
            console.log('Successfully connected to MongoDB');
        })
        .catch((error) => {
            console.error('Failed to connect to MongoDB:', error);
        });
    
    try {
        const mentor = await registeredMentors.findOne({ email: email });
        if (!mentor) {
            console.log("Mentor not found");
            res.status(400).json({ message: 'Mentor Not Found' });
        }
        else{
        const isMatch = await bcrypt.compare(password, mentor.hashedPassword);
        if (isMatch) {
            console.log("Mentor Login successful");
            res.status(200).json({ message: 'Mentor Login successful' });
            return mentor;
        } else {
            console.log("Password incorrect");
            res.status(400).json({ message: 'Password incorrect' });
        }
    }} catch (err) {
        console.log("Error in mentorLoginDB: " + err);
        res.status(400).json({ message: 'Error in mentorLoginDB' });
        throw new Error("Error in mentorLoginDB");
    }
}