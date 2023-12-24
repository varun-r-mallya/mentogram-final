//this is an incomplete module that will be used to check if a user is authenticated

const dotenv = require("dotenv").config();

function authcheck(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        console.log("no token provided");
        return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token using the secret key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log("invalid token");
            return res.status(401).json({ message: "Invalid token" });
        }

        // Token is valid, proceed to the next middleware
        console.log("legit token provided")
        next();
    });
}

module.exports = authcheck; 
