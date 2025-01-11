async function loadLegalDocument(page) {
    const response = await fetch('../HTML/' + page + '.html');
    const htmlContent = await response.text();

    document.getElementById("main-content").innerHTML = /*html*/`
        ${htmlContent}
    `;
}