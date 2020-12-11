const objGiver = require('./objGiver');

function displayBooks() {
    let dataObj = objGiver.returnObj('book').map(obj => displayBook(obj));
    return dataObj;
}

function displayBook(obj) {
    return {
        id: obj.id,
        title: obj.title,
        totalPages: obj.totalPages,
        rating: obj.rating,
        isbn: obj.isbn,
        publishedDate: obj.publishedDate,
        author: objGiver.returnObj('author').find((item) => {
                return parseInt(item.id) === parseInt(obj.authorId);
            }),
        publisher: objGiver.returnObj('publisher').find((item) => {
                return parseInt(item.id) === parseInt(obj.publisherId)
            })
    };
}

module.exports = {displayBooks, displayBook};