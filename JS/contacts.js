function renderContacts(){
    let contentRef = document.getElementById('contacts');
    if (contentRef) {
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
    renderContactDetailPage();
}
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

// Open Contact Details

function openContactDetailsOverlay(index){
    console.log(`Kontakt ${index} wurde geklickt!`);
    console.log(loadedContacts[index]);

    if (window.innerWidth < 950) {
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
