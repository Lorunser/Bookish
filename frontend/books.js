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
    if (jsonBookArray.length === 0) {
        var html = '<h2>Please login using the login tab</h2>'
        document.getElementById("bookResults").innerHTML = html;
        return 
    }

    var table = $('#bookTable');

    jsonBookArray.forEach((jsonBook) => {
        jsonBook.numcopies = jsonBook.copies.length;
        console.log(jsonBook)
        if (jsonBook.authors) {
            jsonBook.authors = jsonBook.authors.map((author) => author.name).join(' , ');
        }
    });

    table.DataTable({
        "data": jsonBookArray,
        "columns" :[
            {"data" : "id"},
            {"data" : "isbn"},
            {"data" : "title"},
            {"data" : "authors"},
            {"data" : "numcopies"}
        ]
    });
}

function submitBook(form) {
    var json = jsonifyForm(form);
    var url = '/api/books';
    postJson(url, json, window.location.reload);
}

function getBookList(){
    var url = '/api/books';
    getJson(url, displayBookArray);
}

window.onload = () => {
    getBookList();
};