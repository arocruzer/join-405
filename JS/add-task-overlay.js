let dropDownArrowContactsOverlay = document.getElementById("drop-down-arrow-contacts-overlay");
let dropDownArrowCategoryOverlay = document.getElementById("drop-down-overlay");
let concatListOverlay = document.getElementById("contact-list-overlay");
let btnUrgentOverlay = document.getElementById("btn-urgent-overlay");
let imgUrgentOverlay = document.getElementById("urgent-img-overlay");
let btnMediumOverlay = document.getElementById("btn-medium-overlay");
let imgMediumOverlay = document.getElementById("medium-img-overlay");
let btnLowOverlay = document.getElementById("btn-low-overlay");
let imgLowOverlay = document.getElementById("low-img-overlay");
let addSubtaskBtnOverlay = document.getElementById("add-subtask-btn-overlay");
let subtaskListOverlay = [];
let selectedPriorityOverlay = "";
let contacStateOverlay = 1;
let categoryStateOverlay = 1;
let selectedCategoryOverlay = "";
const categorySelectOverlay = document.getElementById("categorySelect-overlay");
const selectedCategoryElementOverlay = document.getElementById("selected-category-overlay");
let bodyOverlay = document.getElementById("body-overlay");
let titleOverlay = document.getElementById("title-input-overlay");
let descriptionOverlay = document.getElementById("description-overlay");
let dateOverlay =  document.getElementById("date-input-overlay");
let titleErrorOverlay = document.getElementById("title-error-overlay");
let descriptionErrorOverlay = document.getElementById("description-error-overlay");
let dateErrorOverlay = document.getElementById("date-error-overlay");
let categoryErrorOverlay = document.getElementById("category-error-overlay");

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

function openDropDownMenuCategoryOverlay() {
  switch (categoryStateOverlay) {
    case 1:
      categorySelectOverlay.style.display = "block";
      dropDownArrowCategoryOverlay.src = "../Assets/arrow_drop_downaa.png";
      categoryStateOverlay = 2;
      break;
    case 2:
      categorySelectOverlay.style.display = "none";
      dropDownArrowCategoryOverlay.src = "../Assets/arrow_drop_downaa (1).png";
      categoryStateOverlay = 1;
      break;
  }
}
function addUserToTaskOverlay() {
  concatListOverlay.innerHTML = "";

  loadedContacts.forEach((user, index) => {
    let isCheckedOverlay = selectedUsersOverlay.includes(user) ? "checked" : "";
    let selectedClassOverlay = selectedUsersOverlay.includes(user) ? "selected-user" : "";

    let initialsOverlay = user.initialien; 
    let colorOverlay = user.color; 

    concatListOverlay.innerHTML += renderAddToTaskContactsOverlay(colorOverlay, initialsOverlay, user, index, isCheckedOverlay, selectedClassOverlay);
  }); 
}

function checkBoxUserTaskOverlay(index, event) {
  event.stopPropagation(); 

  const user = loadedContacts[index];
  const contactElementOverlay = document.querySelectorAll('.contact-overlay')[index];
  const checkboxOverlay = contactElementOverlay.querySelector('input[type="checkbox"]');

  if (event.target.tagName !== "INPUT") {
    checkbox.checked = !checkbox.checked;
  }

  if (checkbox.checked) {
    if (!selectedUsersOverlay.includes(user)) {
      selectedUsersOverlay.push(user);
    }
    contactElementOverlay.classList.add('selected-user-overlay');
  } else {
    selectedUsersOverlay = selectedUsersOverlay.filter((u) => u !== user);
    contactElementOverlay.classList.remove('selected-user-overlay');
  }

  addedUsersOverlay(); 
}

function addedUsersOverlay() {
  let addedUsersOverlay = document.getElementById("addedUers-overlay");
  let maxVisibleUsersOverlay = 4;
  addedUsersOverlay.innerHTML = "";


  selectedUsersOverlay.slice(0, maxVisibleUsersOverlay).forEach((user) => {
    let initialsOverlay = user.initialien;

    let colorOverlay = user.color;

    addedUsersOverlay.innerHTML += renderAddedUsersOverlay(colorOverlay, initialsOverlay);
    
  });
  if (selectedUsersOverlay.length > maxVisibleUsersOverlay) {
    let remainingCountOverlay = selectedUsersOverlay.length - maxVisibleUsersOverlay;
    addedUsersOverlay.innerHTML += renderAddedUsersPlaceholderOverlay(`+${remainingCountOverlay}`);
  }
}

function clearTaskOverlay() {
    titleOverlay.value = "";
    descriptionOverlay.value = "";
    document.getElementById("addedUers-overlay").innerHTML = "";
    dateOverlay.value = "";
    document.getElementById("newSubtask-overlay").value = "";
    document.getElementById("subtaskLabels-overlay").innerHTML = "";
    document.getElementById("selected-category-overlay").innerHTML =
      "Select task category";
    btnMediumOverlay.style.backgroundColor = "#FFA800";
    imgMediumOverlay.src = "../Assets/prio_medium.png";
    btnLowOverlay.style.backgroundColor = "#ffffff";
    imgLowoverlay.src = "../Assets/prio_low.png"
    btnUrgentOverlay.style.backgroundColor = "#ffffff";
    imgUrgentOverlay.src = "../Assets/prio_urgent.png";
  }

// Auswahl der Kategorie und Dropdown schließen
function selectCategoryOverlay(categoryOverlay) {
  selectedCategoryOverlay = categoryOverlay;
  selectedCategoryElementOverlay.innerText = categoryOverlay;
  categorySelectOverlay.style.display = "none";
  categoryErrorOverlay.style.display = "none";
  stateOverlay = 1;
  dropDownArrowCategoryOverlay.src = "../Assets/arrow_drop_downaa (1).png";
}

function changeColorPrioBtnOverlay(priorityOverlay) {
  let imgSourcesOverlay = {
    urgentOverlay: [
      "../Assets/prio_arrow_white.png",
      "../Assets/prio_line_orange.png",
      "../Assets/prio_low.png",
    ],
    mediumOverlay: [
      "../Assets/prio_urgent.png",
      "../Assets/prio_medium.png",
      "../Assets/prio_low.png",
    ],
    lowOverlay: [
      "../Assets/prio_urgent.png",
      "../Assets/prio_line_orange.png",
      "../Assets/prio_arrowDown_white.png",
    ],
  };

  let bgColorsOverlay = { urgentOverlay: "#FF3B30", mediumOverlay: "#FFA800", lowOverlay: "#4CD964" };

  resetButtonStylesOverlay();
  selectedPriorityOverlay = priorityOverlay;
  setButtonStylesOverlay(priorityOverlay, bgColors[priorityOverlay]);
  setImageSourcesOverlay(imgSources[priorityOverlay]);
}

function resetButtonStylesOverlay() {
  btnUrgentOverlay.style.backgroundColor =
    btnMediumOverlay.style.backgroundColor =
    btnLowOverlay.style.backgroundColor =
      "#ffffff";
}

function setButtonStylesOverlay(priorityOverlay, bgColorOverlay) {
  if (priorityOverlay === "urgent-overlay") btnUrgentOverlay.style.backgroundColor = bgColorOverlay;
  else if (priorityOverlay === "medium-overlay") btnMediumOverlay.style.backgroundColor = bgColorOverlay;
  else if (priorityOverlay === "low-overlay") btnLowOverlay.style.backgroundColor = bgColorOverlay;
}

function setImageSourcesOverlay([urgentImgSrcOverlay, mediumImgSrcOverlay, lowImgSrcOverlay]) {
  imgUrgentOverlay.src = urgentImgSrcOverlay;
  imgMediumOveraly.src = mediumImgSrcOverlay;
  imgLowOverlay.src = lowImgSrcOverlay;
}

function toggleButtonVisibilityOverlay(forceShow) {
  const taskInputOverlay = document.getElementById("newSubtask-overlay");
  const confirmButtonOverlay = document.getElementById("confirmButton-overlay");
  const cancelButtonOverlay = document.getElementById("cancelButton-overlay");
  const plusButtonOverlay = document.getElementById("plusButton-overlay");
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

function addSubtaskOverlay() {
  const taskInputOverlay = document.getElementById("newSubtask-overlay");
  const taskValueOverlay = taskInputOverlay.value.trim();
  if (taskValueOverlay === "") return;

  subtaskList.push(taskValueOverlay);
  renderSubtasksOverlay();

  taskInputOverlay.value = "";
  toggleButtonVisibilityOverlay();
}

function cancelSubtaskOverlay() {
  document.getElementById("newSubtask-overlay").value = "";
  toggleButtonVisibilityOverlay();
}

function renderSubtasksOverlay() {
  const subtaskContainerOverlay = document.getElementById("subtaskLabels-overlay");
  if (subtaskContainerOverlay) {
  subtaskContainerOverlay.innerHTML = "";
  subtaskListOverlay.forEach((subtaskOverlay, index) => {
    subtaskContainerOverlay.innerHTML += getSubtasksTemplateOverlay(subtaskOverlay, index);
  });}
}

function editSubtaskOverlay(index) {
  let editSubtaksOverlay = document.getElementById(`edit-subtask-img-overlay-${index}`);
  let deleteSubtaskOverlay = document.getElementById(`delete-subtask-overlay-${index}`);
  let imagesContainerOverlay = document.getElementById(`images-container-overlay-${index}`);
  let confrimEditOverlay = document.getElementById(`confirm-subtask-overlay-${index}`);

  editSubtaksOverlay.style.display = "none";
  confrimEditOverlay.style.display = "flex";
  deleteSubtaskOverlay.src = "../Assets/delete.png";
  imagesContainerOverlay.style.flexDirection = "row-reverse-overlay";

  inputOnFocusOverlay(index);
}
function inputOnFocusOverlay(index) {
  let editSubtaskOverlay = document.getElementById(`edit-subtask-overlay-${index}`);
  let subtaskListOverlay = document.getElementById(`subtask-list-overlay-${index}`);
  let subtaskLabelOverlay = document.getElementById(`subtask-label-overlay-${index}`);
  let lengthOverlay = editSubtaskOverlay.value.length;

  editSubtaskOverlay.focus();
  editSubtaskOverlay.setSelectionRangeOverlay(length, length);
  editSubtaskOverlay.style.backgroundColor = "white";
  subtaskLabelOverlay.style.backgroundColor = "white";
  subtaskListOverlay.style.borderBottom = "1px solid #29abe2";
}
function confirmSubtaskOverlay(index) {
  const editInputOverlay = document.getElementById(`edit-subtask-overlay-${index}`);
  const updatedValueOverlay = editInputOverlay.value.trim();

  if (updatedValueOverlay) {
    subtaskListOverlay[index] = updatedValueOverlay;
    renderSubtasksOverlay();
  }
}

function cancelSubtaskOverlay() {
  subtaskInputOverlay.value = "";
  addSubtaskBtnOverlay.style.display = "inline-overlay";
  document.getElementById("confirm-subtask-btn-overlay").style.display = "none";
  document.getElementById("cancel-subtask-btn-overlay").style.display = "none";
}

function deleteSubtaskOverlay(index) {
  subtaskListOverlay.splice(index, 1);
  renderSubtasksOverlay();
}

function getFormInputValueOverlay(inputIdOverlay) {
  return document.getElementById(inputIdOverlay).value.trim();
}

function countSubtasksOverlay(subtaskListOverlay) {
  const totalSubtasksOverlay = subtaskListOverlay.length;
  const completedSubtasksOverlay = subtaskListOverlay.filter(
    (subtaskOverlay) => subtaskOverlay.completed
  ).length;
  return { completedSubtasksOverlay, totalSubtasksOverlay };
}

function createNewTaskOverlay(
  titleOverlay,
  descriptionOverlay,
  dueDateOverlay,
  priorityOverlay,
  categoryOverlay,
  subtaskListOverlay,
  selectedUsersOverlay
) {
  const { completedSubtasksOverlay, totalSubtasksOverlay } = countSubtasksOverlay(subtaskListOverlay);
  return {
    id: `task-overlay-${Date.now()}`,
    titleOverlay,
    descriptionOverlay,
    dueDateOverlay,
    priorityOverlay,
    categoryOverlay,
    subtasksOverlay: subtaskListOverlay,
    completedSubtasksOverlay,
    totalSubtasksOverlay,
    assignedUsersOverlay: selectedUsersOverlay,
  };
}

function saveTaskToLocalStorageOverlay(columnId, newTask) {
  const tasksOverlay = JSON.parse(localStorage.getItem(columnId)) || [];
  tasksOverlay.push(newTask);
  localStorage.setItem(columnId, JSON.stringify(tasksOverlay));
}

function isCategorySelectedOverlay() {
  return selectedCategoryOverlay !== ""; 
}

function checkAddTaksOverlay() {
    let validOverlay = true; 
    if (titleOverlay.value.length < 1) {
      titleErrorOverlay.style.display = "flex";
      titleErrorOverlay.innerHTML = "Bitte Fügen Sie einen Titel hinzu";
      validOverlay = false; 
    }
    if (descriptionOverlay.value.length < 1) {
      descriptionErrorOverlay.innerHTML = "Bitte Fügen Sie eine Beschreibung hinzu";
      descriptionErrorOverlay.style.display = "flex";
      validOverlay = false; 
    }
    if (dateOverlay.value.length < 1) {
      dateErrorOverlay.style.display = "flex";
      dateErrorOverlay.innerHTML = "Bitte ein Datum auswählen";
      validOverlay = false;
    }
    if (!isCategorySelectedOverlay()) {
      categoryErrorOverlay.style.display = "flex";
      categoryErrorOverlay.innerHTML = "Bitte wählen Sie eine Kategorie für die Aufgabe aus";
      validOverlay = false;
    }
    if (validOverlay) {
      addTaskMsgOverlay(); 
    }
  }

function clearTitleErrorOverlay() {
  titleError.innerHTML = "";
}

function clearDescriptionErrorOverlay() {
  descriptionErrorOverlay.innerHTML = "";
}

function clearDateErrorOverlay() {
  dateErrorOverlay.innerHTML = "";
}

function addTaskOverlay() {
  const titleOverlay = getFormInputValue("title-input-overlay");
  const descriptionOverlay = getFormInputValue("description-overlay");
  const dueDateOverlay = getFormInputValue("date-input-overlay");
  const priorityOverlay = selectedPriorityOverlay || "medium-overlay";
  const categoryOverlay = selectedCategoryOverlay;

  const newTaskOverlay = createNewTaskOverlay(
    titleOverlay,
    descriptionOverlay,
    dueDateOverlay,
    priorityOverlay,
    categoryOverlay,
    subtaskListOverlay,
    selectedUsersOverlay
  );
  const currentColumnOverlay = localStorage.getItem("currentColumn") || "todo";
  saveTaskToLocalStorageOverlay(currentColumn, newTask);
  window.location.href = "board.html";
}

function addTaskMsgOverlay() {
  let msgContainerOverlay = document.getElementById("add-task-msg-overlay");

    msgContainerOverlay.style.display = "flex";
    setTimeout(() => {
      msgContainerOverlay.style.display = "none";
      addTaskOverlay();
      closeOverlay();
    }, 2000); 
}
