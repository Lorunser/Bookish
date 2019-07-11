function getJson(url, callback) {
    var xhttp = new XMLHttpRequest();

    var token = localStorage.getItem('token');
    xhttp.open('GET', url);
    xhttp.setRequestHeader('Authorization', 'Bearer ' + token);

    xhttp.onload = function() {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
        if(xhttp.status == 404){
            alert("Not Found");
        }
        else if(xhttp.status == 400){
            alert("Bad Request");
        }

        var json = JSON.parse(xhttp.response);
        callback(json);
    }
    
    xhttp.send();
}


function wrapLi(inner){
    return '<li class="list-group-item">' + inner + '</li>';
}

function wrapUl(inner){
    return '<ul class="list-group">' + inner + '</ul>'; 
}

function wrapCol(inner){
    return '<div class="col-md-4">' + inner + '</div>'
}

function htmlifyBook(jsonBook){
    var html = "";

    //html = wrapLi(jsonBook.title) + wrapLi(jsonBook.authors[0].authorname);
    html = wrapLi(jsonBook.bookid) + wrapLi(jsonBook.title);
    
    if(jsonBook.authors){
        for(var author of jsonBook.authors){
            html += wrapLi(author.authorname);
        }
    }

    html = wrapUl(html);
    html = wrapCol(html);

    return html;
}

function displayBook(jsonBook){
    var html = htmlifyBook(jsonBook);
    document.getElementById("bookResults").innerHTML = html;
}

function displayBookArray(jsonBookArray){
    var table = $('#bookTable');

    jsonBookArray.forEach((jsonBook) => {
        jsonBook.numcopies = jsonBook.copies.length;
        jsonBook.authornames = jsonBook.authors.map((author) => author.authorname).join(' , ');
    });

    table.DataTable({
        "data": jsonBookArray,
        "columns" :[
            {"data" : "bookid"},
            {"data" : "isbn"},
            {"data" : "title"},
            {"data" : "authornames"},
            {"data" : "numcopies"}
        ]
    });
}


function submitBookId() {
    var bookId = document.forms.bookForm[0].value;
    var url = '/api/books/' + bookId;
    getJson(url, displayBook);
}

function getBookList(){
    var url = '/api/books';
    getJson(url, displayBookArray);
}

window .onload = () => {
    getBookList();
};

