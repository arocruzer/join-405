const BASE_URL = "https://join-405-43178-default-rtdb.europe-west1.firebasedatabase.app/users";
let users = [];
let email = document.getElementById("email");
let password = document.getElementById("password");
let userName = document.getElementById("name");
let repeatPassword = document.getElementById("repeat-password");
let repeatPasswordError = document.getElementById("repeat-password-error");
let passwordError = document.getElementById("password-error");
let showPasswordImg = document.getElementById("show-password-img");
let showRepeatPasswordImg = document.getElementById("show-repeat-password-img");

function init() {
  /* await includeHTML(); */
  loadData();
}

async function loadData() {
  let response = await fetch(BASE_URL + ".json");
  let data = await response.json();
  
  users = Object.values(data);
}

function changePasswordImg() {
  if (password && password.value) {
    showPasswordImg.src = "./Assets/visibility_off.png";
    showPasswordImg.style.cursor = "pointer";
  } else if (showPasswordImg) {
    showPasswordImg.src = "./Assets/lock.png";
    showPasswordImg.style.cursor = "default";
  }

  if (repeatPassword && repeatPassword.value && showRepeatPasswordImg) {
    showRepeatPasswordImg.src = "./Assets/visibility_off.png";
    showRepeatPasswordImg.style.cursor = "pointer";
  } else if (showRepeatPasswordImg) {
    showRepeatPasswordImg.src = "./Assets/lock.png";
    showRepeatPasswordImg.style.cursor = "default";
  }
}

function showPassword() {
  if (password && password.type === "password" && password.value.length >= 1) {
    password.type = "text";
    showPasswordImg.src = "./Assets/visibility.png";
  } else if (password && password.value.length >= 1) {
    password.type = "password";
    showPasswordImg.src = "./Assets/visibility_off.png";
  }

  if (repeatPassword && repeatPassword.type === "password" && repeatPassword.value.length >= 1) {
    repeatPassword.type = "text";
    showRepeatPasswordImg.src = "./Assets/visibility.png";
  } else if (repeatPassword && repeatPassword.value.length >= 1) {
    repeatPassword.type = "password";
    showRepeatPasswordImg.src = "./Assets/visibility_off.png";
  }
}

async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("w3-include-html"); // "includes/*.html"
      let resp = await fetch(file);
      if (resp.ok) {
          element.innerHTML = await resp.text();
      } else {
          element.innerHTML = 'Page not found';
      }
  }
}

async function loadContent(page) {
  console.log(page);
  let element = document.getElementById("main-content");
  let resp = await fetch("./HTML/" + page + ".html");
  if (resp.ok) {
      element.innerHTML = await resp.text();
  } else {
      element.innerHTML = 'Page not found';
  }
}
