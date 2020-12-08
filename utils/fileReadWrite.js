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

function writeIntoFile(dataToWrite, res, item) {
    return new Promise((resolve, rejects) => {
        fs.writeFile(path.join(__dirname, '..', 'mock.json'), JSON.stringify(dataToWrite, null, 2), 'utf8', (err, msg) => {
            if(err) rejects(err);
            else resolve(res.json({mesage: `${item} is added to the library`}));
        })
    })
}

module.exports = {readFromFile, writeIntoFile}