async function loadLegalDocument(htmlPage) {
    const response = await fetch('../HTML/' + htmlPage + '.html');
    const htmlContent = await response.text();

    document.getElementById("main-content").innerHTML = /*html*/`
        ${htmlContent}
    `;

    let page = htmlPage;
    console.log(page);
}