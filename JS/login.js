const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get("msg");
let msgBox = document.getElementById("msgBox");
let hero = document.getElementById("body");

function logIn() {
  let emailError = document.getElementById("email-error");
  let passwordError = document.getElementById("password-error");

  emailError.innerHTML = "";
  passwordError.innerHTML = "";

  let user = loadedContacts.find((u) => u.email === email.value);

  if (user) {
      if (user.password === password.value) {
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          window.location.href = "../HTML/summary.html";
          
          email.value = "";
          password.value = "";
      } else {
          passwordError.style.display = "flex";
          passwordError.innerHTML = "Check your email and password. Please try again.";
      }
  } else {
    emailError.style.display = "flex"
      emailError.innerHTML = "User not found. Please check your email.";
  }
}

if (msg) {
  msgBox.innerHTML = msg;
} else {
  msgBox.style.display = "none";
}

hero.onclick = function () {
  msgBox.style.display = "none";
};
