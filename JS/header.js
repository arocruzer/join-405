function toggleUsrMenu() {
  document.getElementById("usr-menu").classList.toggle('usr-menu-closed');
  document.getElementById("ar-overlay").classList.toggle('ar-overlay-closed');
}

function logOut() {
  // localStorage.clear();

  localStorage.removeItem('loggedInUser');
}
