function checkSignUp() {
  let password = document.getElementById("password");
  let repeatPassword = document.getElementById("repeat-password");
  let passwordError = document.getElementById("password-error");
  let repeatPasswordError = document.getElementById("repeat-password-error");
  let userNameError = document.getElementById("name-error")

  passwordError.innerHTML = "";
  repeatPasswordError.innerHTML = "";
  if (userName.value.length === 0) {
    userNameError.style.display = "flex";
    userNameError.innerHTML = "Please enter your name"
  }

  if (password.value.length < 8) {
    passwordError.style.display = "flex";
    passwordError.innerHTML = "Password must have at least 8 characters.";
    return false;
  }

  if (password.value !== repeatPassword.value) {
    repeatPasswordError.style.display = "flex";
    repeatPasswordError.innerHTML = "Your passwords don't match. Please try again.";
    return false;
  }

  return true;
}

function addUser() {
  const newUser = {
    name: userName.value,
    email: email.value,
    password: password.value,
    phone: "",
    color: colors[Object.keys(loadedContacts).length % colors.length], 
  };

  postUser(newUser);

  email.value = "";
  password.value = "";
  userName.value = "";
  repeatPassword.value = "";
}

function allowSignup() {
  let userName = document.getElementById("name");
  let email = document.getElementById("email");
  let checkbox = document.getElementById("checkbox");
  let signupBtn = document.getElementById("signup");

  if (
    userName.value.trim().length > 1 && email.value.includes("@") && checkbox.checked && checkSignUp()) {
    signupBtn.style.backgroundColor = "#2a3647"; 
    signupBtn.style.border = "solid #2a3647";
    signupBtn.disabled = false;
  }else{
    signupBtn.style.backgroundColor = " #f7f7f7"; 
    signupBtn.style.border = "solid #f7f7f7";
    signupBtn.disabled = true;
  }
}

async function postUser(newUser) {
  try {
    let response = await fetch(`${BASE_URL}/users.json`);

    const users = await response.json();
    const userCount = users ? Object.keys(users).length : 0;
    const userId = `user${userCount + 1}`;

    response = await fetch(`${BASE_URL}/users/${userId}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  } catch (error) {
    console.error("Benutzer konnte nicht geladen werden", error);
  }
  signUpMsg();
}

function signUpMsg() {
  let msgContainer = document.getElementById("signup-msg");

    msgContainer.style.display = "flex";
    setTimeout(() => {
      msgContainer.style.display = "none";
      window.location.href = "/index.html";
    }, 2000); 
}
