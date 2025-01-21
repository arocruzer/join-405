function renderAddToTaskContacts(color, initials, user, index, isChecked) {
  return `<div class="contact">
                <div class="name-and-img">
                    <div class="initials-circle" style="background-color: ${color};">
                        ${initials}
                    </div>
                    <p>${user.name}</p>
                </div>
                <input onclick="checkBoxUserTask(${index})" type="checkbox" ${isChecked} name="checkbox">
            </div>`;
}
function renderAddedUsers(color, initials) {
  return `
            <div class="initials-circle" style="background-color: ${color};">
                ${initials}
            </div>`;
}

function regardsGastTemplate(greeting, userName) {
  return `<h2>${greeting}</h2> <h1>${userName}</h1>`;
}

function regardsUserTemplate(greeting, userName) {
    return `<h2>${greeting},</h2> <h1>${userName}</h1>`;
}

function renderUserLogo(initials, color, user) {
    return `<div>
                <div class="name-and-img">
                    <div class="initials-circle-logo">
                        <h3>${initials}</h3>
                    </div>
                </div>
            </div>`;
}

//Contacts-Functions

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
        <div class="page-title-desktop">
            <h1>Contacts</h1>
            <div class="blue-line-desktop"></div>
            <p>Better with a team</p>  
        </div>
    </div>  
    <div class="edit-contact-details-overlay d-none" id="edit-contact-details-overlay-id"></div>
    `;
}

function HTMLopenContactDetailsOverlayMobile(index){
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
        <div class="three-points-menu-div">
            <img class="three-points-menu" src="../Assets/threePointsMenu.png" onclick="openEditContactOverlay()" alt="threePointsMenu">
        </div>
    `;
}

function HTMLopenContactDetailsOverlay(index){
    return`
    <div class="contact-detail-title-wrapper">
        <div class="page-title-desktop">
            <h1>Contacts</h1>
            <div class="blue-line-desktop"></div>
            <p>Better with a team</p>  
        </div>
        <img class="arrow-left-contact-details" src="../Assets/left-arrow-blue.svg" alt="arrow_left" onclick="closeContactDetailsOverlay()">
    </div>  
    <div class="contact-detail-view">
        <div class="contact-avatar-and-name">
          <div class="detail-contact-avatar">${loadedContacts[index].initialien}</div>
          <div class="detail-name-div">
            <h2>${loadedContacts[index].name}</h2>
            <div class="edit-delete-button-div-desktop">
              <div class="edit-button-desktop" onclick="openEditContactOverlay()">
                <img class="edit-img-blue" src="../Assets/edit.svg" alt="Edit_SVG">
                <p>Edit</p>
              </div>
              <div class="delete-button-desktop" onclick="deleteContact(${index})">
                <img class="delete-img-blue" src="../Assets/delete.svg" alt="delete_SVG">
                <p>Delete</p>
              </div>
            </div>
          </div>  
        </div>
        <p>Contact Information</p>
        <h5>Email</h5>
        <a href="#">${loadedContacts[index].email}</a>
        <h5>Phone</h5>
        <a href="#">${loadedContacts[index].phone}</a>
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
                <input class="input-layout input-person" placeholder="Name" type="text" id="add-input-name-id">
                <div id="name-error" class="input-layout error-message"></div>
                <input class="input-layout input-mail" placeholder="Email" type="email" id="add-input-mail-id">
                <div id="mail-error" class="input-layout error-message"></div>
                <input class="input-layout input-phone" placeholder="Phone" type="tel" id="add-input-phone-id">
                <div id="phone-error" class="input-layout error-message"></div>
                <button onclick="addNewContact()" class="create-button">Create contact<i class="fa-sharp-duotone fa-solid fa-check"></i></button>
            </div>
        </div>
    </div>
    `;
}

// function HTMLOpenEditContactOverlay(){
//     return`
//     <div class="overlay-edit-contact">
//             <div class="middle-avatar">TW</div>
//             <div class="upper-half">
//                 <div class="cross-close" onclick="closeEditContactOverlay()">X</div>
//                 <div class="edit-contact-title">
//                     <h1>Edit contact</h1>
//                     <div class="blue-line"></div>
//                 </div>
//             </div>
//             <div class="lower-half">
//                 <div class="input-fields">
//                     <input class="input-person" placeholder="Name" type="text">
//                     <input class="input-mail" placeholder="Email" type="email">
//                     <input class="input-phone" placeholder="Phone" type="tel">
//                 </div>
//                 <div class="delete-safe-buttons">
//                     <button class="delete-button">Delete</button>
//                     <button class="save-button">Save<i class="fa-sharp-duotone fa-solid fa-check save-padding"></i></button>
//                 </div>
//             </div>
//         </div>
//     `;
// }

// function HTMLOpenEditContactOverlayDesktop(index){
//     return`
//     <div class="overlay-edit-contact">
//         <div class="middle-avatar">TW</div>
//         <div class="upper-half">
//             <div class="cross-close" onclick="closeEditContactOverlay()">X</div>
//             <div class="edit-contact-title">
//                 <h1>Edit contact</h1>
//                 <div class="blue-line"></div>
//             </div>
//         </div>
//         <div class="lower-half-edit">
//             <div class="input-fields-add">
//                 <input class="input-layout input-person" value="${loadedContacts[index].name}" placeholder="Name" type="text" id="edit-input-name-id">
//                 <div id="name-error-id" class="input-layout error-message"></div>
//                 <input class="input-layout input-mail" value="${loadedContacts[index].email}" placeholder="Email" type="email" id="edit-input-mail-id">
//                 <div id="mail-error-id" class="input-layout error-message"></div>
//                 <input class="input-layout input-phone" value="${loadedContacts[index].phone}" placeholder="Phone" type="tel" id="edit-input-phone-id">
//                 <div id="phone-error-id" class="input-layout error-message"></div>
//                 <div class="delete-safe-buttons">
//                     <button onclick="deleteContact(${index})" class="delete-button">Delete</button>
//                     <button onclick="editContact(${index})" class="save-button">Save<i class="fa-sharp-duotone fa-solid fa-check save-padding"></i></button>
//                 </div>
//             </div>
//         </div>
//     </div>
// `;
// }

function getSubtasksTemplate(subtask, index) {
    return `
        <div class="subtask-label" id="subtask-label-${index}">
            <ul id="subtask-list">
                <li>
                    <div class="subtask">
                        <div>
                            <input id="edit-subtask-${index}" class="edit-subtask" type="text" value="${subtask}" onfocus="editSubtask(${index})">
                        </div>
                        <div class="images-container" id="images-container-${index}">
                            <img class="edit-subtask-img" id="edit-subtask-img-${index}" onclick="editSubtask(${index})" src="../Assets/edit.png" alt="Edit Icon">
                            <img class="confirm-subtask" id="confirm-subtask-${index}" onclick="confirmSubtask(${index})" src="../Assets/check_blue.png" style="display: none;">
                            <button class="delete-btn" onclick="deleteSubtask(${index})">
                                <img id="delete-subtask-${index}" src="../Assets/delete.png" alt="delete Icon">
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>`;
}

function HTMLEditOverlay(index){
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
            <div class="lower-half-edit">
                <div class="input-fields-add">
                    <input class="input-layout input-person" value="${loadedContacts[index].name}" placeholder="Name" type="text" id="edit-input-name-id">
                    <div id="name-error-id" class="input-layout error-message"></div>
                    <input class="input-layout input-mail" value="${loadedContacts[index].email}" placeholder="Email" type="email" id="edit-input-mail-id">
                    <div id="mail-error-id" class="input-layout error-message"></div>
                    <input class="input-layout input-phone" value="${loadedContacts[index].phone}" placeholder="Phone" type="tel" id="edit-input-phone-id">
                    <div id="phone-error-id" class="input-layout error-message"></div>
                    <div class="delete-safe-buttons">
                        <button onclick="deleteContact(${index})" class="delete-button">Delete</button>
                        <button onclick="editContact(${index})" class="save-button">Save<i class="fa-sharp-duotone fa-solid fa-check save-padding"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `;
}