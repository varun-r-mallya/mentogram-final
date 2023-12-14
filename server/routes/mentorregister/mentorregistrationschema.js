const mongoose = require('mongoose');
const mentorRegistrationSchema = new mongoose.Schema({
    username: String,
    email: String,
    hashedPassword: String,
    mentees:[mongoose.SchemaTypes.ObjectId],
    
})

module.exports = mongoose.model('registeredMentors', mentorRegistrationSchema)