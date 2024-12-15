let user = [];
const BASE_URL = ""

function addUser() {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let name = document.getElementById("name");
    let repeatPassword = document.getElementById("repeat-password");

    user.push({name: name.value, email: email.value, password: password.value});
    console.log(user);
    email.value = "";
    password.value = "";
    name.value = "";
    repeatPassword.value = "";
    window.location.href = 'index.html?msg=You Signed Up successfully!';
}

