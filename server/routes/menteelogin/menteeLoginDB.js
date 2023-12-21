const registeredMentees = require('./menteeregistrationschema');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

exports.menteeLoginDB = async (email, password, res) => {
    
    
    mongoose.connect('mongodb://127.0.0.1:27017/testdb')
        .then(() => {
            console.log('Successfully connected to MongoDB');
        })
        .catch((error) => {
            console.error('Failed to connect to MongoDB:', error);
        });
    
    try {
        const mentee = await registeredMentees.findOne({ email: email });
        if (!mentee) {
            console.log("Mentee not found");
            res.status(400).json({ message: 'Mentee Not Found' });
        }
        else{
        const isMatch = await bcrypt.compare(password, mentee.hashedPassword);
        if (isMatch) {
            console.log("Mentee Login successful");
            res.status(200).json({ message: 'Mentee Login successful' });
            // add protected routes here
            return mentee;
        } else {
            console.log("Password incorrect");
            res.status(400).json({ message: 'Password incorrect' });
        }
    }} catch (err) {
        console.log("Error in menteeLoginDB: " + err);
        res.status(400).json({ message: 'Error in menteeLoginDB' });
        throw new Error("Error in menteeLoginDB");
    }
}