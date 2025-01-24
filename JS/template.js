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
            <img class="three-points-menu" src="../Assets/threePointsMenu.png" onclick="showEditDeleteDiv()" alt="threePointsMenu">
            <div class="edit-delete-div d-none" id="edit-delete-div-id">
                <div class="edit-delete-flex-div" onclick="openEditContactOverlay()">
                    <img src="../Assets/edit.svg" alt="">
                    <span>Edit</span>
                </div>
                <div class="edit-delete-flex-div" onclick="deleteContact(${index})">
                    <img src="../Assets/delete.svg" alt="">
                    <span>Delete</span>
                </div>
            </div>
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

function HTMLOpenAddContactOverlayDesktop(){
    return`
    <div class="overlay-edit-contact-desktop">
        <div class="middle-avatar-desktop gray-bg"><img src="../Assets/person.svg" alt=""></div>
        <div class="left-part">
            <div class="edit-contact-title-desktop">
                <img src="../Assets/Capa 2.svg" alt="Join">
                <h1>Add contact</h1>
                <h2>Tasks are better with a team!</h2>
                <div class="blue-line"></div>
            </div>
        </div>
        <div class="right-part">
            <img onclick="closeAddContactOverlay()" class="close-cross-desktop" src="../Assets/close.svg" alt="">
            <div class="input-fields-desktop">
                <input class="input-layout-desktop input-person" placeholder="Name" type="text" id="add-input-name-id">
                <div id="name-error" class="input-layout error-message"></div>
                <input class="input-layout-desktop input-mail" placeholder="Email" type="email" id="add-input-mail-id">
                <div id="mail-error" class="input-layout error-message"></div>
                <input class="input-layout-desktop input-phone" placeholder="Phone" type="tel" id="add-input-phone-id">
                <div id="phone-error" class="input-layout error-message"></div>
                <div class="delete-save-buttons-desktop">
                    <button onclick="closeAddContactOverlay()" class="overlay-cancel-button-desktop">Cancel x</button>
                    <button onclick="addNewContact()" class="overlay-create-button-desktop">Create Contact  <img src="../Assets/check.svg" alt=""><i class="fa-sharp-duotone fa-solid fa-check save-padding"></i></button>
                </div>
            </div>
        </div>
    </div>`;
}

function getSubtasksTemplate(subtask, index) {
    return `
        <div class="subtask-label" id="subtask-label-${index}">
            <ul id="subtask-list-${index}">
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
            <div class="middle-avatar">${loadedContacts[index].initialien}</div>
            <div class="upper-half">
                <div class="cross-close" onclick="closeEditContactOverlay(${index})">X</div>
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

function HTMLEditOverlayDesktop(index){
    return`
    <div class="overlay-edit-contact-desktop">
        <div class="middle-avatar-desktop">${loadedContacts[index].initialien}</div>
        <div class="left-part">
            <div class="edit-contact-title-desktop">
                <img src="../Assets/Capa 2.svg" alt="Join">
                <h1>Edit contact</h1>
                <div class="blue-line"></div>
            </div>
        </div>
        <div class="right-part">
        <img onclick="closeEditContactOverlay(${index})" class="close-cross-desktop" src="../Assets/close.svg" alt="">
            <div class="input-fields-desktop">
                <input class="input-layout-desktop input-person" value="${loadedContacts[index].name}" placeholder="Name" type="text" id="edit-input-name-id">
                <div id="name-error-id" class="input-layout error-message"></div>
                <input class="input-layout-desktop input-mail" value="${loadedContacts[index].email}" placeholder="Email" type="email" id="edit-input-mail-id">
                <div id="mail-error-id" class="input-layout error-message"></div>
                <input class="input-layout-desktop input-phone" value="${loadedContacts[index].phone}" placeholder="Phone" type="tel" id="edit-input-phone-id">
                <div id="phone-error-id" class="input-layout error-message"></div>
                <div class="delete-save-buttons-desktop">
                    <button onclick="deleteContact()" class="overlay-delete-button-desktop">Delete</button>
                    <button onclick="editContact()" class="overlay-save-button-desktop">Save<i class="fa-sharp-duotone fa-solid fa-check save-padding"></i></button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function renderTask(task) {
    const categoryClass = task.category === "Technical Task" ? "technical-task" : "user-story";
    let priorityIcon;
    switch (task.priority.toLowerCase()) {
        case "low":
            priorityIcon = "../Assets/prio_low.png";
            break;
        case "medium":
            priorityIcon = "../Assets/prio_medium_orang.png";
            break;
        case "urgent":
            priorityIcon = "../Assets/prio_urgent.png";
            break;
        default:
            priorityIcon = "";
    }

    // Limit displayed users to 4 and calculate remaining
    const maxDisplayedUsers = 4;
    const displayedUsers = task.assignedUsers.slice(0, maxDisplayedUsers);
    const remainingUsersCount = task.assignedUsers.length - maxDisplayedUsers;

    const usersHtml = displayedUsers.map(user => {
        const nameParts = user.name.split(' ');
        const initials = nameParts.length > 1
            ? nameParts[0][0] + nameParts[1][0]
            : nameParts[0][0];
        return `<div class="user-avatar" style="background-color: ${user.color};">${initials.toUpperCase()}</div>`;
    }).join('');

    // Add "+N" circle for remaining users
    const remainingUsersHtml = remainingUsersCount > 0
        ? `<div class="user-avatar remaining-users-circle">+${remainingUsersCount}</div>`
        : '';

    return `
        <div class="user-card" draggable="true" id="${task.id}" ondragstart="drag(event)" onclick="openTaskDetails('${task.id}')">
            <div class="user-story-card todo">
                <div class="progress-container">
                    <h3 class="category-label ${categoryClass}">${task.category}</h3>
                </div>
                <h4>${task.title}</h4>
                <p>${task.description}</p>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${task.totalSubtasks > 0 ? (task.completedSubtasks / task.totalSubtasks) * 100 : 0}%"></div>
                    </div>
                    <span class="subtasks">${task.completedSubtasks}/${task.totalSubtasks} Subtasks</span>
                </div>
                <div class="user-container">
                    <div class="user-avatar-container">
                        ${usersHtml}
                        ${remainingUsersHtml}
                    </div>
                    <p>${priorityIcon ? `<img src="${priorityIcon}" alt="${task.priority} Priority">` : task.priority}</p>
                </div>
            </div>
        </div>
    `;
}


function generatePriorityButtons(currentPriority) {
    return `
        <div class="prio-btn-container">
            <button 
                id="btn-urgent" 
                class="btn-prio-urgent ${currentPriority === 'urgent' ? 'active' : ''}" 
                onclick="changeColorPrioBtn('urgent')">
                Urgent
                <img id="urgent-img" src="../Assets/prio_urgent.png" alt="Urgent" />
            </button>
            <button 
                id="btn-medium" 
                class="btn-prio-medium ${currentPriority === 'medium' ? 'active' : ''}" 
                onclick="changeColorPrioBtn('medium')">
                Medium
                <img id="medium-img" src="../Assets/prio_medium_Basis.png" alt="Medium" />
            </button>
            <button 
                id="btn-low" 
                class="btn-prio-low ${currentPriority === 'low' ? 'active' : ''}" 
                onclick="changeColorPrioBtn('low')">
                Low
                <img id="low-img" src="../Assets/prio_low.png" alt="Low" />
            </button>
        </div>
    `;
}


function generateUserEditHTML() {
    return `
        <div onclick="openDropDownMenuUser()" class="drop-down">
            <div>Select contacts to assign</div>
            <div>
                <img class="drop-down-arrow" id="drop-down-arrow-contacts" src="../Assets/arrow_drop_downaa (1).png" alt="Arrow down"/>
            </div>
        </div>
        <div class="contact-list-container" id="contactList" style="display: none;"></div>
        <div id="addedUsers" class="added-users"></div>
    `;
}


function createUserElement(user, index, isChecked) {
    return `
        <div class="contact">
          <div class="user-avatar" style="background-color: ${user.color};">${user.initialien}</div>
          <span>${user.name}</span>
          <input 
            type="checkbox" 
            ${isChecked ? 'checked' : ''} 
            onclick="checkBoxUserTask(${index})"
          />
        </div>
    `;
}


function createAddSubtaskHTML() {
    return `
        <div class="add-subtask-container">
            <div class="subtask-container">
                <input 
                    oninput="toggleButtonVisibility()" 
                    class="subtask-input" 
                    type="text" 
                    placeholder="Add new subtask" 
                    id="newSubtask"
                />
                <img 
                    onclick="toggleButtonVisibility(true)" 
                    id="plusButton" 
                    class="plus-img" 
                    src="../Assets/Subtasks +.png" 
                    alt="Add"
                />
                <button 
                    class="add-subtask" 
                    id="confirmButton" 
                    onclick="addSubtasks()"
                >
                    <img src="../Assets/check_blue.png" alt="Confirm"/>
                </button>
                <span class="linie" id="linie" onclick="cancelSubtask()">|</span>
                <button 
                    class="cancel-subtask" 
                    id="cancelTask" 
                    onclick="cancelSubtask()"
                >
                    <img src="../Assets/iconoir_cancel.png" alt="Cancel"/>
                </button>
            </div>
        </div>
        <div id="subtaskList" class="subtask-list"></div>
    `;
}

function createSubtaskHTML(subtask, index) {
    return `
        <div class="subtask-label" id="subtask-${index}">
            <ul id="subtask-list">
                <li>
                    <div class="subtask">
                        <div>
                            <span class="subtask-text">${subtask}</span>
                        </div>
                        <div class="images-container">
                           <img 
                               id="edit-subtask-img" 
                               onclick="editSubtask(${index})" 
                               src="../Assets/edit_black.png" 
                               alt="Edit Icon"
                           />
                           <hr>
                           <button class="delete-btn" onclick="deleteSubtask(${index})">
                               <img 
                                   id="delete-subtask" 
                                   src="../Assets/delete_black.png" 
                                   alt="Delete Icon"
                               />
                           </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    `;
}


function createSaveButtonHTML() {
    return `
        <button onclick="saveTaskChanges()" class="okTask-btn" id="oktaskBtn">
            OK <img src="../Assets/check.png" alt="Save">
        </button>
    `;
}


function createEditAndDeleteButtonsHTML() {
    return `
        <div onclick="deleteTask()" class="delete-button">
            <img class="delete-img" src="../Assets/delete_black.png" alt="Delete Icon"/>
            <p>Delete</p>
        </div>
        <span class="line">|</span>
        <div onclick="editTaskDetails()" class="edit-button">
            <img class="edit-img" src="../Assets/edit_black.png" alt="Edit Icon"/>
            <p>Edit</p>
        </div>
    `;
}

function getDueDateTemplate(priorityIcon, formattedDate, priority) {
    const priorityClass = getPriorityClass(priority);
    return `
                              <div class="task-info">
                          <div class="prio">
                            <div class="${priorityClass}">
                              <img class="prio-img" src="${priorityIcon}" />
                            </div>
                            <div class="status">
                              <h4>1</h4>
                              <p>Urgent</p>
                            </div>
                          </div>
                          <hr style="height: 102px; display: inline-block; border: 1px solid #d1d1d1;"/>
                          <div class="date">
                            <h3>${formattedDate}</h3>
                            <p>Upcoming Deadline</p>
                          </div>
                        </div>
      `;
  }