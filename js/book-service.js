'use strict'
const KEY = 'books';
var gBooks = _createBooks();

// id, name, price, imgUrl

function getBooksForDisplay() {
    return gBooks;
}
function plusRate(bookId){
    var book = getBook(bookId);
    if (book.rate === 10) return;
    book.rate++
    saveToStorage(KEY, gBooks)
}
function minusRate(bookId){
    var book = getBook(bookId);
    if (book.rate === 0) return;
    book.rate--;
    saveToStorage(KEY, gBooks);
}
function getBookRate(bookId){
    var book = getBook(bookId);
    return book.rate;
}

function getBook(bookId){
    var book = gBooks.find(function (book){
        return book.id === bookId;
    });
    return book;
}
function updateBook(bookId, price){
    var idx = gBooks.findIndex(function (book){
        return book.id === bookId;
    });
    gBooks[idx].price = price;
    saveToStorage(KEY, gBooks);
}
function addBook(name, price){
    var book = createBook(name,price);
    gBooks.push(book);
    saveToStorage(KEY, gBooks)
    
}

function removeBook(bookId){
    var idx = gBooks.findIndex(function (book){
        return book.id === bookId;
    });
    gBooks.splice(idx, 1);
    saveToStorage(KEY, gBooks);
}

function _createBooks(){
    var savedBooks = loadFromStorage(KEY);
    if (savedBooks) return savedBooks;
    var books = [];
    books.push(createBook('Harry Potter', 100, 'img/harry-potter.jpg' ));
    books.push(createBook('Money Management', 150, 'img/money-management.jpg'));
    books.push(createBook('Study Smart', 200, 'img/study-smart.jpg' ));
    return books;
}

function createBook(name, price, imgUrl=null){
    var book = {
        id: parseInt(Math.random() * 1000),
        name: name,
        price: price,
        imgUrl: imgUrl,
        rate: 0,
        desc: `"${name}" is the best reccomended book of 2020. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ea et labore est? Cupiditate alias perferendis aliquid iusto pariatur. Soluta id voluptatem excepturi ducimus voluptates saepe. Consequuntur, velit accusantium? Alias!`
    }
    return book;
}
