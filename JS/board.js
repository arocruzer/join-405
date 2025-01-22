let selectedUsers = [];
let searchText = '';
let currentTaskId = null;
let draggedTaskId = null;


function loadTasks(columnId) {
    const container = document.getElementById(`${columnId}-tasks`);
    container.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem(columnId)) || [];

    tasks.forEach(task => {
        container.innerHTML += renderTask(task);
    });
    updateTaskVisibilityById(columnId);
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
            return "../Assets/prio_medium_orang.png";
        case "urgent":
            return "../Assets/prio_urgent.png";
        default:
            return "../Assets/prio_medium_orang.png";
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
    const visibleTasks = container.querySelectorAll('.user-card:not([style*="display: none"])');
    taskList.style.display = visibleTasks.length === 0 ? 'block' : 'none';
}


function openInputPage(columnId) {
    localStorage.setItem('currentColumn', columnId);
    window.location.href = "/HTML/add-task.html";
}


function searchFromSearchTaskInput() {
    const searchInput = document.querySelector('#searchTask');
    const searchText = searchInput && searchInput.offsetParent !== null
        ? searchInput.value.trim().toLowerCase()
        : '';
    document.querySelectorAll('.user-card').forEach(task => {
        const taskTitle = task.querySelector('h4')?.textContent.toLowerCase() || '';
        task.style.display = (searchText.length < 3 || taskTitle.includes(searchText)) ? 'block' : 'none';
    });
    ['todo', 'in-progress', 'await-feedback', 'done'].forEach(updateTaskVisibilityById);
}


function searchFromSearchInput() {
    const searchInput = document.querySelector('#search');
    const searchText = searchInput && searchInput.offsetParent !== null
        ? searchInput.value.trim().toLowerCase()
        : '';
    document.querySelectorAll('.user-card').forEach(task => {
        const taskTitle = task.querySelector('h4')?.textContent.toLowerCase() || '';
        task.style.display = (searchText.length < 3 || taskTitle.includes(searchText)) ? 'block' : 'none';
    });
    ['todo', 'in-progress', 'await-feedback', 'done'].forEach(updateTaskVisibilityById);
}


window.addEventListener("load", function () {
    ['todo', 'in-progress', 'await-feedback', 'done'].forEach(loadTasks);
});


function formatDate(dateString) {
    if (!dateString) {
        console.warn('Kein Datum übergeben.');
        return 'Datum nicht verfügbar';
    }

    const [year, month, day] = dateString.split('-');

    if (!year || !month || !day) {
        console.warn('Ungültiges Datumsformat:', dateString);
        return 'Ungültiges Datum';
    }

    return `${day}/${month}/${year}`;
}


function formatPriority(priorityText) {
    let priorityIcon;
    switch (priorityText.toLowerCase()) {
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
    const defaultStyle = {
        text: "Uncategorized",
        class: "uncategorized",
    };
    const style = categoryStyles[category] || defaultStyle;
    element.innerText = style.text;
    element.className = style.class;
}


// Hauptfunktion
function openTaskDetails(taskId) {
    const tasks = getAllTasks();
    const task = findTaskById(tasks, taskId);

    if (task) {
        currentTaskId = taskId;
        updateModalContent(task);
        document.getElementById('taskModal').style.display = 'block';
        toggleModalLayout(false);
        updateProgressBar(task);
        addSaveAndCancelButtons(false);
    }
}


function getAllTasks() {
    return [...JSON.parse(localStorage.getItem('todo') || "[]"), 
            ...JSON.parse(localStorage.getItem('in-progress') || "[]"),
            ...JSON.parse(localStorage.getItem('await-feedback') || "[]"),
            ...JSON.parse(localStorage.getItem('done') || "[]")];
}


function findTaskById(tasks, taskId) {
    return tasks.find(task => task.id === taskId);
}


function updateModalContent(task) {
    updateModalCategory(task);
    updateModalTitleAndDescription(task);
    updateModalDueDate(task);
    updateModalPriority(task);
    updateModalAssignedUsers(task);
    updateModalSubtasks(task);
}


function updateModalCategory(task) {
    const modalCategory = document.getElementById('modalCategory');
    modalCategory.innerText = task.category || "No Category";
    modalCategory.className = `category-label ${task.categoryClass || ""}`;
    setCategoryStyle("modalCategory", task.category);
}


function updateModalTitleAndDescription(task) {
    document.getElementById('modalTitle').innerText = task.title;
    document.getElementById('modalDescription').innerText = task.description;
}


function updateModalDueDate(task) {
    const dueDateElement = document.getElementById('modalDueDate');
    dueDateElement.innerText = task.dueDate ? formatDate(task.dueDate) : 'Kein Fälligkeitsdatum';
}


function updateModalPriority(task) {
    document.getElementById('modalPriority').innerHTML = formatPriority(task.priority);
}


function updateModalAssignedUsers(task) {
    document.getElementById('modalAssignedUsers').innerHTML = renderAssignedUsers(task.assignedUsers);
}


function updateModalSubtasks(task) {
    const subtaskList = document.getElementById('modalSubtasks');
    if (Array.isArray(task.subtasks) && task.subtasks.length > 0) {
        subtaskList.innerHTML = task.subtasks.map((subtask, index) => `
            <label class="subtasks-label">
                <input type="checkbox" id="subtask-${task.id}-${index}"
                       ${task.completedSubtasks > index ? 'checked' : ''}
                       onchange="updateSubtaskCompletion('${task.id}', ${index})">
                ${subtask}
            </label>
        `).join('');
    } else {
        subtaskList.innerHTML = '<p>Keine Subtasks verfügbar</p>';
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
        headerBoard.classList.remove('hidden');
        headerBoardPlus.classList.add('hidden');
    } else {
        headerBoard.classList.add('hidden'); 
        headerBoardPlus.classList.remove('hidden');
    }
}


window.addEventListener('resize', addButton);
window.addEventListener('DOMContentLoaded', addButton);


function drag(event) {
    draggedTaskId = event.target.id;
    event.dataTransfer.effectAllowed = "move";
}


function allowDrop(event) {
    event.preventDefault();
    const taskContainer = event.target.closest('.task-container');
    if (taskContainer) {
        document.querySelectorAll('.task-container.highlight-drop').forEach((container) => {
            container.classList.remove('highlight-drop');
        });
        taskContainer.classList.add('highlight-drop');
    }
}


function removeHighlight() {
    document.querySelectorAll('.task-container.highlight-drop').forEach((container) => {
        container.classList.remove('highlight-drop');
    });
}


function drop(event) {
    event.preventDefault();
    const targetTaskContainer = getClosestTaskContainer(event.target);
    removeHighlight();
    if (targetTaskContainer && draggedTaskId) {
        const draggedTaskElement = document.getElementById(draggedTaskId);
        const sourceTaskContainer = getSourceTaskContainer(draggedTaskElement);

        if (draggedTaskElement && targetTaskContainer !== sourceTaskContainer) {
            moveTaskInDOM(draggedTaskElement, targetTaskContainer);
            updateLocalStorage(sourceTaskContainer, targetTaskContainer, draggedTaskId);
            refreshUI(sourceTaskContainer, targetTaskContainer);
        }
    }
}


function getClosestTaskContainer(element) {
    return element.closest('.task-container');
}


function getSourceTaskContainer(draggedTaskElement) {
    return draggedTaskElement.closest('.task-container');
}


function moveTaskInDOM(draggedTaskElement, targetTaskContainer) {
    targetTaskContainer.appendChild(draggedTaskElement);
}


function updateLocalStorage(sourceTaskContainer, targetTaskContainer, taskId) {
    const sourceColumnId = sourceTaskContainer.closest('.column').id;
    const targetColumnId = targetTaskContainer.closest('.column').id;

    const sourceTasks = JSON.parse(localStorage.getItem(sourceColumnId)) || [];
    const targetTasks = JSON.parse(localStorage.getItem(targetColumnId)) || [];

    const taskIndex = sourceTasks.findIndex((task) => task.id === taskId);
    if (taskIndex > -1) {
        targetTasks.push(sourceTasks.splice(taskIndex, 1)[0]);
        localStorage.setItem(sourceColumnId, JSON.stringify(sourceTasks));
        localStorage.setItem(targetColumnId, JSON.stringify(targetTasks));
    }
}


function refreshUI(sourceTaskContainer, targetTaskContainer) {
    const sourceColumnId = sourceTaskContainer.closest('.column').id;
    const targetColumnId = targetTaskContainer.closest('.column').id;

    loadTasks(sourceColumnId);
    loadTasks(targetColumnId);
}


document.querySelectorAll('.task-container').forEach((taskContainer) => {
    taskContainer.addEventListener('dragleave', removeHighlight);
});













