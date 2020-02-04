'use strict';

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooksForDisplay();
    var strHTMLs = books.map(function (book) {
        return `
        <tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price + '$'}</td>
        <td><img class="book-img" src="${book.imgUrl}"/></td>
        <td> 
            <button onclick="onRemoveBook(event, ${book.id})">Delete</button>
            <button onclick="onUpdateBook(event, ${book.id})">Update</button>
            <button onclick="onShowBookDetails(event, ${book.id})">Read</button>
        </td>
        </tr>`
    });
    
    var elBookList = document.querySelector('.books-list');
    elBookList.innerHTML = strHTMLs.join('');
}

function onRemoveBook(event, bookId){
    event.stopPropagation();
    var isSure = confirm('Are you sure?');
    if (isSure) {
        removeBook(bookId);
        renderBooks();
    }
}

function onAddBook(){
    var elTxtName = document.querySelector('.txt-name');
    var elTxtPrice = document.querySelector('.txt-price');
    var name = elTxtName.value;
    var price = elTxtPrice.value;
    addBook(name, price);
    renderBooks();
}
function onUpdateBook(event, bookId){
    var book = getBook(bookId);
    document.querySelector('.new-book').hidden = true;
    var elTxtName = document.querySelector('.update-book .txt-name');
    var elTxtPrice = document.querySelector('.update-book .txt-price');
    elTxtName.value = book.name;
    elTxtPrice.value = book.price;
    elTxtName.dataset.id = bookId;
    document.querySelector('.update-book').hidden = false;
}

function onSaveBook(){
    var elTxtName = document.querySelector('.update-book .txt-name');
    var elTxtPrice = document.querySelector('.update-book .txt-price');
    var bookId = +elTxtName.dataset.id;
    var newPrice = elTxtPrice.value;
    updateBook(bookId, newPrice);
    elTxtName.value = '';
    elTxtName.dataset.id = '';
    elTxtPrice.value = '';
    document.querySelector('.update-book').hidden = true;
    document.querySelector('.new-book').hidden = false;
    renderBooks();
}
function onUpdateRate(event, bookId, elBtn){
    event.stopPropagation();
    var rateAction = elBtn.dataset.action;
    if (rateAction === 'plus') {
        plusRate(bookId);
    } else{
        minusRate(bookId);
    }
    document.querySelector('.rate').innerText = getBook(bookId).rate;
}
function onShowBookDetails(event, bookId){
    var book = getBook(bookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h3').innerText = book.name;
    elModal.querySelector('h4').innerText ='ONLY '+ book.price +'$';
    elModal.querySelector('p').innerHTML = book.desc;
    elModal.querySelector('.image-container').innerHTML = `<img src="${book.imgUrl}" alt="Book Image">`
    elModal.querySelector('.btn-container').innerHTML = `
    <button data-action="plus" onclick="onUpdateRate(event, ${book.id}, this)">+</button>
    <span class="rate">${book.rate}</span>
    <button data-action="minus" onclick="onUpdateRate(event, ${book.id}, this)">-</button>
    `
    
    elModal.hidden = false;
}

function onCloseModal(){
    var elModal = document.querySelector('.modal').hidden = true;

}




