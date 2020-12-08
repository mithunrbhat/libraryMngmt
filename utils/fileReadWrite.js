const fs = require('fs');
const path = require('path');

function readFromFile() {
    return new Promise((resolve, rejects) => {
        fs.readFile(path.join(__dirname, '..', 'mock.json'), 'utf8', (err, data) => {
            if(err) rejects(err);
            else resolve(data);
        });
    });
}

function writeIntoFile(dataToWrite, req, res, item) {
    return new Promise((resolve, rejects) => {
        fs.writeFile(path.join(__dirname, '..', 'mock.json'), JSON.stringify(dataToWrite, null, 2), 'utf8', (err, msg) => {
            if(err) rejects(err);
            else {
                let msg = '';
                if(req.method == 'POST') msg = `${item} is added to the library`;
                else if(req.method == 'DELETE') msg = `${item} with ID: ${req.params.id} is deleted successfully `
                resolve(res.json({mesage: msg}));
            }
        })
    })
}

module.exports = {readFromFile, writeIntoFile}