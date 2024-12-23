async function init() {
    await includeHTML();
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


// const BASE_URL = "https://join-405-43178-default-rtdb.europe-west1.firebasedatabase.app/";


// function init() {
//     loadData();
// }

// async function loadData(path="") {
//     let respons = await fetch(BASE_URL + path + ".json"); //+".json" muss immer damit man Datenbank finden kann
//     let responsToJason = await respons.json();
//     console.log(responsToJason.users);
// }
