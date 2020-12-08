const { rejects } = require('assert');
const fs = require('fs');
const path = require('path');
const url = require('url');

// const filePath = '../mock.json';

function readFile() {
    return new Promise((resolve, rejects) => {
        fs.readFile(path.join(__dirname, '..','mock.json'), 'utf8', (err, data) => {
            if(err) rejects(err);
            else resolve(data);
        });
    });
}

async function getAll(req, res) {
    try {
        let jsonData = await readFile();
        dataObj = JSON.parse(jsonData);
        res.json(dataObj.book);  
    } catch (error) {
        console.error(error);
    }
}

async function getById(req, res) {
    try {
        let jsonData = await readFile();
        // console.log(jsonData);
        dataObj = JSON.parse(jsonData);
        var found = false;
        dataObj.book.forEach(element => {
            if(parseInt(element.id) === parseInt(req.params.id)) {
                found = true;
                res.json(element);
            }
        });  
    } catch (error) {
        console.error(error);
    }
}


module.exports = {getAll, getById}