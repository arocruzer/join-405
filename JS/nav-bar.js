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