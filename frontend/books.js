function getJson(url) {
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
        console.log(json);
    }
    
    xhttp.send();
}

function submitBookId() {
    var bookId = document.forms.bookForm[0].value;
    var url = '/books/' + bookId;
    //git logsvar url = '/books';
    console.log(bookId);
    getJson(url);
}

