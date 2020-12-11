const url = require('url');
const sugerDisplay = require('../utils/sugerCoatJson');

const fileRW = require('../utils/fileReadWrite');
const objGiver = require('../utils/objGiver');

const filePath = 'mock.json';

async function getAll(req, res) {
    try {
        let urlArr = req.url.split('/', 2);
        switch(urlArr[1]) {
            case 'book':
                let result = sugerDisplay.displayBooks();
                res.json(result);
                break;
            case 'author':
            case 'publisher': res.json(objGiver.returnObj(urlArr[1]));
        }
    } catch (error) {
        console.error(error);
    }
}

async function getById(req, res) {
    try {
        let urlArr = req.url.split('/', 2);
        let found = objGiver.returnObj(urlArr[1]).find(arrObj => parseInt(arrObj.id) === parseInt(req.params.id));
        if(found) {
            switch(urlArr[1]) {
                case 'book':
                    let result = sugerDisplay.displayBook(found);
                    res.json(result);
                    break;
                case 'author':
                case 'publisher': res.json(found);
            }
        } else {res.json({message: `${urlArr[1]} with the ID: ${req.params.id} is not found`})};
    } catch (error) {
        console.error(error);
    }
}

async function addItem(req, res) {
    try {
        let urlArr = req.url.split('/', 2);
        let dataObj = objGiver.returnObjs();
        dataObj[urlArr[1]].push(req.body);
        await fileRW.writeIntoFile(filePath, dataObj, req, res, urlArr[1]);
    } catch (error) {
        console.error(error);
    }
}

async function deleteItem(req, res) {
    try {
        let urlArr = req.url.split('/', 2);
        let dataObj = objGiver.returnObjs();
        dataObj[urlArr[1]] = dataObj[urlArr[1]].filter((element) => {
            return parseInt(element.id) !== parseInt(req.params.id)
        });
        await fileRW.writeIntoFile(filePath, dataObj, req, res, urlArr[1]);
    } catch (error) {
        console.error(error);
    }
}


module.exports = {getAll, getById, addItem, deleteItem}