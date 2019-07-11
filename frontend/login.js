function loginSubmit(){
    localStorage.clear();
    document.getElementById("loginForm").submit();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const url = 'http://localhost:3000/login?username=' + username + '&password=' + password;
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', url, true);
    //xhttp.open('GET', 'http://localhost:3000/login', true);
    
    xhttp.onload = async function() { 
        //console.log(xhttp.response);
        let books = new XMLHttpRequest(); 
        books.open('GET', 'http://localhost:3000/books', true);
        books.setRequestHeader('Authorization', 'Bearer ' + JSON.parse(xhttp.response).token);
        books.onload = async function() {
            localStorage.setItem("token", JSON.parse(xhttp.response).token)
        }
        books.send();
    }
    //xhttp.setRequestHeader('Authorisation', 'Bearer ' + xhttp.response.token)
    //console.log(xhttp)

    xhttp.send();
}