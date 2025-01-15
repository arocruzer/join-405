let dropDownArrow = document.getElementById("drop-down-arrow");
let concatList = document.getElementById("contact-list");
let categoryList = document.getElementById("category-list");
let btnUrgent = document.getElementById("btn-urgent");
let btnMedium = document.getElementById("btn-medium");
let btnLow = document.getElementById("btn-low");
let subtaskInput = document.getElementById("subtask-input");
let addSubtaskBtn = document.getElementById("add-subtask-btn");
let subtaskList = [];
let selectedUsers = [];
let selectedPriority = '';
let state = 1;
/* let page = "add-task"; */
let selectedCategory = "";
const categorySelect = document.getElementById('categorySelect');
const selectedCategoryElement = document.getElementById('selected-category');
let dropDownArow = document.getElementById("drop-down");


renderSubtasks();


function openDropDownMenuUser() {
    switch (state) {
        case 1:
            concatList.style.display = 'block';
            dropDownArrow.src = "../Assets/arrow_drop_downaa.png";
            state = 2;
            addUserToTask();
            break;
        case 2:
            concatList.style.display = 'none';
            dropDownArrow.src = "../Assets/arrow_drop_downaa (1).png";
            state = 1;
            break;
    }
}

function openDropDownMenuCategory() {
    switch (state) {
        case 1:
            categoryList.style.display = 'block';
            dropDownArrow.src = "../Assets/arrow_drop_downaa.png";
            state = 2;
            break;
        case 2:
            categoryList.style.display = 'none';
            dropDownArrow.src = "../Assets/arrow_drop_downaa (1).png";
            state = 1;
            break;
    }
}
function getInitials() {
    
}
function addUserToTask() {
    concatList.innerHTML = ""; 

    loadedContacts.forEach((user, index) => {
        let isChecked = selectedUsers.includes(user) ? "checked" : "";

        let initials = user.initialien;

        let color = user.color;

        concatList.innerHTML += renderAddToTaskContacts(color, initials, user, index, isChecked);
    });
}

function checkBoxUserTask(index) {
    const user = loadedContacts[index];
    const checkbox = document.querySelectorAll('.contact input[type="checkbox"]')[index];

    if (checkbox.checked) {
        if (!selectedUsers.includes(user)) {
            selectedUsers.push(user);
        }
    } else {
        selectedUsers = selectedUsers.filter((u) => u !== user);
    }

    addedUsers();
}

function addedUsers() {
  let addedUsers = document.getElementById("addedUers");
  addedUsers.innerHTML = "";

  selectedUsers.forEach((user) => {
      let initials = user.initialien;

      let color = user.color;  

      addedUsers.innerHTML += renderAddedUsers(color, initials);
  });
}

// Öffnen und Schließen des Dropdowns
function toggleCategorySelect() {
    categorySelect.classList.toggle('hidden');
    dropDownArow.classList.toggle('rotated');
}

// Auswahl der Kategorie und Dropdown schließen
function selectCategory(category) {
    selectedCategory = category;
    selectedCategoryElement.innerText = category;
    categorySelect.classList.add('hidden');
    dropDownArow.classList.remove('rotated');
}




subtaskInput.addEventListener('input', () => {
    if (subtaskInput.value.trim()) {
        addSubtaskBtn.style.display = 'none';
        document.getElementById('confirm-subtask-btn').style.display = 'inline';
        document.getElementById('cancel-subtask-btn').style.display = 'inline';
    } else {
        addSubtaskBtn.style.display = 'inline';
        document.getElementById('confirm-subtask-btn').style.display = 'none';
        document.getElementById('cancel-subtask-btn').style.display = 'none';
    }
});

function confirmSubtask() {
    const subtaskText = subtaskInput.value.trim();
    if (subtaskText) {
        subtaskList.push(subtaskText);
        subtaskInput.value = '';
        renderSubtasks();
    }
}

function cancelSubtask() {
    subtaskInput.value = '';
    addSubtaskBtn.style.display = 'inline';
    document.getElementById('confirm-subtask-btn').style.display = 'none';
    document.getElementById('cancel-subtask-btn').style.display = 'none';
}

function deleteSubtask(index) {
    subtaskList.splice(index, 1);
    renderSubtasks();
}

function changeColorPrioBtn(priority) {
    selectedPriority = priority;  // Priorität wird korrekt gespeichert
    if (priority === 'urgent') {
        btnUrgent.style.backgroundColor = '#FF3B30';
        btnMedium.style.backgroundColor = '#ffffff';
        btnLow.style.backgroundColor = '';
    } else if (priority === 'medium') {
        btnMedium.style.backgroundColor = '#FFA800';
        btnUrgent.style.backgroundColor = '';
        btnLow.style.backgroundColor = '';
    } else if (priority === 'low') {
        btnLow.style.backgroundColor = '#4CD964';
        btnMedium.style.backgroundColor = '#ffffff';
        btnUrgent.style.backgroundColor = '';
    }
}

function toggleButtonVisibility(forceShow) {
    const taskInput = document.getElementById('newSubtask');
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');
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

function addSubtask() {
    const taskInput = document.getElementById('newSubtask');
    const taskValue = taskInput.value.trim();
    if (taskValue === '') return;

    subtaskList.push(taskValue);
    renderSubtasks();

    taskInput.value = '';
    toggleButtonVisibility();
}

function cancelSubtask() {
    document.getElementById('newSubtask').value = '';
    toggleButtonVisibility();
}

function editSubtask(button) {
    const listItem = button.parentElement;
    const inputField = listItem.querySelector('input');
    inputField.removeAttribute('readonly');
    inputField.focus();
    button.innerText = `<img src="../Assets/check.png" alt="check Icon">`;
    button.onclick = function () {
        const index = Array.from(listItem.parentElement.children).indexOf(listItem);
        subtaskList[index] = inputField.value.trim();
        inputField.setAttribute('readonly', true);
        button.innerText =`<img src="../Assets/edit.png" alt="Edit Icon">`;
        button.onclick = function () { editSubtask(button); };
    };
}
function renderSubtasks() {
    const subtaskContainer = document.getElementById("subtaskLabels");
    subtaskContainer.innerHTML = '';
    subtaskList.forEach((subtask, index) => {
        subtaskContainer.innerHTML += `
            <div class="subtask-label">
                <input type="text" value="${subtask}" readonly>
                <img onclick="editSubtask(this)" src="../Assets/edit.png" alt="Edit Icon">
                <button onclick="deleteSubtask(${index})"><img src="../Assets/delete.png" alt="delete Icon"></button>
            </div>
        `;
    });
}


function getFormInputValue(inputId) {
    return document.getElementById(inputId).value.trim();
}

function countSubtasks(subtaskList) {
    const totalSubtasks = subtaskList.length;
    const completedSubtasks = subtaskList.filter(subtask => subtask.completed).length;
    return { completedSubtasks, totalSubtasks };
}

function createNewTask(title, description, dueDate, priority, category, subtaskList, selectedUsers) {
    const { completedSubtasks, totalSubtasks } = countSubtasks(subtaskList);
    return {
        id: `task-${Date.now()}`,
        title,
        description,
        dueDate,
        priority,
        category,
        subtasks: subtaskList,
        completedSubtasks,
        totalSubtasks,
        assignedUsers: selectedUsers
    };
}

function saveTaskToLocalStorage(columnId, task) {
    const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
    tasks.push(task);
    localStorage.setItem(columnId, JSON.stringify(tasks));
}

function addTask() {
    const title = getFormInputValue('title-input');
    const description = getFormInputValue('description');
    const dueDate = getFormInputValue('date-input');
    const priority = selectedPriority || 'medium';
    const category = selectedCategory;
    if (!title || !dueDate || !priority || !category) {
        alert('Bitte füllen Sie alle Pflichtfelder aus.');
        return;
    }
    const newTask = createNewTask(title, description, dueDate, priority, category, subtaskList, selectedUsers);
    const currentColumn = localStorage.getItem('currentColumn') || 'todo';
    saveTaskToLocalStorage(currentColumn, newTask);
    window.location.href = 'board.html';
}
