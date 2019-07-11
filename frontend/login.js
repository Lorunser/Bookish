function loginSubmit(){
    document.getElementById("loginForm").submit();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const url = 'http://localhost:3000/login?username=' + username + '&password=' + password;
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', url, true);
    //xhttp.open('GET', 'http://localhost:3000/login', true);
    xhttp.onload = function() { 
        console.log(xhttp.response);
    }
    xhttp.setRequestHeader('Authorisation', 'Bearer ' + xhttp.response.token)
    console.log(xhttp)

    xhttp.send(xhttp.request);
}