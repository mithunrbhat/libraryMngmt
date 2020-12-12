const objGiver = require('./objGiver');

function sorting(obj, arr) {
    obj.sort((a,b) => {
        index = 0;
        while(arr[index] !== undefined) {
            let [ele, order] = arr[index];
            let result, one, two = 0;

            switch(ele) {
                case 'year':
                    one = parseInt(a.publishedDate.split('/')[2]);
                    two = parseInt(b.publishedDate.split('/')[2]);
                    break;
                case 'authorName':
                    one = a.author.name;
                    two = b.author.name;
                    break; 
                case 'bookName':
                    one = a.title;
                    two = b.title;
                    break; 
            }
            switch(order) {
                case 'desc': if (one > two) result = -1;
                            else if(one < two) result = 1;
                            else result = 0;
                    break;
                case undefined:
                case 'asc': if (one > two) result = 1;
                            else if(one < two) result = -1;
                            else result = 0;
                    break;
            }
            if(result !== 0) {
                return result;
            } else {
                ++index;
            }
        }
        return 0;
    });
    return obj;
}

function searchingFunc(obj, str) {
    obj = obj.filter(item => {
        return item.title.includes(str)
    });
    return obj;
}

function displayBooks(queryStrArr, searchStr) {
    let dataObj = objGiver.returnObj('book').map(obj => displayBook(obj));
    if (queryStrArr[0] !== undefined) {
        dataObj = sorting(dataObj, queryStrArr);
    }
    if(searchStr !== undefined) {
        dataObj = searchingFunc(dataObj, searchStr);
    }
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