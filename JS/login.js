let users = [];

function init() {
    loadData();
}

async function loadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let data = await response.json();

    for (let key in data.users) {
        users.push(data.users[key]);
    }
}

function logIn() {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let emailError = document.getElementById("email-error");
    let passwordError = document.getElementById("password-error");

    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    let user = users.find(u => u.email === email.value);

    if (user) {
        if (user.password === password.value) {
            console.log("Login erfolgreich:", user);
            email.value = "";
            password.value = "";
        } else {
            passwordError.innerHTML = "Passwort ist falsch.";
        }
    } else {
        emailError.innerHTML = "E-Mail-Adresse existiert nicht.";
    }
}