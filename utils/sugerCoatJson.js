function displayBooks(dataObj, type) {
    dataObj[type].forEach(element => displayBook(element, dataObj));
    return dataObj[type];
}

function displayBook(element, dataObj) {
    element['author'] = dataObj['author'].find((item) => {
        return parseInt(item.id) === parseInt(element.authorId);
    });
    element['publisher'] = dataObj['publisher'].find((item) => {
        return parseInt(item.id) === parseInt(element.publisherId)
    });
    delete element['authorId'];
    delete element['publisherId'];
    return element;
}

module.exports = {displayBooks, displayBook};