const fileRW = require('../utils/fileReadWrite');

const filePath = 'mock.json';
let dataObj = {};

(async function() {
    let jsonData = await fileRW.readFromFile(filePath);
    dataObj = JSON.parse(jsonData);
})();

function returnObj(category) {
    return dataObj[category];
}

function returnObjs() {
    return dataObj;
}

module.exports = {returnObj, returnObjs}