let users = []; // Hier wird der Array erstellt.

const BASE_URL = "https://join-405-43178-default-rtdb.europe-west1.firebasedatabase.app/";

function init() {
    loadData();
}

async function loadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let data = await response.json();

    for (let key in data.users) {
        users.push(data.users[key]); // Jede User-Objekt in den Array pushen
    }
    console.log(users); // Überprüfen, ob die Benutzer geladen wurden
}

function logIn() {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let emailError = document.getElementById("email-error");
    let passwordError = document.getElementById("password-error");

    // Fehlertexte zurücksetzen
    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    // Benutzer mit passender E-Mail suchen
    let user = users.find(u => u.email === email.value);

    if (user) {
        // Benutzer gefunden, Passwort prüfen
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