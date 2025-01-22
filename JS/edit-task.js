function editTaskDetails() {
    document.getElementById('modalCategory').classList.add('hidden');
    enableTitleEdit();
    enableDescriptionEdit();
    enableDueDateEdit();
    enablePriorityEdit();
    const task = getCurrentTask(); 
    selectedUsers = task.assignedUsers || [];
    enableUserEdit();
    addedUsers();
    enableSubtaskEdit();
    addSaveAndCancelButtons(true);
    toggleModalLayout(true); 
}


function enableTitleEdit() {
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.innerHTML = `<div class="input-containers">
                               <p>Title</p>
                               <input class="title-input" type="text" placeholder="Enter a title" id="editTitle" value="${modalTitle.innerText}"/>
                            </div>`;
}


function enableDescriptionEdit() {
    const modalDescription = document.getElementById('modalDescription');
    modalDescription.innerHTML = `<div class="input-containers">
                                     <p>Description</p>
                                     <textarea class="description-input" placeholder="Enter a Description" id="editDescription">${modalDescription.innerText}</textarea>
                                  </div>`;
}


function enableDueDateEdit() {
    const modalDueDate = document.getElementById('modalDueDate');
    modalDueDate.innerHTML = `<div class="input-containers">
                                <input class="date-input" type="date" id="editDueDate" value="${modalDueDate.innerText.split('/').reverse().join('-')}" />
                             `;
}


function enablePriorityEdit() {
    const modalPriority = document.getElementById('modalPriority');
    const currentPriority = modalPriority.innerText.trim().toLowerCase();
    modalPriority.innerHTML = generatePriorityButtons(currentPriority);
    changeColorPrioBtn(currentPriority);
}


function changeColorPrioBtn(priority) {
    const imgSources = {
        urgent: ["../Assets/prio_arrow_white.png", "../Assets/prio_medium_Basis.png", "../Assets/prio_low.png"],
        medium: ["../Assets/prio_urgent.png", "../Assets/prio_medium.png", "../Assets/prio_low.png"],
        low: ["../Assets/prio_urgent.png", "../Assets/prio_medium_Basis.png", "../Assets/prio_arrowDown_white.png"]
    };
    const bgColors = {
        urgent: '#FF3B30',
        medium: '#FFA800',
        low: '#4CD964'
    };
    resetButtonStyles();
    selectedPriority = priority;
    setButtonStyles(priority, bgColors[priority]);
    setImageSources(imgSources[priority]);
}


function resetButtonStyles() {
    const buttons = ['btn-urgent', 'btn-medium', 'btn-low'];
    buttons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        button.style.backgroundColor = '#ffffff';
        button.classList.remove('active');
    });
}


function setButtonStyles(priority, bgColor) {
    const buttonId = `btn-${priority}`;
    const button = document.getElementById(buttonId);
    if (button) {
        button.style.backgroundColor = bgColor;
        button.classList.add('active');
    }
}


function setImageSources([urgentImgSrc, mediumImgSrc, lowImgSrc]) {
    document.getElementById("urgent-img").src = urgentImgSrc;
    document.getElementById("medium-img").src = mediumImgSrc;
    document.getElementById("low-img").src = lowImgSrc;
}


function savePriority() {
    const task = getCurrentTask();
    if (!task) {
        console.error('Kein aktueller Task gefunden!');
        return;
    }
    task.priority = selectedPriority;
    const columns = ['todo', 'in-progress', 'await-feedback', 'done'];
    for (const column of columns) {
        const tasks = JSON.parse(localStorage.getItem(column)) || [];
        const taskIndex = tasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
            tasks[taskIndex] = task;
            localStorage.setItem(column, JSON.stringify(tasks));
            break;
        }
    }

}


document.addEventListener("DOMContentLoaded", () => {
    enableUserEdit();
});


function enableUserEdit() {
    const modalAssignedUsers = document.getElementById('modalAssignedUsers');
    modalAssignedUsers.innerHTML = generateUserEditHTML();
    renderDropdownUsers(loadedContacts, selectedUsers);
}


function getCurrentTask() {
    const columns = ['todo', 'in-progress', 'await-feedback', 'done'];
    for (const column of columns) {
        const tasks = JSON.parse(localStorage.getItem(column)) || [];
        const task = tasks.find(task => task.id === currentTaskId);
        if (task) {
            return task;
        }
    }
    return null;
}


document.addEventListener('DOMContentLoaded', () => {
    renderDropdownUsers(loadedContacts, selectedUsers);
    addedUsers();
});


function clearContactList() {
    const contactList = document.getElementById('contactList');
    if (contactList) {
        contactList.innerHTML = "";
    } else {
        console.error("Das Element 'contactList' wurde nicht gefunden!");
    }
}


function isUserSelected(user, selectedUsers) {
    return selectedUsers.some(selected => selected.name === user.name);
}


function renderUserList(loadedContacts, selectedUsers) {
    const contactList = document.getElementById('contactList');
    if (!contactList) return;

    loadedContacts.forEach((user, index) => {
        const isChecked = isUserSelected(user, selectedUsers);
        const userElement = createUserElement(user, index, isChecked);
        contactList.innerHTML += userElement;
    });
}


function renderDropdownUsers(loadedContacts, selectedUsers) {
    clearContactList();
    renderUserList(loadedContacts, selectedUsers);
}


function getInitials(name) {
    const nameParts = name.trim().split(' ');
    if (nameParts.length > 1) {
        return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
}


function addUserToTask(userName, userColor) {
    if (!userName || !userColor) {
        console.error("Fehler: Benutzername oder Farbe fehlen!");
        return;
    }
    selectedUsers.push({ name: userName, color: userColor });
    renderAssignedUsers(selectedUsers);
}


function checkBoxUserTask(index) {
    const user = loadedContacts[index];
    const checkbox = document.querySelectorAll('.contact input[type="checkbox"]')[index];

    if (!user) {
        console.error(`User not found at index ${index}`);
        return;
    }
    if (checkbox.checked) {
        if (!selectedUsers.some(u => u.name === user.name)) {
            selectedUsers.push(user);
        }
    } else {
        selectedUsers = selectedUsers.filter(u => u.name !== user.name);
    }
    addedUsers();
}


function addedUsers() {
    const addedUsersContainer = document.getElementById("addedUsers");
    addedUsersContainer.innerHTML = "";
    selectedUsers.forEach(user => {
        const nameParts = user.name.split(' ');
        const initials = nameParts.length > 1 
            ? nameParts[0][0] + nameParts[1][0]
            : nameParts[0][0];
        addedUsersContainer.innerHTML += `
            <div class="user-avatar" style="background-color: ${user.color};">
                ${initials.toUpperCase()}
            </div>
        `;
    });
    
}


function openDropDownMenuUser() {
    const contactList = document.getElementById('contactList');
    const dropDownArrowContacts = document.getElementById('drop-down-arrow-contacts');
    if (contactList.style.display === 'none' || !contactList.style.display) {
        contactList.style.display = 'block';
        dropDownArrowContacts.src = "../Assets/arrow_drop_downaa.png";
    } else {
        contactList.style.display = 'none';
        dropDownArrowContacts.src = "../Assets/arrow_drop_downaa (1).png";
    }
}


function enableSubtaskEdit() {
    const modalSubtasks = document.getElementById('modalSubtasks');
    if (!modalSubtasks) {
        console.error('Element "modalSubtasks" nicht gefunden!');
        return;
    }
    const task = getCurrentTask();
    if (!task) {
        console.error('Kein Task gefunden, um Subtasks anzuzeigen.');
        return;
    }
    subtaskList = task.subtasks || [];
    modalSubtasks.innerHTML = createAddSubtaskHTML();
    renderExistingSubtasks();
}


function renderExistingSubtasks() {
    const subtaskListContainer = document.getElementById('subtaskList');
    if (!subtaskListContainer) {
        console.error('Element "subtaskList" nicht gefunden!');
        return;
    }
    subtaskListContainer.innerHTML = '';
    subtaskList.forEach((subtask, index) => {
        const subtaskHTML = createSubtaskHTML(subtask, index);
        subtaskListContainer.insertAdjacentHTML('beforeend', subtaskHTML);
    });
}


function addSubtasks() {
    const newSubtaskInput = document.getElementById('newSubtask');
    const subtaskText = newSubtaskInput.value.trim();
    if (!subtaskText) {
        alert('Please enter a valid subtask!');
        return;
    }
    subtaskList.push(subtaskText);
    renderExistingSubtasks();
    newSubtaskInput.value = '';
    toggleButtonVisibility(false);
}


function deleteSubtask(index) {
    subtaskList.splice(index, 1);
    renderExistingSubtasks();
}


function editSubtask(index) {
    const subtaskItem = document.getElementById(`subtask-${index}`);
    const subtaskText = subtaskList[index];
    subtaskItem.innerHTML = `
        <input type="text" value="${subtaskText}" id="editSubtaskInput-${index}" class="subtask-edit-input"/>
        <div class="images-container" id="images-container">
           
           <button onclick="deleteSubtask(${index})">
               <img src="../Assets/delete_black.png" alt="Cancel"/>
           </button>   
           <hr>
            <img id="edit-subtask-img" onclick="saveSubtask(${index})" src="../Assets/check_blue.png" alt="Save"/>
        </div>       
        
    `;
}


function saveSubtask(index) {
    const editInput = document.getElementById(`editSubtaskInput-${index}`);
    const updatedText = editInput.value.trim();
    if (!updatedText) {
        alert('Please enter a valid subtask!');
        return;
    }
    subtaskList[index] = updatedText;
    renderExistingSubtasks();
}


function cancelEditSubtask(index, originalText) {
    subtaskList[index] = originalText;
    renderExistingSubtasks();
}


function toggleButtonVisibility(forceShow) {
    const taskInput = document.getElementById('newSubtask');
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelTask');
    const plusButton = document.getElementById('plusButton');
    const linie = document.getElementById('linie');
    linie.style.display='none';
    confirmButton.style.display = 'none';
    cancelButton.style.display = 'none';
    plusButton.style.display = 'inline';

    if (forceShow || taskInput.value.trim()) {
        confirmButton.style.display = 'inline';
        cancelButton.style.display = 'inline';
        linie.style.display='inline';
        plusButton.style.display = 'none';
    } 
}


function cancelSubtask() {
    document.getElementById('newSubtask').value = '';
    toggleButtonVisibility(false);
}


function closeTaskModal() {
    const modalFooter = document.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = '';
    }
    document.getElementById('taskModal').style.display = 'none';
}


function addSaveAndCancelButtons(isEditMode) {
    const modalFooter = document.querySelector('.modal-footer');
    if (!modalFooter) {
        console.error('Element ".modal-footer" nicht gefunden!');
        return;
    }
    if (isEditMode) {
        modalFooter.innerHTML = createSaveButtonHTML();
    } else {
        modalFooter.innerHTML = createEditAndDeleteButtonsHTML();
    }
}


function saveTaskChanges() {
    const updatedTask = gatherUpdatedTaskDetails();
    updateTaskInLocalStorage(updatedTask);
    updateProgressBar(updatedTask);
    refreshBoard();
    closeTaskModal();
}


function refreshBoard() {
    ['todo', 'in-progress', 'await-feedback', 'done'].forEach(loadTasks);
}


function gatherUpdatedTaskDetails() {
    const updatedTitle = getInputValueById('editTitle');
    const updatedDescription = getInputValueById('editDescription');
    const updatedDueDate = getInputValueById('editDueDate');
    const updatedUsers = gatherSelectedUsers();
    const updatedSubtasks = gatherSubtasks();
    const completedSubtasks = countCompletedSubtasks(updatedSubtasks);
    return {
        id: currentTaskId,
        title: updatedTitle,
        description: updatedDescription,
        dueDate: updatedDueDate,
        assignedUsers: updatedUsers,
        priority: selectedPriority || 'medium',
        subtasks: updatedSubtasks,
        completedSubtasks: completedSubtasks,
    };
}


function getInputValueById(elementId) {
    const inputElement = document.getElementById(elementId);
    if (!inputElement) {
        console.error(`Element mit ID "${elementId}" nicht gefunden!`);
        return '';
    }
    return inputElement.value;
}


function gatherSelectedUsers() {
    return selectedUsers.map(user => ({
        name: user.name,
        color: user.color,
    }));
}


function gatherSubtasks() {
    return subtaskList.map(subtask => subtask);
}


function countCompletedSubtasks(subtasks) {
    return subtasks.filter((_, index) => 
        document.getElementById(`subtask-checkbox-${index}`)?.checked
    ).length;
}


function updateTaskInLocalStorage(updatedTask) {
    const columns = ['todo', 'in-progress', 'await-feedback', 'done'];
    for (const column of columns) {
        const tasks = JSON.parse(localStorage.getItem(column)) || [];
        const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                ...updatedTask,
                totalSubtasks: updatedTask.subtasks.length,
                completedSubtasks: updatedTask.subtasks.filter((_, index) => 
                    document.getElementById(`subtask-checkbox-${index}`)?.checked
                ).length,
            };
            localStorage.setItem(column, JSON.stringify(tasks));
            break;
        }
    }
}


function reloadTaskDetails() {
    closeTaskModal();
    openTaskDetails(currentTaskId);
}


function closeTaskModal() {
    const modalFooter = document.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = '';
    }
    document.getElementById('taskModal').style.display = 'none';
}


function toggleModalLayout(isEditMode) {
    const dueDateElement = document.querySelector('.modalDueDate, .modalsDueDate');
    const priorityElement = document.querySelector('.modalPriority, .modalsPriority');
    if (isEditMode) {
        dueDateElement.classList.remove('modalDueDate');
        dueDateElement.classList.add('modalsDueDate');
        priorityElement.classList.remove('modalPriority');
        priorityElement.classList.add('modalsPriority');
    } else {
        dueDateElement.classList.remove('modalsDueDate');
        dueDateElement.classList.add('modalDueDate');
        priorityElement.classList.remove('modalsPriority');
        priorityElement.classList.add('modalPriority');
    }
}