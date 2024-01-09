require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.DirMaker = (req, res) => {
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
            realDirMaker(req, res, decoded);
        }
    });

   
}

function realDirMaker (req, res, decoded){
    const fs = require('fs');
    const path = require('path');
    console.log(req.body);
    const file = converter(req.body);
    res.send({message: 'ok'});
}
function converter(body){
    const title = body.title;
    const content = body.value;
    const folderPath = `../server_data/${body.accessCreds}/`;
    const fs = require('fs');
    const path = require('path');
    const filename = title;
    let filepath = null;
    filepath = path.join(__dirname, folderPath, filename);
    try {
        fs.mkdirSync(path.join(__dirname, folderPath), { recursive: true });
        console.log('Directories created successfully.');
    } catch (err) {
        console.error('Error creating directories:', err);
    }
    try{
    const file = fs.createWriteStream(filepath);
    file.write(content);
    file.end();
    return file;
}
catch(err){
    console.log(err);
}
}