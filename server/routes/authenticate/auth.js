const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const secret = process.env.ACCESS_TOKEN_SECRET;
const passwordHasher = require('../passwordHasher');

exports.auth = (req, res) => {
    const { email, password, type } = req.body;
    const hashedPassword = passwordHasher.passwordHasher(password);
    const user = {
        email,
        hashedPassword,
        type,
        
    };
    const token = jwt.sign(user, secret, { expiresIn: '1h' });
    console.log(token)
    res.json({
        token
    });
    }