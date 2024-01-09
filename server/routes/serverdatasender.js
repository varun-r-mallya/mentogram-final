const fs = require('fs');
const path = require('path');
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.sendServerData = (req, res) => {
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
            funcsendserverdata(req, res, decoded);
        }
    });

   
}

exports.getServerData = (req, res) => {
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
            funcgetserverdata(req, res, decoded);
        }
    });

   
}

exports.deleteServerData = (req, res) => {
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
            funcdeleteserverdata(req, res, decoded);
        }
    });

   
}


function funcsendserverdata(req, res, decoded){
    const folderPath= `/${req.body.user}`;
    let serverDataPath = path.join(__dirname, '../server_data', folderPath);

    fs.readdir(serverDataPath, (err, files) => {
        if (err) {
            res.status(500).json([]);
            return;
        }
        
        const fileObjects = files.map((file) => {
            const filePath = path.join(serverDataPath, file);
            const stats = fs.statSync(filePath);
        
            return{
                id: file,
                name: file,
                isDir: stats.isDirectory(),
                // content: fs.readFileSync(filePath, 'utf8')
            }
        }
        );
        console.log(fileObjects)
        res.status(200).json(fileObjects);
    });
}


function funcgetserverdata(req, res, decoded){

    const folderPath= `${req.body.user}`;
    let serverDataPath = path.join(__dirname, '../server_data', folderPath);

    console.log(req.body.file.id);
    const filePath = path.join(serverDataPath, req.body.file.id);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    res.status(200).json({ fileContent, fileName: req.body.file.name });
}

function funcdeleteserverdata(req, res, decoded){
    const folderPath= `${req.body.user}`;
    let serverDataPath = path.join(__dirname, '../server_data', folderPath);

    const filePath = path.join(serverDataPath, req.body.file.id);
    fs.unlinkSync(filePath);
    res.status(200).json({ message: 'File deleted' });
}