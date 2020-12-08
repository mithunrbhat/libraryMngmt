function displayBook(dataObj, type) {
    dataObj[type].forEach(element => {
        element['author'] = dataObj['author'].filter((item) => {
            return parseInt(item.id) === parseInt(element.authorId);
        });
        element['publisher'] = dataObj['publisher'].filter((item) => {
            return parseInt(item.id) === parseInt(element.publisherId)
        });
        delete element['authorId'];
        delete element['publisherId'];
    });
    return dataObj[type];
}

module.exports = {displayBook};