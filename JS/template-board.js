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


function generateTitleEditHTML(titleText) {
    return `
        <div class="input-containers">
            <p>Title</p>
            <input class="title-input" type="text" placeholder="Enter a title" id="editTitle" value="${titleText}"/>
        </div>`;
}


function generateDescriptionEditHTML(descriptionText) {
    return `
        <div class="input-containers">
            <p>Description</p>
            <textarea class="description-input" placeholder="Enter a Description" id="editDescription">${descriptionText}</textarea>
        </div>`;
}


function generateDueDateEditHTML(dueDateText) {
    const formattedDate = formatDateForInput(dueDateText);
    return `
        <div class="input-containers">
            <input class="date-input" type="date" id="editDueDate" value="${formattedDate}" />
        </div>`;
}


function generateSubtaskHTML(subtask, index, isChecked) {
    return `
        <div class="subtask-items" id="subtask-${index}">
          <div class="subtask-add-items">
            <input type="checkbox" class="hidden" id="subtask-checkbox-${index}" ${isChecked ? 'checked' : ''} 
                onchange="toggleSubtaskIdCompletion(${index})">
            <span class="span-overlay"></span>
            <span class="subtask-text">${subtask}</span>
            <div class="icons-show">
               <button class="edit-pen-subtask"> 
                <img id="edit-subtask-img" onclick="editSubtask(${index})" src="../Assets/edit_black.png" alt="Edit Icon"/>
               </button>
               <span class="linie-subtask">|</span>
               <button class="edit-delete-subtask">
                <img id="delete-subtask" onclick="deleteSubtaskID(${index})" src="../Assets/delete_black.png" alt="Delete Icon"/>
               </button>
            </div>
          </div>
        </div>`;
}


function generateEditSubtaskHTML(subtaskText, index) {
    return `
        <div class="subtask-edit-items">
            <input type="text" value="${subtaskText}" id="editSubtaskInput-${index}" class="subtask-edit-input"/>
            <button class="edit-pen-subtask">
                <img onclick="deleteSubtaskID(${index})" src="../Assets/delete_black.png" alt="Cancel"/>
            </button>
            <span class="linie-subtask">|</span>
            <button class="edit-delete-subtask">
                <img id="edit-subtask-img" onclick="saveSubtask(${index})" src="../Assets/check_blue.png" alt="Save"/>
            </button>
        </div>`;
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


function createUserElement(user, index, isChecked) {
    return `
        <div class="contact ${isChecked ? 'checked' : ''}" onclick="checkBoxUserTask(${index})">
           <div class="user-contact">
             <div class="user-avatar" style="background-color: ${user.color};">${user.initialien}</div>
             <span>${user.name}</span>
           </div>
          <input 
            type="checkbox" 
            ${isChecked ? 'checked' : ''} 
            onclick="checkBoxUserTask(${index},  event)"
          />
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


function generatePriorityButtons(currentPriority) {
    return` 
        <div class="prio-btn-container">
            <button id="btn-urgent" class="btn-prio-urgent ${currentPriority === 'urgent' ? 'active' : ''}" onclick="changeColorPrioBtn('urgent')">Urgent<img id="urgent-img" src="../Assets/prio_urgent.png" alt="Urgent" /></button>
            <button id="btn-medium" class="btn-prio-medium ${currentPriority === 'medium' ? 'active' : ''}" onclick="changeColorPrioBtn('medium')">Medium<img id="medium-img" src="../Assets/prio_medium_Basis.png" alt="Medium"/></button>
            <button id="btn-low" class="btn-prio-low ${currentPriority === 'low' ? 'active' : ''}" onclick="changeColorPrioBtn('low')">Low <img id="low-img" src="../Assets/prio_low.png" alt="Low" /></button>
        </div>`
}


function renderTask(task) {
    return `
        <div class="user-card" draggable="true" id="${task.id}" ondragstart="drag(event)" onclick="openTaskDetails('${task.id}')">
            <div class="user-story-card todo">
                <div class="progress-container">
                    <h3 class="category-label ${task.category === "Technical Task" ? "technical-task" : "user-story"}">${task.category}</h3>
                    <div class="task-buttons">
                        <button id="moveBtn link" class="move-btn" onclick="moveTask('${task.id}', 'previous', event)">
                            <img class="arrow-right-icon" src="../Assets/arrow-left-line.png" alt="search-icon"/>
                        </button>
                        <button id="moveBtn right" class="move-btn" onclick="moveTask('${task.id}', 'next', event)">
                            <img class="arrow-left-icon" src="../Assets/arrow-left-line.png" alt="search-icon"/>
                        </button>
                    </div>
                </div>
                <h4>${task.title}</h4>
                <p>${task.description}</p>
                <div class="progress-container" style="display: 'flex' : 'none'};" id="progress-bar-${task.id}">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${
                            (Array.isArray(task.subtasks) && task.subtasks.length > 0
                                ? (Array.isArray(task.completedSubtasks) 
                                    ? (task.completedSubtasks.length / task.subtasks.length) * 100 
                                    : 0)
                                : 0)
                        }%"></div>
                    </div>
                    <span class="subtasks">${
                        (Array.isArray(task.completedSubtasks) ? task.completedSubtasks.length : 0)}/${
                        (Array.isArray(task.subtasks) ? task.subtasks.length : 0)
                    } Subtasks</span>
                </div>
                <div class="user-container">
                    <div class="user-avatar-container">
                        ${Array.isArray(task.assignedUsers) 
                            ? task.assignedUsers.slice(0, 4).map(user => {
                                const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
                                return `<div class="user-avatar" style="background-color: ${user.color};">${initials}</div>`;
                            }).join('') 
                            : ''
                        }
                        ${Array.isArray(task.assignedUsers) && task.assignedUsers.length > 4
                            ? `<div class="user-avatar remaining-users-circle">+${task.assignedUsers.length - 4}</div>`
                            : ''}
                    </div>
                    <p>${(() => {
                        switch (task.priority?.toLowerCase()) {
                            case "low":
                                return `<img src="../Assets/prio_low.png" alt="Low Priority">`;
                            case "medium":
                                return `<img src="../Assets/prio_medium_orang.png" alt="Medium Priority">`;
                            case "urgent":
                                return `<img src="../Assets/prio_urgent.png" alt="Urgent Priority">`;
                            default:
                                return task.priority || "No Priority";
                        }
                    })()}</p>
                </div>
            </div>
        </div>
    `;
}


function getSubtasksTemplateOverlay(subtask, index) {
    return `
        <div class="subtask-label-overlay" id="subtask-label-${index}">
            <ul id="subtask-list-${index}">
                <li>
                    <div class="subtask-overlay">
                        <div class="input-overlay">
                            <span class="span-overlay"></span>
                            <input id="edit-subtask-${index}" class="edit-subtask" type="text" value="${subtask}" onfocus="editSubtaskOverlay(${index})">
                        </div>
                        <div class="images-container" id="images-container-${index}">
                            <img class="edit-subtask-img" id="edit-subtask-img-${index}" onclick="editSubtaskOverlay(${index})" src="../Assets/edit.png" alt="Edit Icon">
                            <img class="confirm-subtask" id="confirm-subtask-${index}" onclick="confirmSubtask(${index})" src="../Assets/check_blue.png" style="display: none;">
                            <span class="line-overlay" id="delete-subtask-${index}">|</span>
                            <button class="delete-btn" onclick="deleteSubtask(${index})">
                                <img id="delete-subtask-${index}" src="../Assets/delete.png" alt="delete Icon">
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>`;
}


function renderAddToTaskContactsOverlay(colorOverlay, initialsOverlay, user, index, isCheckedOverlay) {
    return `
      <div class="contact-overlay ${isCheckedOverlay ? "selected-user" : ""}" onclick="checkBoxUserTaskOverlay(${index}, event)">
        <div class="name-and-img">
          <div class="initials-circle" style="background-color: ${colorOverlay};">
            ${initialsOverlay}
          </div>
          <p>${user.name}</p>
        </div>
        <input onclick="checkBoxUserTaskOverlay(${index}, event)" type="checkbox" ${isCheckedOverlay} name="checkbox">
      </div>`;
}


function renderAddedUsersOverlay(colorOverlay, initialsOverlay) {
    return `
              <div class="initials-circle" style="background-color: ${colorOverlay};">
                  ${initialsOverlay}
              </div>`;
  }