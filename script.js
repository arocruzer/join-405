const BASE_URL = "https://join-405-43178-default-rtdb.europe-west1.firebasedatabase.app/";
let loadedContacts = [];
let loadedTasks = [];
let email = document.getElementById("email");
let password = document.getElementById("password");
let userName = document.getElementById("name");
let repeatPassword = document.getElementById("repeat-password");
let repeatPasswordError = document.getElementById("repeat-password-error");
let passwordError = document.getElementById("password-error");
let showPasswordImg = document.getElementById("show-password-img");
let showRepeatPasswordImg = document.getElementById("show-repeat-password-img");
let regardsUser = document.getElementById("regardsUser");

async function init() {
  await includeHTML();
  await loadAllContacts();
  getUserLogo();
  inOrOut();
}


async function loadAllContacts(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  let responsToJason = await response.json();

  loadedContacts = [];
  const usersArray = Object.values(responsToJason.users);
  usersArray.forEach((x) => {
    let [vorname, nachname] = x.name.split(" ");
    let initialien = vorname[0] + (nachname ? nachname[0] : "");
    const user = {
      color: x.color,
      name: x.name,
      email: x.email,
      password: x.password,
      phone: x.phone,
      letter: x.name.trim().charAt(0),
      initialien: initialien,
    };
    loadedContacts.push(user);
  });
  if (typeof renderContacts === "function") {
    renderContacts(contacts);
  }
}

async function loadAllTasks(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  let responsToJason = await response.json();

  let task = Object.values(responsToJason.tasks);
  task.forEach((i) => {
    const tasks = {
      id: i.id,
      title: i.title,
      category: i.category,
      description: i.description,
      dueDate: i.dueDate,
      priority: i.priority,
      subtasks: i.subtasks,
      assignedUsers: i.assignedUsers,
    };
    loadedTasks.push(tasks);
  });
}

function changePasswordImg() {
  if (password && password.value) {
    showPasswordImg.src = "../Assets/visibility_off.png";
    showPasswordImg.style.cursor = "pointer";
  } else if (showPasswordImg) {
    showPasswordImg.src = "../Assets/lock.png";
    showPasswordImg.style.cursor = "default";
  }

  if (repeatPassword && repeatPassword.value && showRepeatPasswordImg) {
    showRepeatPasswordImg.src = "../Assets/visibility_off.png";
    showRepeatPasswordImg.style.cursor = "pointer";
  } else if (showRepeatPasswordImg) {
    showRepeatPasswordImg.src = "../Assets/lock.png";
    showRepeatPasswordImg.style.cursor = "default";
  }
}

function showPassword() {
  if (password && password.type === "password" && password.value.length >= 1) {
    password.type = "text";
    showPasswordImg.src = "../Assets/visibility.png";
  } else if (password && password.value.length >= 1) {
    password.type = "password";
    showPasswordImg.src = "../Assets/visibility_off.png";
  }
}

function showRepeatPassowrd() {
  if (
    repeatPassword &&
    repeatPassword.type === "password" &&
    repeatPassword.value.length >= 1
  ) {
    repeatPassword.type = "text";
    showRepeatPasswordImg.src = "../Assets/visibility.png";
  } else if (repeatPassword && repeatPassword.value.length >= 1) {
    repeatPassword.type = "password";
    showRepeatPasswordImg.src = "../Assets/visibility_off.png";
  }
}
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/*.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
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
    element.innerHTML = "Page not found";
  }
}

function getUserLogo() {
  let userLogo = document.getElementById("user-button");
  let user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    return;
  }

  let initials = user.initialien;
  let color = user.color || "#3498db";

  if (userLogo) {
    userLogo.innerHTML = renderUserLogo(initials, color, user);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const isAnimationShown = localStorage.getItem("welcomeAnimationShown");
  const animationDiv = document.getElementById("animation");

  if (!animationDiv) {
    return;
  }

  if (!isAnimationShown) {
    setTimeout(() => {
      animationDiv.style.display = "none";
      localStorage.setItem("welcomeAnimationShown", "true");
    }, 2000);
  } else {
    animationDiv.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let isMobile = window.innerWidth <= 830;
  let isAnimationShowSummary = localStorage.getItem("welcomeAnimationShowSummary");
  let regardDiv = document.getElementById("regardsUser");
  if (!regardDiv) {
    return;
  }

  if (isMobile) {
    if (!isAnimationShowSummary) {
      setTimeout(() => {
        regardDiv.style.display = "none";
        localStorage.setItem("welcomeAnimationShowSummary", "true");
      }, 2000);
    } else {
      regardDiv.style.display = "none";
    }
  }
});