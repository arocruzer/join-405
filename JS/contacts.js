window.addEventListener("resize", function(){
    if(window.innerWidth > 1180){
        renderContacts();
    }
});

function renderContacts(){
    let contentRef = document.getElementById('contacts');
    if (contentRef) {
    contentRef.innerHTML = "";
    let currentLetter = "";
    loadedContacts.sort((a, b) => a.name.localeCompare(b.name));
    for (let index = 0; index < loadedContacts.length; index++) {
        let initialien = loadedContacts[index].initialien.toUpperCase();
        let firstLetter = loadedContacts[index].name.slice(0, 1).toUpperCase();
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

    if (window.innerWidth < 1180) {
        document.getElementById('contacts').classList.add('d-none');
        let contentRef = document.getElementById('contact-details-wrapper-id');
        contentRef.classList.remove('contact-detail-hidden');
        contentRef.innerHTML = HTMLopenContactDetailsOverlayMobile(index);  
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

// Validation Functions

function addNewContact(){
    
    let nameInput = document.getElementById('add-input-name-id').value;
    let mailInput = document.getElementById('add-input-mail-id').value
    let phoneInput = document.getElementById('add-input-phone-id').value

    let isValid = validateName(nameInput) && validateEmail(mailInput) && validatePhone(phoneInput);
    
    if (isValid){
        let newContact = createNewContact(nameInput, mailInput, phoneInput);
        loadedContacts.push(newContact);
        renderContacts();
        closeAddContactOverlay();
    }return;
}

function validateName(name){
    const nameRegex = /^[a-zA-ZäöüßÄÖÜ\s]+$/;
    const nameError = document.getElementById('name-error');
    nameError.innerHTML = "";
    if (!nameRegex.test(name)) {
      nameError.innerHTML = "Bitte einen gültigen Namen eingeben"
      return false;
    } else {
        return true;
    }
}

function validateEmail(mail){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailError = document.getElementById('mail-error');
    mailError.innerHTML = "";
    if(!emailRegex.test(mail)){
        mailError.innerHTML = "ungültiges Email Format";
        return false;
    } return true;
}

function validatePhone(phonenumber){
    const phoneError = document.getElementById('phone-error');
    const digitCount = Math.abs(phonenumber).toString().length;
    phoneError.innerHTML = "";

    if(digitCount < 8){
        phoneError.innerHTML = "ungültige Telefonnummer";
        return false;
    } return true;
}

function createNewContact(name, mail, phone){
    let [vorname, nachname] = name.split(" ");
    let initialien = vorname[0] + (nachname ? nachname[0] : ""); 

    let newContact = 
    {
        name: name,
        email: mail,
        phone: phone,
        letter: vorname[0].toUpperCase(),
        initialien: initialien
    }
    return newContact;
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

    let isValid = validateEditName(nameInput) && validateEditEmail(mailInput) && validateEditPhone(phoneInput);

    if (isValid) {
        let editedContact = createNewContact(nameInput, mailInput, phoneInput);
        loadedContacts[index] = editedContact;
        renderContacts();
        closeEditContactOverlay();
        closeContactDetailsOverlay();
    } return

}

function validateEditName(name){
    const nameRegex = /^[a-zA-ZäöüßÄÖÜ\s]+$/;
    const nameError = document.getElementById('name-error-id');
    nameError.innerHTML = "";
    if (!nameRegex.test(name)) {
      nameError.innerHTML = "Bitte einen gültigen Namen eingeben"
      return false;
    } else {
        return true;
    }
}

function validateEditEmail(mail){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailError = document.getElementById('mail-error-id');
    mailError.innerHTML = "";
    if(!emailRegex.test(mail)){
        mailError.innerHTML = "ungültiges Email Format";
        return false;
    } return true;
}

function validateEditPhone(phonenumber){
    const phoneError = document.getElementById('phone-error-id');
    const digitCount = Math.abs(phonenumber).toString().length;
    phoneError.innerHTML = "";

    if(digitCount < 8){
        phoneError.innerHTML = "ungültige Telefonnummer";
        return false;
    } return true;
}

function deleteContact(index){
    loadedContacts.splice(index, 1);
    renderContacts();
    closeEditContactOverlay();
    closeContactDetailsOverlay();
}
