const mongoose = require('mongoose');
const menteeRegistrationSchema = new mongoose.Schema({
    email: String,
    hashedPassword: String,
    folderlocation: String,
    
})

module.exports = mongoose.model('registeredmentees', menteeRegistrationSchema) 