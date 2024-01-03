const fs = require('fs');
const path = require('path');


exports.sendServerData = (req, res) => {
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


exports.getServerData = (req, res) => {

    const folderPath= `${req.body.user}`;
    let serverDataPath = path.join(__dirname, '../server_data', folderPath);

    console.log(req.body.file.id);
    const filePath = path.join(serverDataPath, req.body.file.id);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    res.status(200).json({ fileContent, fileName: req.body.file.name });
}