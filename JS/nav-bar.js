function loadHTML() {

}

async function loadLegalDocument(page) {
    const response = await fetch('../HTML/legal-notice.html');
    const htmlContent = await response.text();

    document.getElementById("main-content").innerHTML = /*html*/`
        ${htmlContent}
    `;
}