async function loadLegalDocumentUsrMenu(htmlPage) {
    const response = await fetch('../HTML/' + htmlPage + '.html');
    const htmlContent = await response.text();

    document.getElementById("main-content").innerHTML = /*html*/`
        ${htmlContent}
    `;
    toggleUsrMenu();
}

async function loadLegalDocument(htmlPage) {
    const response = await fetch('../HTML/' + htmlPage + '.html');
    const htmlContent = await response.text();

    document.getElementById("main-content").innerHTML = /*html*/`
        ${htmlContent}
    `;
}

function inOrOut() {
    let status = JSON.parse(localStorage.getItem("loggedInUser"));
    navBar = document.getElementById("frame-nav-bar");
    menu = document.getElementById("menu");
    logIn = document.getElementById("log-in");
    legalDocuments = document.getElementById("legal-documents");
    headerRight = document.getElementById("header-right");
  
    if (status) {
      navBar.className = "frame-nav-bar-logged-in";
      menu.className = "menu-logged-in";
      logIn.className = "log-in-logged-in";
      legalDocuments.className = "legal-documents-logged-in";
      headerRight.className = "header-right-logged-in";
    }
  }