const fs = require('fs');
const path = require('path');

function readFromFile(readFilePath) {
    return new Promise((resolve, rejects) => {
        fs.readFile(path.join(__dirname, '..', readFilePath), 'utf8', (err, data) => {
            if(err) rejects(err);
            else resolve(data);
        });
    });
}

function writeIntoFile(writeFilePath, dataToWrite, req, res, item) {
    return new Promise((resolve, rejects) => {
        fs.writeFile(path.join(__dirname, '..', writeFilePath), JSON.stringify(dataToWrite, null, 2), 'utf8', (err) => {
            if(err) rejects(err);
            else {
                let msg = '';
                if(req.method === 'POST') {
                    if(item === undefined) msg = 'Registered successfully';
                    else msg = `${item} is added to the library`;
                }
                else if(req.method == 'DELETE') msg = `${item} with ID: ${req.params.id} is deleted successfully `
                resolve(res.json({mesage: msg}));
            }
        })
    })
}

module.exports = {readFromFile, writeIntoFile}