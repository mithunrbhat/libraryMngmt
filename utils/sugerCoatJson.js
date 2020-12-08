function displayBooks(dataObj, type) {
    dataObj[type].forEach(element => displayBook(element));
    return dataObj[type];
}

function displayBook(element) {
    element['author'] = dataObj['author'].filter((item) => {
        return parseInt(item.id) === parseInt(element.authorId);
    });
    element['publisher'] = dataObj['publisher'].filter((item) => {
        return parseInt(item.id) === parseInt(element.publisherId)
    });
    delete element['authorId'];
    delete element['publisherId'];
    return element;
}

module.exports = {displayBooks, displayBook};