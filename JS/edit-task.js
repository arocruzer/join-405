// Entry point for enabling task details editing in the modal.
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

// Enables editing for the task title by replacing it with an input field.
function enableTitleEdit() {
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.innerHTML = generateTitleEditHTML(modalTitle.innerText);
}

// Enables editing for the task description by replacing it with a textarea.
function enableDescriptionEdit() {
    const modalDescription = document.getElementById('modalDescription');
    modalDescription.innerHTML = generateDescriptionEditHTML(modalDescription.innerText);
}

// Allows the user to edit the due date by replacing it with a date input.
function enableDueDateEdit() {
    const modalDueDate = document.getElementById('modalDueDate');
    modalDueDate.innerHTML = generateDueDateEditHTML(modalDueDate.innerText);
}

function formatDateForInput(dateText) {
    const parts = dateText.split('/');
    return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : '';
}

// Enables priority editing by rendering priority buttons and setting the default priority.
function enablePriorityEdit() {
    const modalPriority = document.getElementById('modalPriority');
    const currentPriority = modalPriority.innerText.trim().toLowerCase();
    modalPriority.innerHTML = generatePriorityButtons(currentPriority);
    changeColorPrioBtn(currentPriority);
}

// Changes the appearance and functionality of priority buttons based on the selected priority.
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

// Resets the styles for all priority buttons.
function resetButtonStyles() {
    const buttons = ['btn-urgent', 'btn-medium', 'btn-low'];
    buttons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        button.style.backgroundColor = '#ffffff';
        button.classList.remove('active');
    });
}

// Updates the background color and styling for the selected priority button.
function setButtonStyles(priority, bgColor) {
    const buttonId = `btn-${priority}`;
    const button = document.getElementById(buttonId);
    if (button) {
        button.style.backgroundColor = bgColor;
        button.classList.add('active');
    }
}

// Updates the image sources for priority indicators.
function setImageSources([urgentImgSrc, mediumImgSrc, lowImgSrc]) {
    document.getElementById("urgent-img").src = urgentImgSrc;
    document.getElementById("medium-img").src = mediumImgSrc;
    document.getElementById("low-img").src = lowImgSrc;
}

// Saves the currently selected priority back to the task and updates localStorage.
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



// Toggles the visibility of subtask-related buttons depending on input state.
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



// Closes the task modal and resets its content
function closeTaskModal() {
    const modalFooter = document.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = '';
    }
    document.getElementById('taskModal').style.display = 'none';
}

// Adds save and cancel buttons or edit/delete buttons to the modal footer based on mode.
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
    if (!validateModalInputs()) return;
    const updatedTask = gatherUpdatedTaskDetails();
    updateTaskInLocalStorage(updatedTask);
    refreshBoard();
    closeTaskModal();
}

function refreshBoard() {
    ['todo', 'in-progress', 'await-feedback', 'done'].forEach(loadTasks);
}

// Gathers updated details from the modal fields and creates an updated task object.
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

// Helper to retrieve the value of an input element by its ID.
function getInputValueById(elementId) {
    const inputElement = document.getElementById(elementId);
    if (!inputElement) {
        console.error(`Element mit ID "${elementId}" nicht gefunden!`);
        return '';
    }
    return inputElement.value;
}


// Collects the subtasks as an array of strings from the modal.
function gatherSubtasks() {
    return subtaskList.map(subtask => subtask);
}

// Counts the number of completed subtasks based on checkboxes in the modal.
function countCompletedSubtasks(subtasks) {
    return subtasks
        .map((_, index) => index) // Erstellt eine Liste aller Indizes
        .filter(index => document.getElementById(`subtask-checkbox-${index}`)?.checked); // Speichert nur die erledigten Subtask-Indizes
}

// Updates the task in localStorage with the latest changes.
function updateTaskInLocalStorage(updatedTask) {
    const columns = ['todo', 'in-progress', 'await-feedback', 'done'];

    for (const column of columns) {
        let tasks = JSON.parse(localStorage.getItem(column)) || [];
        const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);

        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                ...updatedTask,
                completedSubtasks: updatedTask.completedSubtasks // Speichert die erledigten Subtasks als Liste der Indizes
            };
            localStorage.setItem(column, JSON.stringify(tasks));
            break;
        }
    }
}

// Refreshes the modal with the updated task details after changes are saved.
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

// Switches the modal layout between edit and view modes.
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

function validateModalInputs() {
    let isValid = true;
    ['editTitle', 'editDescription'].forEach(id => {
        const input = document.getElementById(id);
        const container = input.parentElement;
        if (!input.value.trim()) {
            isValid = false;
            container.innerHTML += `<span class="error-message" style="color: red; font-size: 12px;">${
                id === 'editTitle' ? "Bitte fügen Sie einen Titel hinzu" : "Bitte fügen Sie eine Beschreibung hinzu"
            }</span>`;
        } else {
            container.style.borderColor = '';
            removeError(container);
        }
    });

    return isValid;
}

function removeError(container) {
    const error = container.querySelector('.error-message');
    if (error) error.remove();
}
