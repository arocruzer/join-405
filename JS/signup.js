function checkSignUp() {
  repeatPasswordError.innerHTML = "";
  passwordError.innerHTML = "";
  
  if (password.value.length = 0 || password.value.length < 8) {
    passwordError.style.display = "flex"
    passwordError.innerHTML = "Password must have at least 8 characters";
    return;
  } else if (password.value !== repeatPassword.value) {
    repeatPasswordError.style.display = "flex";
    repeatPasswordError.innerHTML = "Your passwords don't match. Please try again.";
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
    color: colors[Object.keys(users).length % colors.length], 
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

    window.location.href = ".index.html?msg=You Signed Up successfully!";
  } catch (error) {
    console.error("Benutzer konnte nicht geladen werden", error);
  }
}
