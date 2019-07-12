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

        if(localStorage.getItem('token')){
            localStorage.removeItem('token');
        }

        if(xhttp.status == 200){
            localStorage.setItem("token", JSON.parse(xhttp.response).token);
            alert('Log in successful');
            window.location.href = "/";
        }

        else{
            alert('Invalid Username or Password');
        }
    }

    xhttp.send();
}