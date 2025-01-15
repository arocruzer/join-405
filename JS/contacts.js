const BASE_URL_zwei = "https://join-405-43178-default-rtdb.europe-west1.firebasedatabase.app/";

let contacts = [];
let loadedContacts = [];

let page = "contacts";



async function loadAllContacts(path=""){
    let response = await fetch (BASE_URL_zwei + path + ".json");
    let responsToJason = await response.json();

    loadedContacts = [];
    const usersArray = (Object.values(responsToJason.users));
    usersArray.forEach((x) => {
        let [vorname, nachname] = x.name.split(" ");
        let initialien = vorname[0] + (nachname ? nachname[0] : "");
        const user = {name: x.name, email: x.email, phone: x.phone, letter: x.name.trim().charAt(0), initialien: initialien};
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
        let initialien = loadedContacts[index].initialien;
        let firstLetter = loadedContacts[index].name.slice(0, 1);
        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            contentRef.innerHTML += renderCurrentLetter(currentLetter);
        }
        const groupElement = document.getElementById(`contact-container-${currentLetter}`);
        groupElement.innerHTML += renderCurrentContacts(index, initialien);
        addBackgrounds();
        
    }
    addContactButtonAdden();
    renderContactDetailPage();
}

function addBackgrounds() {
    const avatars = document.querySelectorAll('.contact-avatar');
    avatars.forEach(avatar => {
        avatar.style.backgroundColor = getRandomColor();
    });
}

function getRandomColor() {
    const colors = ['#6A8EAE','#F4A261', '#2A9D8F', '#E76F51', '#264653', '#A2678A','#457B9D', '#D4A373', '#8A817C', '#BC6C25'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function addContactButtonAdden(){
    let contentRef = document.getElementById('contacts');
    contentRef.innerHTML += `<img onclick="OpenAddContactOverlay()" class="add-contact-button" src="../Assets/Property 1=Default.svg" alt="add_contact" >`;
}

// Open Contact Details

function openContactDetailsOverlay(index){
    console.log(`Kontakt ${index} wurde geklickt!`);
    console.log(loadedContacts[index]);

    if (window.innerWidth < 920) {
        document.getElementById('contacts').classList.add('d-none');
        let contentRef = document.getElementById('contact-details-wrapper-id');
        contentRef.classList.remove('contact-detail-hidden');
        contentRef.innerHTML = HTMLopenContactDetailsOverlay(index);  
    }else{
        let contentRef = document.getElementById('contact-details-wrapper-id');
        contentRef.innerHTML = HTMLopenContactDetailsOverlay(index);  
    } 
}

function closeContactDetailsOverlay(){

    document.getElementById('contacts').classList.remove('d-none');
    let contentRef = document.getElementById('contact-details-wrapper-id');
    contentRef.classList.add('contact-detail-hidden');
    renderContactDetailPage();
}

// Add Contact

function OpenAddContactOverlay(){
    document.getElementById('add-contact-div-overlay-id').classList.remove('d-none');
    document.getElementById('add-contact-div-overlay-id').innerHTML = HTMLOpenAddContactOverlay();
}

function closeAddContactOverlay(){
    document.getElementById('add-contact-div-overlay-id').classList.add('d-none');
}

function addNewContact(){
    let nameInput = document.getElementById('add-input-name-id').value;
    validateName(nameInput);
    let mailInput = document.getElementById('add-input-mail-id').value
    validateEmail(mailInput);
    let phoneInput = document.getElementById('add-input-phone-id').value;
    let [vorname, nachname] = nameInput.split(" ");
    let initialien = vorname[0] + (nachname ? nachname[0] : ""); 

    let newContact = 
        {
            name: nameInput,
            email: mailInput,
            phone: phoneInput,
            letter: vorname[0],
            initialien: initialien
        };
    
    loadedContacts.push(newContact);
    renderContacts();
    closeAddContactOverlay();
}

// Validation Functions

function validateName(name){
    let isValid = true;
    if (!name.includes(" ") || name.split(" ").length < 2) {
        
    }else{
        console.log(isValid);
    }
}

function validateEmail(mail){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = emailRegex.test(mail);

    if(isValid){
        console.log("hi");
    }else{
        console.log("fuck off");
        alert("Mail Falsch");
    }
}



function createContact() {
    if (validateName()) {
      const newContact = gatherContactFormData();
      saveNewContact(newContact)
        .then(() => {
          closeAddContactOverlay();
          renderContacts();
        })
        .catch((error) => {
          console.error("Fehler beim Hinzufügen des Kontakts:", error);
        });
    }
}

function createContact(){
    if(validateName){

    }
}




//Edit Contacts

function openEditContactOverlay(){
    let contentRef = document.getElementById('edit-contact-details-overlay-id');
    contentRef.classList.remove('d-none');
}

function closeEditContactOverlay(){
    let contentRef = document.getElementById('edit-contact-details-overlay-id');
    contentRef.classList.add('d-none');
}

function editContact(index){
    let nameInput = document.getElementById('edit-input-name-id').value;
    let mailInput = document.getElementById('edit-input-mail-id').value
    let phoneInput = document.getElementById('edit-input-phone-id').value;
    let [vorname, nachname] = nameInput.split(" ");
    let initialien = vorname[0] + (nachname ? nachname[0] : "");

    let newContact = 
    {
        name: nameInput,
        email: mailInput,
        phone: phoneInput,
        letter: vorname[0],
        initialien: initialien
    };
    loadedContacts[index] = newContact;

    renderContacts();
    closeEditContactOverlay();
    closeContactDetailsOverlay();
}

function deleteContact(index){
    loadedContacts.splice(index, 1);
    renderContacts();
    // renderContactDetailPage();
    closeEditContactOverlay();
    closeContactDetailsOverlay();
}











// Templates

function renderCurrentLetter(currentLetter){
    return `
    <div class="contacts-section-header">
        <h3>${currentLetter}</h3>
        <div class="seperation-line"></div>
    </div>
    <div class="contacts-container" id="contact-container-${currentLetter}">    
    </div>`;
}

function renderCurrentContacts(index, initialien) {
    return `
        <div class="contact" id="contact-id-${index}" onclick="openContactDetailsOverlay(${index})">
            <div class="contact-avatar">${initialien}</div>
            <div class="contact-avatar-infos">
                <span>${loadedContacts[index].name}</span>
                <a href="mailto:${loadedContacts[index].email}">${loadedContacts[index].email}</a>
            </div>
        </div>
    `;
}

function renderContactDetailPage(){
    let contentRef = document.getElementById('contact-details-wrapper-id');
    contentRef.innerHTML = ``;
    contentRef.innerHTML = `
    <div class="contact-detail-title-wrapper">
                    <div class="page-title">
                        <h1>Contacts</h1>
                        <p>Better with a team</p>
                        <div class="blue-line"></div>
                    </div>
                </div>  
                <div class="edit-contact-details-overlay d-none" id="edit-contact-details-overlay-id">
                </div>
    `;
}

function HTMLopenContactDetailsOverlay(index){
    return`

            <div class="contact-detail-title-wrapper">
                <div class="page-title">
                    <h1>Contacts</h1>
                    <p>Better with a team</p>
                    <div class="blue-line"></div>
                </div>
                <img class="arrow-left-contact-details" src="../Assets/left-arrow-blue.svg" alt="arrow_left" onclick="closeContactDetailsOverlay()">
            </div>  
            <div class="contact-detail-view">
                <div class="contact-avatar-and-name">
                    <div class="detail-contact-avatar">${loadedContacts[index].initialien}</div>
                    <h2>${loadedContacts[index].name}</h2>
                </div>
                <p>Contact Information</p>
                <h5>Email</h5>
                <a href="#">${loadedContacts[index].email}</a>
                <h5>Phone</h5>
                <a href="#">${loadedContacts[index].phone}</a>
            </div>
            <img class="three-points-menu" src="../Assets/threePointsMenu.png" onclick="openEditContactOverlay()" alt="threePointsMenu">
        <div class="edit-contact-details-overlay d-none" id="edit-contact-details-overlay-id">
            <div class="overlay-edit-contact">
                <div class="middle-avatar">TW</div>
                <div class="upper-half">
                    <div class="cross-close" onclick="closeEditContactOverlay()">X</div>
                    <div class="edit-contact-title">
                        <h1>Edit contact</h1>
                        <div class="blue-line"></div>
                    </div>
                </div>
                <div class="lower-half">
                    <div class="input-fields">
                        <input class="input-person" value="${loadedContacts[index].name}" placeholder="Name" type="text" id="edit-input-name-id">
                        <input class="input-mail" value="${loadedContacts[index].email}" placeholder="Email" type="email" id="edit-input-mail-id">
                        <input class="input-phone" value="${loadedContacts[index].phone}" placeholder="Phone" type="tel" id="edit-input-phone-id">
                    </div>
                    <div class="delete-safe-buttons">
                        <button onclick="deleteContact(${index})" class="delete-button">Delete</button>
                        <button onclick="editContact(${index})" class="save-button">Save<i class="fa-sharp-duotone fa-solid fa-check save-padding"></i></button>
                    </div>
                </div>
            </div>
        </div>

    `;
}



function HTMLOpenAddContactOverlay(){
    return`
    <div class="overlay-edit-contact">
        <div class="middle-avatar">TW</div>
            <div class="upper-half">
                <div class="cross-close" onclick="closeAddContactOverlay()">X</div>
                <div class="edit-contact-title">
                    <h1>Add contact</h1>
                    <h6>Tasks are better with a team!</h6>
                    <div class="blue-line"></div>
                </div>
            </div>
            <div class="lower-half">
                <div class="input-fields-add">
                    <input class="input-person" placeholder="Name" type="text" id="add-input-name-id">
                    <input class="input-mail" placeholder="Email" type="email" id="add-input-mail-id">
                    <input class="input-phone" placeholder="Phone" type="tel" id="add-input-phone-id">
                    <button onclick="addNewContact()" class="create-button">Create contact<i class="fa-sharp-duotone fa-solid fa-check"></i></button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function HTMLOpenEditContactOverlay(){
    return`
    <div class="overlay-edit-contact">
            <div class="middle-avatar">TW</div>

            <div class="upper-half">
                <div class="cross-close" onclick="closeEditContactOverlay()">X</div>
                <div class="edit-contact-title">
                    <h1>Edit contact</h1>
                    <div class="blue-line"></div>
                </div>
            </div>
    
            <div class="lower-half">
                <div class="input-fields">
                    <input class="input-person" placeholder="Name" type="text">
                    <input class="input-mail" placeholder="Email" type="email">
                    <input class="input-phone" placeholder="Phone" type="tel">
                </div>
                <div class="delete-safe-buttons">
                    <button class="delete-button">Delete</button>
                    <button class="save-button">Save<i class="fa-sharp-duotone fa-solid fa-check save-padding"></i></button>
                </div>
            </div>
        </div>
    `;
}
