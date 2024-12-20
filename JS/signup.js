let email = document.getElementById("email");
let password = document.getElementById("password");
let userName = document.getElementById("name");
let repeatPassword = document.getElementById("repeat-password");
let repeatPasswordError = document.getElementById("repeat-password-error");
let passwordError = document.getElementById("password-error");

function checkSignUp(event) {
  event.preventDefault();
  repeatPasswordError.innerHTML = "";
  passwordError.innerHTML = "";

  if (password.value.length < 8) {
    passwordError.innerHTML = "Passwort muss Mindestens 8 zeichen haben";
    return;
  } else if (password.value !== repeatPassword.value) {
    repeatPasswordError.innerHTML = "Passwörter stimmen nicht überein!";
    return;
  }

  addUser();
}

function addUser() {
  const newUser = {
    name: userName.value,
    email: email.value,
    password: password.value,
    telefon: "",
  };

  postUser(newUser);

  email.value = "";
  password.value = "";
  userName.value = "";
  repeatPassword.value = "";
}

async function postUser(newUser) {
  try {
    let response = await fetch(BASE_URL + ".json");
    if (!response.ok) {
      throw new Error (`Fehler beim Laden der Benutzer: ${response.status}`);
    }

    const users = await response.json();
    const userCount = users ? Object.keys(users).length : 0;

    const userId = `user${userCount + 1}`;

    response = await fetch(`${BASE_URL}/${userId}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    window.location.href = "index.html?msg=You Signed Up successfully!";
  } catch (error) {
    console.error("Benutzer konnte nicht geladen werden", error);
  }
}
