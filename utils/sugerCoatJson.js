const objGiver = require('./objGiver');

function thirdSorting(a, b, arr) {
    let [sorting, ele] = arr[2];
    let result, nameOne, nameTwo = 0;

    switch(ele) {
        case 'bookName':
            nameOne = a.title;
            nameTwo = b.title;
            break;
        case 'isbn': console.log('3rd switch case went to isbnss');
    }
    switch(sorting) {
        case 'asc': if (nameOne > nameTwo) result = 1;
                    else if(nameOne < nameTwo) result = -1;
                    else result = 0;
            break;
        case 'desc': if (nameOne > nameTwo) result = -1;
                     else if(nameOne < nameTwo) result = 1;
                     else result = 0;
            break;
    }
    if(result !== 0) {
        return result;
    } else {
        console.log('Ran out of sorting variables');
    }
}

function secondSorting(a, b, arr) {
    let [sorting, ele] = arr[1];
    let result, nameOne, nameTwo = 0;
    
    switch(ele) {
        case 'authorName':
            nameOne = a.author.name;
            nameTwo = b.author.name;
            break;
        case 'dob': console.log('2nd switch case went to dobss');
    }
    switch(sorting) {
        case 'asc': if (nameOne > nameTwo) result = 1;
                    else if(nameOne < nameTwo) result = -1;
                    else result = 0;
            break;
        case 'desc': if (nameOne > nameTwo) result = -1;
                     else if(nameOne < nameTwo) result = 1;
                     else result = 0;
            break;
    }
    if(result !== 0) {
        return result;
    } else {
        let thirdResult = thirdSorting(a, b, arr);
        return thirdResult;
    }
}

function firstSorting(obj, arr) {
    let [sorting, ele] = arr[0];
    obj.sort((a,b) => {
        let result, yearOne, yearTwo = 0;
        
        switch(ele) {
            case 'year':
                yearOne = parseInt(a.publishedDate.split('/')[2]);
                yearTwo = parseInt(b.publishedDate.split('/')[2]);
                break;
            case 'pages': 
            case 'rating': console.log('1st switch case went to pagesss');
        }
        switch(sorting) {
            case 'asc': result = yearOne-yearTwo;
                break;
            case 'desc': result = (yearOne-yearTwo)*(-1);
                break;
        }
        if(result !== 0) {
            return result;
        } else {
            let secondResult = secondSorting(a, b, arr);
            return secondResult;
        }
    });
    return obj;
}

function displayBooks(queryStrArr) {
    // let [sorting, ele] = queryStrArr[0];
    let dataObj = objGiver.returnObj('book').map(obj => displayBook(obj));
    dataObj = firstSorting(dataObj, queryStrArr)
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