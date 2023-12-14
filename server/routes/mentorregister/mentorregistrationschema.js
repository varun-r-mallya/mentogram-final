const mongoose = require('mongoose');
const mentorRegistrationSchema = new mongoose.Schema({
    username: String,
    email: String,
    hashedPassword: String,
    mentees: Array,
    locationoffolder: String,

})

module.exports = mongoose.model('registeredMentors', mentorRegistrationSchema)