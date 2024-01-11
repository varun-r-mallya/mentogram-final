const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/log', async (req, res) => {
    
    if(req.body.language == "Python")
    {const pythonCode = req.body.code;
    let Code = pythonCode;
    Code = Code.replace(/"/g, '\\"');
    exec(`python -c "${Code}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python code: ${error.message}`);
            res.status(200).json({ Error: error.message });
            return;
        }

        console.log(`Python code output: ${stdout}`);
        res.status(200).json({ Output: stdout, Error: stderr });
    });}
    if(req.body.language == "JavaScript")
    {
        const JSCode = req.body.code;
        let Code = JSCode;
        Code = Code.replace(/"/g, '\\"');
        exec(`node -e "${Code}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing JavaScript code: ${error.message}`);
                res.status(200).json({ Error: error.message });
                return;
            }
    
            console.log(`JavaScript code output: ${stdout}`);
            res.status(200).json({ Output: stdout, Error: stderr });
        });
        
    }
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
