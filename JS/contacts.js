function renderContacts() {
    let contentRef = document.getElementById('contacts');
    if (!contentRef) return;
    contentRef.innerHTML = "";
    loadedContacts.sort((a, b) => a.name.localeCompare(b.name));
    let currentLetter = "";
    for (let index = 0; index < loadedContacts.length; index++) {
        const contact = loadedContacts[index];
        currentLetter = updateCurrentLetter(contact.name, currentLetter, contentRef);
        renderContactGroup(contact, currentLetter, index);
    }
    addBackgrounds();
    renderContactDetailPage();
}

function updateCurrentLetter(name, currentLetter, contentRef) {
    let firstLetter = name.slice(0, 1).toUpperCase();
    if (firstLetter !== currentLetter) {
        currentLetter = firstLetter;
        contentRef.innerHTML += renderCurrentLetter(currentLetter);
    }
    return currentLetter;
}

function renderContactGroup(contact, currentLetter, index) {
    const groupElement = document.getElementById(`contact-container-${currentLetter}`);
    const initialien = contact.initialien.toUpperCase();
    groupElement.innerHTML += renderCurrentContacts(index, initialien);
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

function openContactDetailsOverlay(index){
    const allContacts = document.querySelectorAll('[id^="contact-id-"]');
    allContacts.forEach(contact => {
        contact.classList.remove('darkgray-bg');
    });
    if (window.innerWidth < 1180) {
        document.getElementById('contacts').classList.add('d-none');
        let contentRef = document.getElementById('contact-details-wrapper-id');
        contentRef.classList.remove('contact-detail-hidden');
        contentRef.innerHTML = HTMLopenContactDetailsOverlayMobile(index);  
        let content = document.getElementById('edit-contact-details-overlay-id');
        content.innerHTML = HTMLEditOverlay(index);
    }else{
        let contentRef = document.getElementById('contact-details-wrapper-id');
        contentRef.innerHTML = HTMLopenContactDetailsOverlay(index);  
        let content = document.getElementById('edit-contact-details-overlay-id');
        content.innerHTML = HTMLEditOverlayDesktop(index);
    } 
    document.getElementById(`contact-id-${index}`).classList.add('darkgray-bg');
}

function closeContactDetailsOverlay(){
    document.getElementById('contacts').classList.remove('d-none');
    let contentRef = document.getElementById('contact-details-wrapper-id');
    contentRef.classList.add('contact-detail-hidden');
    renderContactDetailPage();
    const allContacts = document.querySelectorAll('[id^="contact-id-"]');
    allContacts.forEach(contact => {
        contact.classList.remove('darkgray-bg');
    });
}

function OpenAddContactOverlay(){
    document.getElementById('add-contact-div-overlay-id').classList.remove('d-none');
    if(window.innerWidth <1180){
        document.getElementById('add-contact-div-overlay-id').innerHTML = HTMLOpenAddContactOverlay();
    }else{
        document.getElementById('add-contact-div-overlay-id').innerHTML = HTMLOpenAddContactOverlayDesktop();
    }
}

function closeAddContactOverlay(){
    document.getElementById('add-contact-div-overlay-id').classList.add('d-none');
}

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
        startAnimation();
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

function startAnimation() {
    const flyingDiv = document.getElementById('flying-div-id');
    flyingDiv.classList.remove('d-none', 'disappear');
    setTimeout(() => {
        flyingDiv.classList.add('visible');
    }, 10);

    setTimeout(() => {
        flyingDiv.classList.remove('visible');
        flyingDiv.classList.add('disappear');

        setTimeout(() => {
            flyingDiv.classList.add('d-none');
        }, 500); 
    }, 3000);
}

function showEditDeleteDiv(){
    const contentRef = document.getElementById('edit-delete-div-id');
    contentRef.classList.remove('d-none');
}

function hideEditDeleteDiv(){
    const contentRef = document.getElementById('edit-delete-div-id');
    contentRef.classList.add('d-none');
}