function wrapLi(inner){
    return '<li class="list-group-item">' + inner + '</li>';
}

function wrapUl(inner){
    return '<ul class="list-group">' + inner + '</ul>'; 
}

function wrapCol(inner){
    return '<div class="col-md-4">' + inner + '</div>'
}

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
        try {
            var json = JSON.parse(xhttp.response);
        } catch (err) {
            window.location.href = '/login';
        }
        callback(json);
    }
    
    xhttp.send();
}