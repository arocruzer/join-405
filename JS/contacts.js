let contacts = [];
let loadedContacts = [];

const BASE_URL = "https://join-405-43178-default-rtdb.europe-west1.firebasedatabase.app/";

async function loadAllContacts(path=""){
    let response = await fetch (BASE_URL + path + ".json");
    let responsToJason = await response.json();

    loadedContacts = [];
    const usersArray = (Object.values(responsToJason.users));
    usersArray.forEach((x) => {
        const user = {name: x.name, email: x.email, letter: x.name.trim().charAt(0)};
        loadedContacts.push(user);   
    });
    renderContacts(loadedContacts);
}

function renderContacts(){
    let contentRef = document.getElementById('contacts');
    contentRef.innerHTML = "";
    let currentLetter = "";
    loadedContacts.sort((a, b) => a.name.localeCompare(b.name));

    for (let index = 0; index < loadedContacts.length; index++) {
        let [vorname, nachname] = loadedContacts[index].name.split(" ");
        let initialien = vorname[0] + nachname[0];
        let firstLetter = loadedContacts[index].name.slice(0, 1);
        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            contentRef.innerHTML += renderCurrentLetter(currentLetter);
        }
        const groupElement = document.getElementById(`contact-container-${currentLetter}`);
        if (groupElement) {
            groupElement.innerHTML += renderCurrentContacts(index, initialien, vorname, nachname, );
            // setUserTagColor(vorname, nachname, i);
        } else {
            console.warn(`Gruppe mit der ID 'contact-container-${currentLetter}' wurde nicht gefunden.`);
        }
    }
}

function renderCurrentLetter(currentLetter){
    console.log(currentLetter);
    return `
    <div class="contacts-section-header">
        <h3>${currentLetter}</h3>
        <div class="seperation-line"></div>
    </div>
    <div class="contacts-container" id="contact-container-${currentLetter}">
        
    </div>`;
}

function renderCurrentContacts(index, initialien){
    return`
    <div class="contact" id="contact-id-${index} onclick="openContactDetails()">
            <div class="contact-avatar">${initialien}</div>
            <div class="contact-avatar-infos">
                <span>${loadedContacts[index].name}</span>
                <a href="#">${loadedContacts[index].email}</a>
            </div>
        </div>            
    `
}

function openContactDetails(){
    console.log("Hi");
}