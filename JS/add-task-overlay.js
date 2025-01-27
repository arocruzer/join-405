let dropDownArrowContacts = document.getElementById("drop-down-arrow-contacts");
let dropDownArrowCategory = document.getElementById("drop-down");
let concatList = document.getElementById("contact-list");
let btnUrgent = document.getElementById("btn-urgent");
let imgUrgent = document.getElementById("urgent-img");
let btnMedium = document.getElementById("btn-medium");
let imgMedium = document.getElementById("medium-img");
let btnLow = document.getElementById("btn-low");
let imgLow = document.getElementById("low-img");
let addSubtaskBtn = document.getElementById("add-subtask-btn");
let subtaskList = [];
let selectedPriority = "";
let contacState = 1;
let categoryState = 1;
let selectedCategory = "";
const categorySelect = document.getElementById("categorySelect");
const selectedCategoryElement = document.getElementById("selected-category");
let body = document.getElementById("body");
let title = document.getElementById("title-input");
let description = document.getElementById("description");
let date =  document.getElementById("date-input");
let titleError = document.getElementById("title-error");
let descriptionError = document.getElementById("description-error");
let dateError = document.getElementById("date-error");
let categoryError = document.getElementById("category-error");

renderSubtasks();

function openDropDownMenuUser() {
  switch (contacState) {
    case 1:
      concatList.style.display = "flex";
      dropDownArrowContacts.src = "../Assets/arrow_drop_downaa.png";
      contacState = 2;
      addUserToTask();
      break;
    case 2:
      concatList.style.display = "none";
      dropDownArrowContacts.src = "../Assets/arrow_drop_downaa (1).png";
      contacState = 1;
      break;
  }
}

function openDropDownMenuCategory() {
  switch (categoryState) {
    case 1:
      categorySelect.style.display = "block";
      dropDownArrowCategory.src = "../Assets/arrow_drop_downaa.png";
      categoryState = 2;
      break;
    case 2:
      categorySelect.style.display = "none";
      dropDownArrowCategory.src = "../Assets/arrow_drop_downaa (1).png";
      categoryState = 1;
      break;
  }
}
function addUserToTask() {
  concatList.innerHTML = "";

  loadedContacts.forEach((user, index) => {
    let isChecked = selectedUsers.includes(user) ? "checked" : "";
    let selectedClass = selectedUsers.includes(user) ? "selected-user" : "";

    let initials = user.initialien; 
    let color = user.color; 

    concatList.innerHTML += renderAddToTaskContacts(color, initials, user, index, isChecked, selectedClass);
  }); 
}

function checkBoxUserTask(index, event) {
  event.stopPropagation(); 

  const user = loadedContacts[index];
  const contactElement = document.querySelectorAll('.contact')[index];
  const checkbox = contactElement.querySelector('input[type="checkbox"]');

  if (event.target.tagName !== "INPUT") {
    checkbox.checked = !checkbox.checked;
  }

  if (checkbox.checked) {
    if (!selectedUsers.includes(user)) {
      selectedUsers.push(user);
    }
    contactElement.classList.add('selected-user');
  } else {
    selectedUsers = selectedUsers.filter((u) => u !== user);
    contactElement.classList.remove('selected-user');
  }

  addedUsers(); 
}

function addedUsers() {
  let addedUsers = document.getElementById("addedUers");
  let maxVisibleUsers = 4;
  addedUsers.innerHTML = "";


  selectedUsers.slice(0, maxVisibleUsers).forEach((user) => {
    let initials = user.initialien;

    let color = user.color;

    addedUsers.innerHTML += renderAddedUsers(color, initials);
    
  });
  if (selectedUsers.length > maxVisibleUsers) {
    let remainingCount = selectedUsers.length - maxVisibleUsers;
    addedUsers.innerHTML += renderAddedUsersPlaceholder(`+${remainingCount}`);
  }
}

function clearTask() {
    title.value = "";
    description.value = "";
    document.getElementById("addedUers").innerHTML = "";
    date.value = "";
    document.getElementById("newSubtask").value = "";
    document.getElementById("subtaskLabels").innerHTML = "";
    document.getElementById("selected-category").innerHTML =
      "Select task category";
    btnMedium.style.backgroundColor = "#FFA800";
    imgMedium.src = "../Assets/prio_medium.png";
    btnLow.style.backgroundColor = "#ffffff";
    imgLow.src = "../Assets/prio_low.png"
    btnUrgent.style.backgroundColor = "#ffffff";
    imgUrgent.src = "../Assets/prio_urgent.png";
  }

// Auswahl der Kategorie und Dropdown schließen
function selectCategory(category) {
  selectedCategory = category;
  selectedCategoryElement.innerText = category;
  categorySelect.style.display = "none";
  categoryError.style.display = "none";
  state = 1;
  dropDownArrowCategory.src = "../Assets/arrow_drop_downaa (1).png";
}

function changeColorPrioBtn(priority) {
  let imgSources = {
    urgent: [
      "../Assets/prio_arrow_white.png",
      "../Assets/prio_line_orange.png",
      "../Assets/prio_low.png",
    ],
    medium: [
      "../Assets/prio_urgent.png",
      "../Assets/prio_medium.png",
      "../Assets/prio_low.png",
    ],
    low: [
      "../Assets/prio_urgent.png",
      "../Assets/prio_line_orange.png",
      "../Assets/prio_arrowDown_white.png",
    ],
  };

  let bgColors = { urgent: "#FF3B30", medium: "#FFA800", low: "#4CD964" };

  resetButtonStyles();
  selectedPriority = priority;
  setButtonStyles(priority, bgColors[priority]);
  setImageSources(imgSources[priority]);
}

function resetButtonStyles() {
  btnUrgent.style.backgroundColor =
    btnMedium.style.backgroundColor =
    btnLow.style.backgroundColor =
      "#ffffff";
}

function setButtonStyles(priority, bgColor) {
  if (priority === "urgent") btnUrgent.style.backgroundColor = bgColor;
  else if (priority === "medium") btnMedium.style.backgroundColor = bgColor;
  else if (priority === "low") btnLow.style.backgroundColor = bgColor;
}

function setImageSources([urgentImgSrc, mediumImgSrc, lowImgSrc]) {
  imgUrgent.src = urgentImgSrc;
  imgMedium.src = mediumImgSrc;
  imgLow.src = lowImgSrc;
}

function toggleButtonVisibility(forceShow) {
  const taskInput = document.getElementById("newSubtask");
  const confirmButton = document.getElementById("confirmButton");
  const cancelButton = document.getElementById("cancelButton");
  const plusButton = document.getElementById("plusButton");
  const linie = document.getElementById("linie");
  linie.style.display = "none";
  confirmButton.style.display = "none";
  cancelButton.style.display = "none";
  plusButton.style.display = "inline";

  if (forceShow || taskInput.value.trim()) {
    confirmButton.style.display = "inline";
    cancelButton.style.display = "inline";
    linie.style.display = "inline";
    plusButton.style.display = "none";
  }
}

function addSubtask() {
  const taskInput = document.getElementById("newSubtask");
  const taskValue = taskInput.value.trim();
  if (taskValue === "") return;

  subtaskList.push(taskValue);
  renderSubtasks();

  taskInput.value = "";
  toggleButtonVisibility();
}

function cancelSubtask() {
  document.getElementById("newSubtask").value = "";
  toggleButtonVisibility();
}

function renderSubtasks() {
  const subtaskContainer = document.getElementById("subtaskLabels");
  if (subtaskContainer) {
  subtaskContainer.innerHTML = "";
  subtaskList.forEach((subtask, index) => {
    subtaskContainer.innerHTML += getSubtasksTemplate(subtask, index);
  });}
}

function editSubtask(index) {
  let editSubtaks = document.getElementById(`edit-subtask-img-${index}`);
  let deleteSubtask = document.getElementById(`delete-subtask-${index}`);
  let imagesContainer = document.getElementById(`images-container-${index}`);
  let confrimEdit = document.getElementById(`confirm-subtask-${index}`);

  editSubtaks.style.display = "none";
  confrimEdit.style.display = "flex";
  deleteSubtask.src = "../Assets/delete.png";
  imagesContainer.style.flexDirection = "row-reverse";

  inputOnFocus(index);
}
function inputOnFocus(index) {
  let editSubtask = document.getElementById(`edit-subtask-${index}`);
  let subtaskList = document.getElementById(`subtask-list-${index}`);
  let subtaskLabel = document.getElementById(`subtask-label-${index}`);
  let length = editSubtask.value.length;

  editSubtask.focus();
  editSubtask.setSelectionRange(length, length);
  editSubtask.style.backgroundColor = "white";
  subtaskLabel.style.backgroundColor = "white";
  subtaskList.style.borderBottom = "1px solid #29abe2";
}
function confirmSubtask(index) {
  const editInput = document.getElementById(`edit-subtask-${index}`);
  const updatedValue = editInput.value.trim();

  if (updatedValue) {
    subtaskList[index] = updatedValue;
    renderSubtasks();
  }
}

function cancelSubtask() {
  subtaskInput.value = "";
  addSubtaskBtn.style.display = "inline";
  document.getElementById("confirm-subtask-btn").style.display = "none";
  document.getElementById("cancel-subtask-btn").style.display = "none";
}

function deleteSubtask(index) {
  subtaskList.splice(index, 1);
  renderSubtasks();
}

function getFormInputValue(inputId) {
  return document.getElementById(inputId).value.trim();
}

function countSubtasks(subtaskList) {
  const totalSubtasks = subtaskList.length;
  const completedSubtasks = subtaskList.filter(
    (subtask) => subtask.completed
  ).length;
  return { completedSubtasks, totalSubtasks };
}

function createNewTask(
  title,
  description,
  dueDate,
  priority,
  category,
  subtaskList,
  selectedUsers
) {
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
    assignedUsers: selectedUsers,
  };
}

function saveTaskToLocalStorage(columnId, newTask) {
  const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
  tasks.push(newTask);
  localStorage.setItem(columnId, JSON.stringify(tasks));
}

function isCategorySelected() {
  return selectedCategory !== ""; 
}

function checkAddTaks() {
    let valid = true; 
    if (title.value.length < 1) {
      titleError.style.display = "flex";
      titleError.innerHTML = "Bitte Fügen Sie einen Titel hinzu";
      valid = false; 
    }
    if (description.value.length < 1) {
      descriptionError.innerHTML = "Bitte Fügen Sie eine Beschreibung hinzu";
      descriptionError.style.display = "flex";
      valid = false; 
    }
    if (date.value.length < 1) {
      dateError.style.display = "flex";
      dateError.innerHTML = "Bitte ein Datum auswählen";
      valid = false;
    }
    if (!isCategorySelected()) {
      categoryError.style.display = "flex";
      categoryError.innerHTML = "Bitte wählen Sie eine Kategorie für die Aufgabe aus";
      valid = false;
    }
    if (valid) {
      addTaskMsg(); 
    }
  }

function clearTitleError() {
  titleError.innerHTML = "";
}

function clearDescriptionError() {
  descriptionError.innerHTML = "";
}

function clearDateError() {
  dateError.innerHTML = "";
}

function addTask() {
  const title = getFormInputValue("title-input");
  const description = getFormInputValue("description");
  const dueDate = getFormInputValue("date-input");
  const priority = selectedPriority || "medium";
  const category = selectedCategory;

  const newTask = createNewTask(
    title,
    description,
    dueDate,
    priority,
    category,
    subtaskList,
    selectedUsers
  );
  const currentColumn = localStorage.getItem("currentColumn") || "todo";
  saveTaskToLocalStorage(currentColumn, newTask);
  window.location.href = "board.html";
}

function addTaskMsg() {
  let msgContainer = document.getElementById("add-task-msg");

    msgContainer.style.display = "flex";
    setTimeout(() => {
      msgContainer.style.display = "none";
      addTask();
      closeOverlay();
    }, 2000); 
}

document.getElementById('add-task-mobile').addEventListener('click', () => {
  if (window.innerWidth < 830) {
      window.location.href = '../HTML/add-task.html';
  }
});
