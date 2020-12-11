const url = require('url');
const sugerDisplay = require('../utils/sugerCoatJson');

const fileRW = require('../utils/fileReadWrite');
const objGiver = require('../utils/objGiver');

const filePath = 'mock.json';

async function getAll(req, res) {
    try {
        let category = req.params.category;
        let queryStr = req.query.orderBy;
        let queryStrArr = [];
        if (queryStr !== undefined) {
            queryStrArr = queryStr.split(',');
            queryStrArr = queryStrArr.map(item => {
                return item.split('_');
            });
        }
        let searchStr = req.query.searchBy;
        
        switch(category) {
            case 'book':
                let result = sugerDisplay.displayBooks(queryStrArr, searchStr);
                res.json(result);
                break;
            case 'author':
            case 'publisher': res.json(objGiver.returnObj(category));
        }
    } catch (error) {
        console.error(error);
    }
}

async function getById(req, res) {
    try {
        let category = req.params.category;
        let found = objGiver.returnObj(category).find(arrObj => parseInt(arrObj.id) === parseInt(req.params.id));
        if(found) {
            switch(category) {
                case 'book':
                    let result = sugerDisplay.displayBook(found);
                    res.json(result);
                    break;
                case 'author':
                case 'publisher': res.json(found);
            }
        } else {res.json({message: `${category} with the ID: ${req.params.id} is not found`})};
    } catch (error) {
        console.error(error);
    }
}

async function addItem(req, res) {
    try {
        let category = req.params.category;
        let dataObj = objGiver.returnObjs();
        dataObj[category].push(req.body);
        await fileRW.writeIntoFile(filePath, dataObj, req, res, urlArr[1]);
    } catch (error) {
        console.error(error);
    }
}

async function deleteItem(req, res) {
    try {
        let category = req.params.category;
        let dataObj = objGiver.returnObjs();
        dataObj[category] = dataObj[category].filter((element) => {
            return parseInt(element.id) !== parseInt(req.params.id)
        });
        await fileRW.writeIntoFile(filePath, dataObj, req, res, urlArr[1]);
    } catch (error) {
        console.error(error);
    }
}


module.exports = {getAll, getById, addItem, deleteItem}