let dropDownArrowContactsOverlay = document.getElementById("drop-down-arrow-contacts-overlay");
let dropDownArrowCategory = document.getElementById("drop-down");
let concatListOverlay = document.getElementById("contact-listOverlay");
let btnUrgent = document.getElementById("btn-urgent-overlay");
let imgUrgent = document.getElementById("urgent-img-overlay");
let btnMedium = document.getElementById("btn-medium-overlay");
let imgMedium = document.getElementById("medium-img-overlay");
let btnLow = document.getElementById("btn-low-overlay");
let imgLow = document.getElementById("low-img-overlay");
let addSubtaskBtn = document.getElementById("add-subtask-btn");
let subtaskListOverlay = [];
let selectedPriorityOverlay = "";
let contacStateOverlay = 1;
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
let selectedUsersAddTask = [];

renderSubtasksOverlay();

function openDropDownMenuUserOverlay() {
  switch (contacStateOverlay) {
    case 1:
      concatListOverlay.style.display = "flex";
      dropDownArrowContactsOverlay.src = "../Assets/arrow_drop_downaa.png";
      contacStateOverlay = 2;
      addUserToTaskOverlay();
      break;
    case 2:
      concatListOverlay.style.display = "none";
      dropDownArrowContactsOverlay.src = "../Assets/arrow_drop_downaa (1).png";
      contacStateOverlay = 1;
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
function addUserToTaskOverlay() {
  concatListOverlay.innerHTML = "";

  loadedContacts.forEach((user, index) => {
    let isCheckedOverlay = selectedUsersAddTask.includes(user) ? "checked" : "";
    let selectedClassOverlay = selectedUsersAddTask.includes(user) ? "selected-user" : "";

    let initialsOverlay = user.initialien; 
    let colorOverlay = user.color; 

    concatListOverlay.innerHTML += renderAddToTaskContactsOverlay(colorOverlay, initialsOverlay, user, index, isCheckedOverlay, selectedClassOverlay);
  }); 
}

function checkBoxUserTaskOverlay(index, event) {
  event.stopPropagation(); 

  const user = loadedContacts[index];
  const contactElement = document.querySelectorAll('.contact-overlay')[index];
  const checkbox = contactElement.querySelector('input[type="checkbox"]');

  if (event.target.tagName !== "INPUT") {
    checkbox.checked = !checkbox.checked;
  }

  if (checkbox.checked) {
    if (!selectedUsersAddTask.includes(user)) {
      selectedUsersAddTask.push(user);
    }
    contactElement.classList.add('selected-user');
  } else {
    selectedUsersAddTask = selectedUsersAddTask.filter((u) => u !== user);
    contactElement.classList.remove('selected-user');
  }

  addedUsersOverlay(); 
}

function addedUsersOverlay() {
  let addedUsersOverlay = document.getElementById("addedUersOverlay");
  let maxVisibleUsersOverlay = 4;
  addedUsersOverlay.innerHTML = "";


  selectedUsersAddTask.slice(0, maxVisibleUsersOverlay).forEach((user) => {
    let initialsOverlay = user.initialien;

    let colorOverlay = user.color;

    addedUsersOverlay.innerHTML += renderAddedUsersOverlay(colorOverlay, initialsOverlay);
    
  });
  if (selectedUsersAddTask.length > maxVisibleUsersOverlay) {
    let remainingCountOvlay = selectedUsersAddTask.length - maxVisibleUsersOverlay;
    addedUsersOverlay.innerHTML += renderAddedUsersPlaceholder(`+${remainingCountOvlay}`);
  }
}

function clearTask() {
    selectedUsersAddTask = [];
    title.value = "";
    description.value = "";
    document.getElementById("addedUersOverlay").innerHTML = "";
    date.value = "";
    document.getElementById("newSubtaskOverlay").value = "";
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

function changeColorPrioBtnOverlay(priority) {
  let imgSourcesOverlay = {
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

  let bgColorsOverlay = { urgent: "#FF3B30", medium: "#FFA800", low: "#4CD964" };

  resetButtonStylesOverlay();
  selectedPriorityOverlay = priority;
  setButtonStylesOverlay(priority, bgColorsOverlay[priority]);
  setImageSourcesOverlay(imgSourcesOverlay[priority]);
}

function resetButtonStylesOverlay() {
  btnUrgent.style.backgroundColor =
    btnMedium.style.backgroundColor =
    btnLow.style.backgroundColor =
      "#ffffff";
}

function setButtonStylesOverlay(priority, bgColorOverlay) {
  if (priority === "urgent") btnUrgent.style.backgroundColor = bgColorOverlay;
  else if (priority === "medium") btnMedium.style.backgroundColor = bgColorOverlay;
  else if (priority === "low") btnLow.style.backgroundColor = bgColorOverlay;
}

function setImageSourcesOverlay([urgentImgSrc, mediumImgSrc, lowImgSrc]) {
  imgUrgent.src = urgentImgSrc;
  imgMedium.src = mediumImgSrc;
  imgLow.src = lowImgSrc;
}

function toggleButtonVisibilityOverlay(forceShow) {
  const taskInputOverlay = document.getElementById("newSubtaskOverlay");
  const confirmButtonOverlay = document.getElementById("confirmButton-overlay");
  const cancelButtonOverlay = document.getElementById("cancelButton-overlay");
  const plusButtonOverlay = document.getElementById("confirm-subtask-btn-overlay");
  const linieOverlay = document.getElementById("linie-overlay");
  linieOverlay.style.display = "none";
  confirmButtonOverlay.style.display = "none";
  cancelButtonOverlay.style.display = "none";
  plusButtonOverlay.style.display = "inline";

  if (forceShow || taskInputOverlay.value.trim()) {
    confirmButtonOverlay.style.display = "inline";
    cancelButtonOverlay.style.display = "inline";
    linieOverlay.style.display = "inline";
    plusButtonOverlay.style.display = "none";
  }
}

function addSubtask() {
  const taskInput = document.getElementById("newSubtaskOverlay");
  const taskValue = taskInput.value.trim();
  if (taskValue === "") return;

  subtaskListOverlay.push(taskValue);
  renderSubtasksOverlay();

  taskInput.value = "";
  toggleButtonVisibilityOverlay();
}

function cancelSubtaskOverlay() {
  document.getElementById("newSubtaskOverlay").value = "";
  toggleButtonVisibilityOverlay();
}

function renderSubtasksOverlay() {
  const subtaskContainer = document.getElementById("subtaskLabels");
  if (subtaskContainer) {
  subtaskContainer.innerHTML = "";
  subtaskListOverlay.forEach((subtask, index) => {
    subtaskContainer.innerHTML += getSubtasksTemplateOverlay(subtask, index);
  });}
}

function editSubtaskOverlay(index) {
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
  let editSubtaskOverlay = document.getElementById(`edit-subtask-${index}`);
  let subtaskListOverlay = document.getElementById(`subtask-list-${index}`);
  let subtaskLabel = document.getElementById(`subtask-label-${index}`);
  let length = editSubtaskOverlay.value.length;

  editSubtaskOverlay.focus();
  editSubtaskOverlay.setSelectionRange(length, length);
  editSubtaskOverlay.style.backgroundColor = "white";
  subtaskLabel.style.backgroundColor = "white";
  subtaskListOverlay.style.borderBottom = "1px solid #29abe2";
}

function confirmSubtask(index) {
  const editInput = document.getElementById(`edit-subtask-${index}`);
  const updatedValue = editInput.value.trim();

  if (updatedValue) {
    subtaskListOverlay[index] = updatedValue;
    renderSubtasksOverlay();
  }
}

function deleteSubtask(index) {
  subtaskListOverlay.splice(index, 1);
  renderSubtasksOverlay();
}

function getFormInputValue(inputId) {
  return document.getElementById(inputId).value.trim();
}

function countSubtasks(subtaskListOverlay) {
  const totalSubtasks = subtaskListOverlay.length;
  const completedSubtasks = subtaskListOverlay.filter(
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
  subtaskListOverlay,
  selectedUsersAddTask
 ) {
  const { completedSubtasks, totalSubtasks } = countSubtasks(subtaskListOverlay);
  return {
    id: `task-${Date.now()}`,
    title,
    description,
    dueDate,
    priority,
    category,
    subtasks: subtaskListOverlay,
    completedSubtasks,
    totalSubtasks,
    assignedUsers: selectedUsersAddTask,
  };
}

function saveTaskToLocalStorageOverlay(columnId, newTask) {
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
  const priority = selectedPriorityOverlay || "medium";
  const category = selectedCategory;

  const newTask = createNewTask(
    title,
    description,
    dueDate,
    priority,
    category,
    subtaskListOverlay,
    selectedUsersAddTask
  );
  const currentColumn = localStorage.getItem("currentColumn") || "todo";
  saveTaskToLocalStorageOverlay(currentColumn, newTask);
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

function closeOverlay() {
  selectedUsersAddTask = [];
  title.value = "";
  description.value = "";
  document.getElementById("addedUersOverlay").innerHTML = "";
  date.value = "";
  document.getElementById("newSubtaskOverlay").value = "";
  document.getElementById("subtaskLabels").innerHTML = "";
  document.getElementById("selected-category").innerHTML =
    "Select task category";
  btnMedium.style.backgroundColor = "#FFA800";
  imgMedium.src = "../Assets/prio_medium.png";
  btnLow.style.backgroundColor = "#ffffff";
  imgLow.src = "../Assets/prio_low.png"
  btnUrgent.style.backgroundColor = "#ffffff";
  imgUrgent.src = "../Assets/prio_urgent.png";
  let hero = document.getElementById("hero");
  hero.style.display = "none";
}

