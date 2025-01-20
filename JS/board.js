let selectedUsers = [];

function loadTasks(columnId) {
    const container = document.getElementById(`${columnId}-tasks`);
    container.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem(columnId)) || [];

    tasks.forEach(task => {
        container.innerHTML += renderTask(task);
    });
    updateTaskVisibilityById(columnId);
}

function renderTask(task) {
    const categoryClass = task.category === "Technical Task" ? "technical-task" : "user-story";
    let priorityIcon;
    switch (task.priority.toLowerCase()) {
        case "low":
            priorityIcon = "../Assets/prio_low.png";
            break;
        case "medium":
            priorityIcon = "../Assets/prio_medium.png";
            break;
        case "urgent":
            priorityIcon = "../Assets/prio_urgent.png";
            break;
        default:
            priorityIcon = "";
    }
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
                     ${task.assignedUsers.map(user => {
                         const nameParts = user.name.split(' '); // Split the name into parts
                         const initials = nameParts.length > 1 
                            ? nameParts[0][0] + nameParts[1][0] // First and last initials
                            : nameParts[0][0]; // Only first initial if there's no last name
                         return `<div class="user-avatar" style="background-color: ${user.color};">${initials.toUpperCase()}</div>`;
                     }).join('')}
                    
                    </div>
                    <p>${priorityIcon ? `<img src="${priorityIcon}" alt="${task.priority} Priority" style="height:10px;">` : task.priority}</p>
                </div>
            </div>
        </div>
    `;
}


function getPriorityText(taskElement) {
    return taskElement.querySelector('.user-container p img')
        ? taskElement.querySelector('.user-container p img').alt.replace(' Priority', '')
        : taskElement.querySelector('.user-container p').innerText.trim();
}

function getPriorityIcon(priorityText) {
    switch (priorityText.toLowerCase()) {
        case "low":
            return "../Assets/prio_low.png";
        case "medium":
            return "../Assets/prio_medium.png";
        case "urgent":
            return "../Assets/prio_urgent.png";
        default:
            return "../Assets/prio_medium.png";
    }
}

function getAssignedUsers(taskElement) {
    return Array.from(taskElement.querySelectorAll('.user-avatar')).map(user => ({
        name: user.innerText.trim(),
        color: user.style.backgroundColor
    }));
}

function createTaskObject(taskElement, taskId) {
    const priorityText = getPriorityText(taskElement);
    return {
        id: taskId,
        title: taskElement.querySelector('h4').innerText,
        description: taskElement.querySelector('p').innerText,
        priority: priorityText,
        priorityIcon: getPriorityIcon(priorityText),
        completedSubtasks: parseInt(taskElement.querySelector('.subtasks').innerText.split('/')[0]),
        totalSubtasks: parseInt(taskElement.querySelector('.subtasks').innerText.split('/')[1]),
        category: taskElement.querySelector('.category-label').innerText.trim(),
        assignedUsers: getAssignedUsers(taskElement)
    };
}

function saveTaskToLocalStorage(columnId, taskElement, taskId) {
    const tasks = JSON.parse(localStorage.getItem(columnId)) || [];

    if (!tasks.find(task => task.id === taskId)) {
        const newTask = createTaskObject(taskElement, taskId);
        tasks.push(newTask);
        localStorage.setItem(columnId, JSON.stringify(tasks));
    }
}


function updateTaskVisibilityById(columnId) {
    const container = document.getElementById(`${columnId}-tasks`);
    const taskList = document.querySelector(`#${columnId} .task-list`);
    const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
    taskList.style.display = tasks.length > 0 ? 'none' : 'block';
}

function openInputPage(columnId) {
    localStorage.setItem('currentColumn', columnId);
    window.location.href = "/HTML/add-task.html";
}
/*function openInputPage(columnId) {
    localStorage.setItem('currentColumn', columnId);

    // Lade den Inhalt der "add-task.html"
    fetch('/HTML/add-task.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extrahiere den <div id="main-content">-Inhalt
            const mainContent = doc.getElementById('main-content');

            if (mainContent) {
                document.getElementById('main-content-placeholder').innerHTML = mainContent.innerHTML;
                document.getElementById('modalAddtask').classList.add('show');
            }
        });
}*/

function closeModal() {
    document.getElementById('modalAddtask').classList.remove('show');
}


function searchTasks() {
    let searchText = '';
    
    // Überprüfen, welches Input-Feld aktiv ist
    const searchInputs = document.querySelectorAll('#search')|| document.querySelectorAll('#searchTask');
    searchInputs.forEach(input => {
        if (input.offsetParent !== null) { // Nur sichtbares Inputfeld nutzen
            searchText = input.value.trim().toLowerCase();
        }
    });

    let tasks = document.querySelectorAll('.user-card');
    
    if (searchText.length < 3) {
        tasks.forEach(task => task.style.display = "block");
        return;
    }

    tasks.forEach(task => {
        let taskTitle = task.querySelector('h4') ? task.querySelector('h4').textContent.toLowerCase() : '';
        if (taskTitle.includes(searchText)) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}


window.addEventListener("load", function () {
    ['todo', 'in-progress', 'await-feedback', 'done'].forEach(loadTasks);
});

let currentTaskId = null;
function formatDate(dateString) {
    if (!dateString) {
        console.warn('Kein Datum übergeben.');
        return 'Datum nicht verfügbar'; // Rückgabewert bei fehlendem Datum
    }

    const [year, month, day] = dateString.split('-');

    if (!year || !month || !day) {
        console.warn('Ungültiges Datumsformat:', dateString);
        return 'Ungültiges Datum'; // Rückgabewert bei falschem Format
    }

    return `${day}/${month}/${year}`; // Ändert das Format zu dd/mm/yyyy
}


function formatPriority(priorityText) {
    let priorityIcon;
    switch (priorityText.toLowerCase()) {
        case "low":
            priorityIcon = "../Assets/prio_low.png";
            break;
        case "medium":
            priorityIcon = "../Assets/prio_medium.png";
            break;
        case "urgent":
            priorityIcon = "../Assets/prio_urgent.png";
            break;
        default:
            priorityIcon = "";
    }

    return `<span class="priority-text">${priorityText}</span> 
            <img src="${priorityIcon}" alt="${priorityText} Priority Icon" class="priority-icon">`;
}

function renderAssignedUsers(users) {
    return users.map(user => `
        <div class="user-item">
            <div class="user-avatar" style="background-color: ${user.color};">${user.name[0]}${user.name.split(' ')[1] ? user.name.split(' ')[1][0] : ''}</div>
            <span class="user-name">${user.name}</span>
        </div>
    `).join('');
}

function updateProgressBar(task) {
    const progressElement = document.querySelector(`#${task.id} .progress-bar .progress`);
    const percentage = task.totalSubtasks > 0 
        ? (task.completedSubtasks / task.totalSubtasks) * 100 
        : 0;
    progressElement.style.width = `${percentage}%`;

    const subtasksElement = document.querySelector(`#${task.id} .subtasks`);
    subtasksElement.innerText = `${task.completedSubtasks}/${task.totalSubtasks} Subtasks`;
}


// Subtask abhaken und Fortschritt direkt aktualisieren
function updateSubtaskCompletion(taskId, index) {
    const checkboxId = `subtask-${taskId}-${index}`;
    const checkboxElement = document.getElementById(checkboxId);

    const allColumns = ['todo', 'in-progress', 'await-feedback', 'done'];
    for (const column of allColumns) {
        let tasks = JSON.parse(localStorage.getItem(column)) || [];
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex !== -1) {
            if (checkboxElement.checked) {
                tasks[taskIndex].completedSubtasks++;
            } else {
                tasks[taskIndex].completedSubtasks--;
            }
            localStorage.setItem(column, JSON.stringify(tasks));
            updateProgressBar(tasks[taskIndex]);
            break;
        }
    }
}

function setCategoryStyle(elementId, category) {
    const element = document.getElementById(elementId);

    if (!element) return;

    // Define styles for each category
    const categoryStyles = {
        "User Story": {
            text: "User Story",
            class: "user-story",
        },
        "Technical Task": {
            text: "Technical Task",
            class: "technical-task",
        },
    };

    // Default style if category is not defined
    const defaultStyle = {
        text: "Uncategorized",
        class: "uncategorized",
    };

    // Get the style for the category or default if not found
    const style = categoryStyles[category] || defaultStyle;

    // Apply the text and class
    element.innerText = style.text;
    element.className = style.class;
}


function openTaskDetails(taskId) {
    const tasks = [...JSON.parse(localStorage.getItem('todo') || "[]"), 
                   ...JSON.parse(localStorage.getItem('in-progress') || "[]"),
                   ...JSON.parse(localStorage.getItem('await-feedback') || "[]"),
                   ...JSON.parse(localStorage.getItem('done') || "[]")];
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        currentTaskId = taskId;
        const modalCategory = document.getElementById('modalCategory');
        modalCategory.innerText = task.category || "No Category";
        modalCategory.className = `category-label ${task.categoryClass || ""}`;
        document.getElementById('modalTitle').innerText = task.title;
        document.getElementById('modalDescription').innerText = task.description;
        const dueDateElement = document.getElementById('modalDueDate');
        dueDateElement.innerText = task.dueDate ? formatDate(task.dueDate) : 'Kein Fälligkeitsdatum';
        document.getElementById('modalPriority').innerHTML = formatPriority(task.priority);
        document.getElementById('modalAssignedUsers').innerHTML = renderAssignedUsers(task.assignedUsers);
        const subtaskList = document.getElementById('modalSubtasks');
        if (Array.isArray(task.subtasks) && task.subtasks.length > 0) {
            subtaskList.innerHTML = task.subtasks.map((subtask, index) => `
                <label class="subtasks-label">
                    <input type="checkbox" id="subtask-${taskId}-${index}"
                           ${task.completedSubtasks > index ? 'checked' : ''}
                           onchange="updateSubtaskCompletion('${taskId}', ${index})">
                    ${subtask}
                </label>
            `).join('');
        } else {
            subtaskList.innerHTML = '<p>Keine Subtasks verfügbar</p>';
        }
        setCategoryStyle("modalCategory", task.category);
        
        document.getElementById('taskModal').style.display = 'block';
        toggleModalLayout(false); 
        updateProgressBar(task);
        addSaveAndCancelButtons(false);
    }
}

function closeTaskModal() {
    document.getElementById('taskModal').style.display = 'none';
}



function deleteTask() {
    const allColumns = ['todo', 'in-progress', 'await-feedback', 'done'];
    allColumns.forEach(column => {
        let tasks = JSON.parse(localStorage.getItem(column)) || [];
        tasks = tasks.filter(task => task.id !== currentTaskId);
        localStorage.setItem(column, JSON.stringify(tasks));
    });
    alert('Task deleted successfully.');
    closeTaskModal();
    window.location.reload();
}


function closeTaskModal() {
    document.getElementById('taskModal').style.display = 'none';
}

function addButton() {
    const headerBoard = document.getElementById('sectionBoard');
    const headerBoardPlus = document.getElementById('sectionBoardPlus');
    
    if (window.innerWidth < 1355) {
        headerBoard.classList.remove('hidden');  // Korrekt geschrieben
        headerBoardPlus.classList.add('hidden'); // Korrekt geschrieben
    } else {
        headerBoard.classList.add('hidden');     // Umgekehrt für größere Bildschirme
        headerBoardPlus.classList.remove('hidden');
    }
}

// Event Listener für die Anpassung der Ansicht basierend auf der Bildschirmgröße
window.addEventListener('resize', addButton);
window.addEventListener('DOMContentLoaded', addButton);

let draggedTaskId = null;

// Task dragging starts
function drag(event) {
    draggedTaskId = event.target.id; // Store the ID of the dragged task
    event.dataTransfer.effectAllowed = "move";
}

// Allow drop and add highlight to the task container
function allowDrop(event) {
    event.preventDefault(); // Prevent default behavior to allow dropping
    const taskContainer = event.target.closest('.task-container');
    if (taskContainer) {
        // Remove highlight from other task containers
        document.querySelectorAll('.task-container.highlight-drop').forEach((container) => {
            container.classList.remove('highlight-drop');
        });
        // Add highlight to the current task container
        taskContainer.classList.add('highlight-drop');
    }
}

// Remove highlight from all task containers
function removeHighlight() {
    document.querySelectorAll('.task-container.highlight-drop').forEach((container) => {
        container.classList.remove('highlight-drop');
    });
}

// Handle dropping the task
function drop(event) {
    event.preventDefault(); // Prevent default behavior
    const targetTaskContainer = event.target.closest('.task-container');
    removeHighlight(); // Remove all highlights after dropping

    if (targetTaskContainer && draggedTaskId) {
        const draggedTaskElement = document.getElementById(draggedTaskId);
        const sourceTaskContainer = draggedTaskElement.closest('.task-container');

        if (draggedTaskElement && targetTaskContainer !== sourceTaskContainer) {
            // Move the task in the DOM
            targetTaskContainer.appendChild(draggedTaskElement);

            // Update localStorage for source and target containers
            const sourceColumnId = sourceTaskContainer.closest('.column').id;
            const targetColumnId = targetTaskContainer.closest('.column').id;

            const sourceTasks = JSON.parse(localStorage.getItem(sourceColumnId)) || [];
            const targetTasks = JSON.parse(localStorage.getItem(targetColumnId)) || [];

            const taskIndex = sourceTasks.findIndex((task) => task.id === draggedTaskId);
            if (taskIndex > -1) {
                targetTasks.push(sourceTasks.splice(taskIndex, 1)[0]);
                localStorage.setItem(sourceColumnId, JSON.stringify(sourceTasks));
                localStorage.setItem(targetColumnId, JSON.stringify(targetTasks));
            }

            // Update UI
            loadTasks(sourceColumnId);
            loadTasks(targetColumnId);
        }
    }
}

// Attach dragleave event to remove highlight when dragging leaves a container
document.querySelectorAll('.task-container').forEach((taskContainer) => {
    taskContainer.addEventListener('dragleave', removeHighlight);
});

function editTaskDetails() {
    document.getElementById('modalCategory').classList.add('hidden');
    enableTitleEdit();
    enableDescriptionEdit();
    enableDueDateEdit();
    enablePriorityEdit();

    const task = getCurrentTask(); // Lade die aktuelle Aufgabe
    selectedUsers = task.assignedUsers || []; // Synchronisiere die Benutzerliste
    enableUserEdit(); // Benutzer-Dropdown initialisieren

    addedUsers(); // Initialen der Benutzer anzeigen

    enableSubtaskEdit();
    addSaveAndCancelButtons(true);
    toggleModalLayout(true); 
}



// Bearbeitbarer Titel
function enableTitleEdit() {
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.innerHTML = `<div class="input-containers">
                               <p>Title</p>
                               <input class="title-input" type="text" placeholder="Enter a title" id="editTitle" value="${modalTitle.innerText}"/>
                            </div>`;
}

// Bearbeitbare Beschreibung
function enableDescriptionEdit() {
    const modalDescription = document.getElementById('modalDescription');
    modalDescription.innerHTML = `<div class="input-containers">
                                     <p>Description</p>
                                     <textarea class="description-input" placeholder="Enter a Description" id="editDescription">${modalDescription.innerText}</textarea>
                                  </div>`;
}

// Bearbeitbares Fälligkeitsdatum
function enableDueDateEdit() {
    const modalDueDate = document.getElementById('modalDueDate');
    modalDueDate.innerHTML = `<div class="input-containers">
                                <input class="date-input" type="date" id="editDueDate" value="${modalDueDate.innerText.split('/').reverse().join('-')}" />
                             `;
}

// Bearbeitbare Priorität
function enablePriorityEdit() {
    const modalPriority = document.getElementById('modalPriority');
    const currentPriority = modalPriority.innerText.trim().toLowerCase(); // Hol die aktuelle Priorität

    modalPriority.innerHTML = `
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
                    <img id="medium-img" src="../Assets/prio_medium.png" alt="Medium" />
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

    // Setze den initialen Stil für die aktuelle Priorität
    changeColorPrioBtn(currentPriority);
}

// Ändert den Stil basierend auf der ausgewählten Priorität
function changeColorPrioBtn(priority) {
    const imgSources = {
        urgent: ["../Assets/prio_arrow_white.png", "../Assets/prio_medium.png", "../Assets/prio_low.png"],
        medium: ["../Assets/prio_urgent.png", "../Assets/prio_arrow_white.png", "../Assets/prio_low.png"],
        low: ["../Assets/prio_urgent.png", "../Assets/prio_medium.png", "../Assets/prio_arrowDown_white.png"]
    };

    const bgColors = {
        urgent: '#FF3B30',
        medium: '#FFA800',
        low: '#4CD964'
    };

    resetButtonStyles(); // Setze alle Button-Stile zurück
    selectedPriority = priority; // Aktualisiere die ausgewählte Priorität

    // Setze den Stil für den aktiven Button
    setButtonStyles(priority, bgColors[priority]);

    // Setze die Bildquellen für die Icons
    setImageSources(imgSources[priority]);
}

// Setzt alle Button-Stile zurück
function resetButtonStyles() {
    const buttons = ['btn-urgent', 'btn-medium', 'btn-low'];
    buttons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        button.style.backgroundColor = '#ffffff'; // Standard-Hintergrundfarbe
        button.classList.remove('active'); // Entferne die aktive Klasse
    });
}

// Setzt den Stil für den spezifischen Button
function setButtonStyles(priority, bgColor) {
    const buttonId = `btn-${priority}`;
    const button = document.getElementById(buttonId);
    if (button) {
        button.style.backgroundColor = bgColor;
        button.classList.add('active'); // Füge die aktive Klasse hinzu
    }
}

// Aktualisiert die Bildquellen der Icons
function setImageSources([urgentImgSrc, mediumImgSrc, lowImgSrc]) {
    document.getElementById("urgent-img").src = urgentImgSrc;
    document.getElementById("medium-img").src = mediumImgSrc;
    document.getElementById("low-img").src = lowImgSrc;
}

// Speichert die ausgewählte Priorität
function savePriority() {
    const task = getCurrentTask(); // Lade den aktuellen Task
    if (!task) {
        console.error('Kein aktueller Task gefunden!');
        return;
    }

    task.priority = selectedPriority; // Aktualisiere die Priorität des Tasks

    // Speichere die Änderungen im localStorage
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

    alert('Priorität erfolgreich gespeichert!');
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


function enableUserEdit() {
    const modalAssignedUsers = document.getElementById('modalAssignedUsers'); // Stelle sicher, dass dieses Element existiert
    modalAssignedUsers.innerHTML = `
        <div onclick="openDropDownMenuUser()" class="drop-down">
            <div>Select contacts to assign</div>
            <div>
                <img class="drop-down-arrow" id="drop-down-arrow-contacts" src="../Assets/arrow_drop_downaa (1).png" alt="Arrow down"/>
            </div>
        </div>
        <div class="contact-list-container" id="contact-list" style="display: none;"></div>
        <div id="addedUsers" class="added-users"></div>
    `;

    // Benutzer-Dropdown initialisieren
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



function renderDropdownUsers(loadedContacts, selectedUsers) {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = ""; // Zurücksetzen der Liste

    loadedContacts.forEach((user, index) => {
        const isChecked = selectedUsers.some(selected => selected.name === user.name);
        contactList.innerHTML += `
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
    });
}
function getInitials(name) {
    const nameParts = name.trim().split(' ');
    if (nameParts.length > 1) {
        return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase(); // Vor- und Nachname
    }
    return nameParts[0][0].toUpperCase(); // Nur Vorname
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
    const user = loadedContacts[index]; // Zugriff auf den Benutzer im Array
    const checkbox = document.querySelectorAll('.contact input[type="checkbox"]')[index];

    if (!user) {
        console.error(`User not found at index ${index}`);
        return;
    }

    if (checkbox.checked) {
        // Benutzer zur Liste hinzufügen
        if (!selectedUsers.some(u => u.name === user.name)) {
            selectedUsers.push(user);
        }
    } else {
        // Benutzer aus der Liste entfernen
        selectedUsers = selectedUsers.filter(u => u.name !== user.name);
    }

    // Aktualisiere die Ansicht der hinzugefügten Benutzer
    addedUsers();
}


function addedUsers() {
    const addedUsersContainer = document.getElementById("addedUsers");
    if (!addedUsersContainer) {
        console.error('Element "addedUsers" not found!');
        return;
    }

    addedUsersContainer.innerHTML = ""; // Container zurücksetzen

    // Nur Benutzer anzeigen, die in selectedUsers sind
    selectedUsers.forEach(user => {
        addedUsersContainer.innerHTML += `
            <div class="user-avatar" style="background-color: ${user.color};">${user.initialien}</div>
        `;
    });
}




function openDropDownMenuUser() {
    const contactList = document.getElementById('contact-list');
    const dropDownArrowContacts = document.getElementById('drop-down-arrow-contacts');

    // Wechsel zwischen "anzeigen" und "verbergen"
    if (contactList.style.display === 'none' || !contactList.style.display) {
        contactList.style.display = 'block'; // Dropdown anzeigen
        dropDownArrowContacts.src = "../Assets/arrow_drop_up.png"; // Nach oben zeigende Pfeil-Ikone
    } else {
        contactList.style.display = 'none'; // Dropdown verbergen
        dropDownArrowContacts.src = "../Assets/arrow_drop_downaa (1).png"; // Nach unten zeigende Pfeil-Ikone
    }
}

function enableSubtaskEdit() {
    const modalSubtasks = document.getElementById('modalSubtasks');

    if (!modalSubtasks) {
        console.error('Element "modalSubtasks" nicht gefunden!');
        return;
    }

    // Aktuellen Task aus dem Speicher abrufen
    const task = getCurrentTask();

    if (!task) {
        console.error('Kein Task gefunden, um Subtasks anzuzeigen.');
        return;
    }

    // Lade bestehende Subtasks des Tasks in die globale Liste
    subtaskList = task.subtasks || [];

    // HTML für das Eingabefeld zum Hinzufügen eines neuen Subtasks
    const addNewSubtaskHTML = `
        <div class="add-subtask-container">
            <div class="subtask-container">
                <input oninput="toggleButtonVisibility()" class="subtask-input" type="text" placeholder="Add new subtask" id="newSubtask"/>
                <img onclick="toggleButtonVisibility(true)" id="plusButton" class="plus-img" src="../Assets/Subtasks +.png" alt="Add"/>
                <button class="add-subtask" id="confirmButton" onclick="addSubtasks()">
                    <img src="../Assets/check_blue.png" alt="Confirm"/>
                </button>
                <span class="linie" id="linie" onclick="cancelSubtask()">|</span>
                <button class="cancel-subtask" id="cancelTask" onclick="cancelSubtask()">
                    <img src="../Assets/iconoir_cancel.png" alt="Cancel"/>
                </button>
            </div>
        </div>
        <div id="subtaskList" class="subtask-list"></div>
    `;

    modalSubtasks.innerHTML = addNewSubtaskHTML;

    // Vorhandene Subtasks rendern
    renderExistingSubtasks();
}


function renderExistingSubtasks() {
    const subtaskListContainer = document.getElementById('subtaskList');
    subtaskListContainer.innerHTML = ''; // Vorherige Liste leeren

    subtaskList.forEach((subtask, index) => {
        const isChecked = document.getElementById(`subtask-checkbox-${index}`)?.checked || false;

        const subtaskHTML = `<div class="subtask-label" id="subtask-${index}">
                <div class="subtask">
                    <span class="subtask-text">${subtask}</span>
                    <div class="images-container">
                        <img id="edit-subtask-img" onclick="editSubtask(${index})" src="../Assets/edit.png" alt="Edit Icon">
                        <hr>
                        <button class="delete-btn" onclick="deleteSubtask(${index})"><img id="delete-subtask" src="../Assets/delete.png" alt="Delete Icon"></button>
                    </div>
                </div>
            </div>
        `;
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

    // Füge neuen Subtask zur Liste hinzu
    subtaskList.push(subtaskText);

    // Render Subtasks erneut
    renderExistingSubtasks();

    // Eingabefeld zurücksetzen
    newSubtaskInput.value = '';
    toggleButtonVisibility(false);
}

function deleteSubtask(index) {
    // Entferne den Subtask aus der Liste
    subtaskList.splice(index, 1);

    // Render Subtasks erneut
    renderExistingSubtasks();
}

function editSubtask(index) {
    const subtaskItem = document.getElementById(`subtask-${index}`);
    const subtaskText = subtaskList[index];

    // Ersetze den Subtask mit einem Eingabefeld
    subtaskItem.innerHTML = `
        <input type="text" value="${subtaskText}" id="editSubtaskInput-${index}" class="subtask-edit-input"/>
        <div class="images-container" id="images-container">
           
           <img id="edit-subtask-img" onclick="saveSubtask(${index})" src="../Assets/check_blue.png" alt="Save"/>
           <hr>
           <button onclick="cancelEditSubtask(${index}, '${subtaskText}')">
               <img src="../Assets/iconoir_cancel.png" alt="Cancel"/>
           </button>
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

    // Aktualisiere den Subtask in der Liste
    subtaskList[index] = updatedText;

    // Render Subtasks erneut
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

// Modal schließen und OK-Button entfernen
function closeTaskModal() {
    const modalFooter = document.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = ''; // Alle Buttons im Footer entfernen
    }
    document.getElementById('taskModal').style.display = 'none';
}

// Buttons für Speichern hinzufügen
function addSaveAndCancelButtons(isEditMode) {
    const modalFooter = document.querySelector('.modal-footer');

    if (isEditMode) {
        // Zeige den OK-Button für den Bearbeitungsmodus
        modalFooter.innerHTML = `
            <button onclick="saveTaskChanges()" class="okTask-btn" id="oktaskBtn">OK <img src="../Assets/check.png" alt="Save"></button>
        `;
    } else {
        // Zeige Löschen- und Bearbeiten-Schaltflächen für den Anzeigemodus
        modalFooter.innerHTML = `
            <img
                onclick="deleteTask()"
                class="delete-button"
                src="../Assets/delete_black.png"
                alt="Delete Icon"
            />
            <span class="line">|</span>
            <img
                onclick="editTaskDetails()"
                class="edit-button"
                src="../Assets/edit_black.png"
                alt="Edit Icon"
            />
        `;
    }
}



function saveTaskChanges() {
    const updatedTask = gatherUpdatedTaskDetails();
    updateTaskInLocalStorage(updatedTask);

    // Fortschritt direkt aktualisieren
    updateProgressBar(updatedTask);

    // Board aktualisieren
    refreshBoard();

    // Modal schließen
    closeTaskModal();
}

function refreshBoard() {
    ['todo', 'in-progress', 'await-feedback', 'done'].forEach(loadTasks);
}


// Änderungen sammeln
function gatherUpdatedTaskDetails() {
    const updatedTitle = document.getElementById('editTitle').value;
    const updatedDescription = document.getElementById('editDescription').value;
    const updatedDueDate = document.getElementById('editDueDate').value;

    // Benutzer sammeln
    const updatedUsers = selectedUsers.map(user => ({
        name: user.name,
        color: user.color,
    }));

    // Subtasks sammeln
    const updatedSubtasks = subtaskList.map(subtask => subtask);

    return {
        id: currentTaskId,
        title: updatedTitle,
        description: updatedDescription,
        dueDate: updatedDueDate,
        assignedUsers: updatedUsers,
        priority: selectedPriority || 'medium',
        subtasks: updatedSubtasks,
        completedSubtasks: updatedSubtasks.filter((subtask, index) => 
            document.getElementById(`subtask-checkbox-${index}`)?.checked
        ).length,
    };
}

// Aufgabe im localStorage aktualisieren

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


// Board aktualisieren
function refreshBoard() {
    // Tasks der aktuellen Spalte neu laden
    ['todo', 'in-progress', 'await-feedback', 'done'].forEach(loadTasks);
}


// Board nach Änderungen aktualisieren
function refreshBoard() {
    alert('Änderungen erfolgreich gespeichert!');
    window.location.reload(); // Seite neu laden
}

// Ursprüngliche Task-Details erneut laden
function reloadTaskDetails() {
    closeTaskModal();
    openTaskDetails(currentTaskId);
}

function closeTaskModal() {
    const modalFooter = document.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = ''; // Entfernt alle Buttons im Footer
    }

    // Modal ausblenden
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
