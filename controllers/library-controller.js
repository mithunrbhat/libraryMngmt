const url = require('url');
const sugerDisplay = require('../utils/sugerCoatJson');

const fileRW = require('../utils/fileReadWrite')

async function getAll(req, res) {
    try {
        let jsonData = await fileRW.readFromFile();
        dataObj = JSON.parse(jsonData);
        let urlArr = req.url.split('/', 2);
        switch(urlArr[1]) {
            case 'book':
                let result = sugerDisplay.displayBooks(dataObj, urlArr[1]);
                res.json(result);
                break;
            case 'author':
            case 'publisher': res.json(dataObj[urlArr[1]]);

        }
    } catch (error) {
        console.error(error);
    }
}

async function getById(req, res) {
    try {
        let jsonData = await fileRW.readFromFile();
        dataObj = JSON.parse(jsonData);
        var found = false;
        let urlArr = req.url.split('/', 2);
        dataObj[urlArr[1]].forEach(element => {
            if(parseInt(element.id) === parseInt(req.params.id)) {
                found = true;
                switch(urlArr[1]) {
                    case 'book':
                        let result = sugerDisplay.displayBook(element);
                        res.json(result);
                        break;
                    case 'author':
                    case 'publisher': res.json(element);
                }
            }
        });  
        if(!found) {res.json({message: `${urlArr[1]} with the ID: ${req.params.id} is not found`})};
    } catch (error) {
        console.error(error);
    }
}

async function addItem(req, res) {
    try {
        let jsonData = await fileRW.readFromFile();
        dataObj = JSON.parse(jsonData);
        let urlArr = req.url.split('/', 2);
        dataObj[urlArr[1]].push(req.body);
        await fileRW.writeIntoFile(dataObj, req, res, urlArr[1]);
    } catch (error) {
        console.error(error);
    }
}

async function deleteItem(req, res) {
    try {
        let jsonData = await fileRW.readFromFile();
        dataObj = JSON.parse(jsonData);
        let urlArr = req.url.split('/', 2);
        dataObj[urlArr[1]] = dataObj[urlArr[1]].filter((element) => {
            return parseInt(element.id) !== parseInt(req.params.id)
        });
        await fileRW.writeIntoFile(dataObj, req, res, urlArr[1]);
    } catch (error) {
        console.error(error);
    }
}


module.exports = {getAll, getById, addItem, deleteItem}