require("dotenv").config();
const jwt = require("jsonwebtoken");
const registeredMentors = require('./mentorregister/mentorregistrationschema');
const registeredMentees = require('./menteelogin/menteeregistrationschema');
const mongoose = require('mongoose');

exports.listsender = (req, res) => {
    const token = req.headers.token;
    if(!token){
        return res.status(401).json({message: "No token provided"});    
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            console.log(err);
            return res.status(500).json({message: "Failed to authenticate token"});
        } else {
            console.log(decoded);
            dbside(decoded, res);
        }
    });

   
}

async function dbside(decoded, res){
    mongoose.connect('mongodb://127.0.0.1:27017/testdb')
        .then(() => {
            console.log('Successfully connected to MongoDB');
        })
        .catch((error) => {
            console.error('Failed to connect to MongoDB:', error);
        });
    
        try {
            const mentor = await registeredMentors.findOne({
                email: decoded.email,
            });
            if (!mentor) {
                console.log("Mentor not found");
                res.status(400).json({ message: 'Mentor Not Found' });
            }
            else{
                lister(mentor, res);
            }} catch (err) {
            console.log("Error in mentorLoginDB: " + err);
            res.status(400).json({ message: 'Failed to retrieve mentees' });
        }
}

async function lister(mentor, res) {
    const mentees = mentor.mentees;
    const menteeEmails = [];

    for (let i = 0; i < mentees.length; i++) {
        try {
            const mentee = await registeredMentees.findById(mentees[i]);
            if (mentee) {
                menteeEmails.push(mentee.email);
            }
        } catch (err) {
            console.log("Error in retrieving mentee: " + err);
        }
    }

    res.status(200).json({mentor, mentees: menteeEmails });
}