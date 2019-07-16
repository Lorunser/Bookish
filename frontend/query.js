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

function postJson(url, json, callback){
    var xhttp = new XMLHttpRequest();
    
    var token = localStorage.getItem('token');
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Authorization', 'Bearer ' + token);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function() {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
        if(xhttp.readyState === xhttp.DONE){
            if(xhttp.status == 201){
                alert("Success");
                document.location.reload();
            }
            else{
                alert(xhttp.responseText);
            }
        }
    }
    
    xhttp.send(json);
}

function jsonifyForm(form){
    //var data = JSON.stringify( $(form).serializeArray() );
    var data = $(form).serializeArray();
    var json = {};

    data.forEach( (element) => {
        json[element.name] = element.value;
    });

    return JSON.stringify(json);
}