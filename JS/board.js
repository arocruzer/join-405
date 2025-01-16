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
            <div class="user-story-card">
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
                        ${task.assignedUsers.map(user => `<div class="user-avatar" style="background-color: ${user.color};">${user.name[0]}</div>`).join('')}
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

function searchTasks() {
    let searchText = '';
    
    // Überprüfen, welches Input-Feld aktiv ist
    const searchInputs = document.querySelectorAll('#search');
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



function openTaskDetails(taskId) {
    const tasks = [...JSON.parse(localStorage.getItem('todo') || "[]"), 
                   ...JSON.parse(localStorage.getItem('in-progress') || "[]"),
                   ...JSON.parse(localStorage.getItem('await-feedback') || "[]"),
                   ...JSON.parse(localStorage.getItem('done') || "[]")];
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        currentTaskId = taskId;
        document.getElementById('modalTitle').innerText = task.title;
        document.getElementById('modalDescription').innerText = task.description;
        const dueDateElement = document.getElementById('modalDueDate');
        dueDateElement.innerText = task.dueDate ? formatDate(task.dueDate) : 'Kein Fälligkeitsdatum';
        document.getElementById('modalPriority').innerHTML = formatPriority(task.priority);
        document.getElementById('modalAssignedUsers').innerHTML = renderAssignedUsers(task.assignedUsers);
        const subtaskList = document.getElementById('modalSubtasks');
        if (Array.isArray(task.subtasks) && task.subtasks.length > 0) {
            subtaskList.innerHTML = task.subtasks.map((subtask, index) => `
                <label class="subtask-label">
                    <input type="checkbox" id="subtask-${taskId}-${index}"
                           ${task.completedSubtasks > index ? 'checked' : ''}
                           onchange="updateSubtaskCompletion('${taskId}', ${index})">
                    ${subtask}
                </label>
            `).join('');
        } else {
            subtaskList.innerHTML = '<p>Keine Subtasks verfügbar</p>';
        }
        
        document.getElementById('taskModal').style.display = 'block';
        updateProgressBar(task);
    }
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
function openTaskDetails(taskId) {
    const tasks = [...JSON.parse(localStorage.getItem('todo') || "[]"), 
                   ...JSON.parse(localStorage.getItem('in-progress') || "[]"),
                   ...JSON.parse(localStorage.getItem('await-feedback') || "[]"),
                   ...JSON.parse(localStorage.getItem('done') || "[]")];
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        currentTaskId = taskId;
        document.getElementById('modalTitle').innerText = task.title;
        document.getElementById('modalDescription').innerText = task.description;
        const dueDateElement = document.getElementById('modalDueDate');
        dueDateElement.innerText = task.dueDate ? formatDate(task.dueDate) : 'Kein Fälligkeitsdatum';
        document.getElementById('modalPriority').innerHTML = formatPriority(task.priority);
        document.getElementById('modalAssignedUsers').innerHTML = renderAssignedUsers(task.assignedUsers);
        const subtaskList = document.getElementById('modalSubtasks');
        if (Array.isArray(task.subtasks) && task.subtasks.length > 0) {
            subtaskList.innerHTML = task.subtasks.map((subtask, index) => `
                <label class="subtask-label">
                    <input type="checkbox" id="subtask-${taskId}-${index}"
                           ${task.completedSubtasks > index ? 'checked' : ''}
                           onchange="updateSubtaskCompletion('${taskId}', ${index})">
                    ${subtask}
                </label>
            `).join('');
        } else {
            subtaskList.innerHTML = '<p>Keine Subtasks verfügbar</p>';
        }
        
        document.getElementById('taskModal').style.display = 'block';
        updateProgressBar(task);
    }
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
    
    if (window.innerWidth < 768) {
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

// Task ziehen starten
function drag(event) {
    draggedTaskId = event.target.id; // Speichert die ID der gezogenen Aufgabe
}

// Drag-Überprüfung erlauben
function allowDrop(event) {
    event.preventDefault(); // Verhindert Standardverhalten, um Ablegen zu ermöglichen
}

// Task ablegen
function drop(event) {
    event.preventDefault(); // Verhindert Standardverhalten

    const targetColumnId = event.target.closest('.column').id; // Zielt auf die Spalte ab, in der die Aufgabe abgelegt wurde
    const draggedTaskElement = document.getElementById(draggedTaskId);

    if (draggedTaskElement && targetColumnId) {
        const sourceColumnId = draggedTaskElement.closest('.column').id;

        // Aufgabe von der Quellspalte entfernen
        let sourceTasks = JSON.parse(localStorage.getItem(sourceColumnId)) || [];
        const draggedTask = sourceTasks.find(task => task.id === draggedTaskId);
        sourceTasks = sourceTasks.filter(task => task.id !== draggedTaskId);
        localStorage.setItem(sourceColumnId, JSON.stringify(sourceTasks));

        // Aufgabe zur Zielspalte hinzufügen
        let targetTasks = JSON.parse(localStorage.getItem(targetColumnId)) || [];
        if (draggedTask) {
            targetTasks.push(draggedTask);
            localStorage.setItem(targetColumnId, JSON.stringify(targetTasks));

            // UI aktualisieren
            loadTasks(sourceColumnId);
            loadTasks(targetColumnId);
        }
    }
}

function editTask() {
    const taskId = currentTaskId;
    const allColumns = ['todo', 'in-progress', 'await-feedback', 'done'];
    let task = null;
    let columnId = null;

    // Task und Spalte finden
    for (const column of allColumns) {
        let tasks = JSON.parse(localStorage.getItem(column)) || [];
        const foundTask = tasks.find(t => t.id === taskId);
        if (foundTask) {
            task = foundTask;
            columnId = column;
            break;
        }
    }

    if (task) {
        // Modal erstellen und befüllen
        const modalContent = `
            <div class="modal-edit-content">
                <h2>Edit Task</h2>
                
                <label for="editTitle">Title:</label>
                <input type="text" id="editTitle" value="${task.title}">
                
                <label for="editDescription">Description:</label>
                <textarea id="editDescription">${task.description}</textarea>

                <div class="input-containers">
                  <p>Due date<span>*</span></p>
                  <input class="date-input" type="date" id="date-input" />
                </div>
                
                <div class="prio-container">
                  <p>Prio</p>
                  <div class="prio-btn-container">
                    <button onclick="changeColorPrioBtn('urgent') "id="btn-urgent" class="btn-prio-urgent">Urgent<img src="../Assets/prio_urgent.png" alt="Urgent" /></button>
                    <button onclick="changeColorPrioBtn('medium')" id="btn-medium" class="btn-prio-medium">Medium<img src="../Assets/prio_medium.png" alt="Medium" /></button>
                    <button onclick="changeColorPrioBtn('low')"id="btn-low" class="btn-prio-low">Low<img src="../Assets/prio_low.png" alt="Low" /></button>
                  </div>
                </div>
                
                
               <div class="input-containers">
                  <p>Assigned to</p>
                  <div onclick="openDropDownMenuUser(), addUserToTask()" class="drop-down">
                    <div>Select contacts to assign</div>
                    <div>
                      <img class="drop-down-arrow" id="drop-down-arrow" src="../Assets/arrow_drop_downaa (1).png" alt="Arrow down"/>
                    </div>
                  </div>
                  <div class="contact-list-container" id="contact-list"></div>
                  <div id="addedUers"></div>
                </div>
                <div class="input-containers">
                  <p>Subtasks</p>
                  <div class="subtask-container">
                    <input oninput="toggleButtonVisibility()" class="subtusk-input" type="text" placeholder="Add new subtask" id="newSubtask"/>
                    <img onclick="toggleButtonVisibility(true)" id="plusButton" class="plus-img" src="../Assets/Subtasks +.png" alt=""/>
                    <button class="add-subtask" id="confirmButton" onclick="addSubtask()">
                      <img src="../Assets/check_blue.png" alt="" />
                    </button>
                    <span class="linie" id="linie" onclick="cancelSubtask()">|</span>
                    <button class="cancle-subtask" id="cancelButton" onclick="cancelSubtask()">
                      <img src="../Assets/iconoir_cancel.png" alt="" />
                    </button>
                  </div>
                  <div id="subtaskLabels" class="subtask-label-container"></div>
                </div>
                
                
                <button onclick="saveTaskEdits('${taskId}', '${columnId}')">Save</button>
                <button onclick="closeEditModal()">Cancel</button>
            </div>
        `;

        // Modal anzeigen
        const modal = document.createElement("div");
        modal.id = "editModal";
        modal.className = "modal";
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        modal.style.display = "block";
    }
}

// Benutzer hinzufügen
function addUser() {
    const userName = document.getElementById("newUser").value.trim();
    if (userName) {
        const userList = document.getElementById("userList");
        const userItem = document.createElement("div");
        userItem.className = "user-item";
        userItem.innerHTML = `
            <span>${userName}</span>
            <button onclick="removeUser('${userName}')">Remove</button>
        `;
        userList.appendChild(userItem);
        document.getElementById("newUser").value = "";
    }
}

// Benutzer entfernen
function removeUser(userName) {
    const userItems = document.querySelectorAll("#userList .user-item");
    userItems.forEach(item => {
        if (item.innerText.includes(userName)) {
            item.remove();
        }
    });
}

function saveTaskEdits(taskId, columnId) {
    const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
        // Aktualisierte Details
        tasks[taskIndex].title = document.getElementById("editTitle").value;
        tasks[taskIndex].description = document.getElementById("editDescription").value;
        tasks[taskIndex].priority = document.getElementById("editPriority").value;
        tasks[taskIndex].dueDate = document.getElementById("editDueDate").value;
        tasks[taskIndex].assignedUsers = Array.from(document.querySelectorAll("#userList .user-item span"))
            .map(userSpan => ({ name: userSpan.innerText, color: "#ccc" })); // Standardfarbe

        // Änderungen speichern
        localStorage.setItem(columnId, JSON.stringify(tasks));
        loadTasks(columnId); // UI aktualisieren
        closeEditModal(); // Modal schließen
    }
}

function closeEditModal() {
    const modal = document.getElementById("editModal");
    if (modal) {
        modal.remove();
    }
}
