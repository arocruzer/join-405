
const BASE_URL = "https://join-405-43178-default-rtdb.europe-west1.firebasedatabase.app/";


function init() {
    loadData();
}

async function loadData(path="") {
    let respons = await fetch(BASE_URL + path + ".json"); //+".json" muss immer damit man Datenbank finden kann
    let responsToJason = await respons.json();  
    console.log(responsToJason.users.user1.email);
}