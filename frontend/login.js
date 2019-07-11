function loginSubmit(){
    document.getElementById("loginForm").submit();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const url = 'http://localhost:3000/login?username=' + username + '&password=' + password;
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', url, true);
    xhttp.onload = function() {
        console.log('Got xhttp request')
    }
    xhttp.send()

    
}