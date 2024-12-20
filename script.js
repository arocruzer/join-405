const BASE_URL = "https://join-405-43178-default-rtdb.europe-west1.firebasedatabase.app/users";
let users = [];

function init() {
    loadData();
}

async function loadData() {
    let response = await fetch(BASE_URL + ".json");
    let data = await response.json();
    users.push(data);
}