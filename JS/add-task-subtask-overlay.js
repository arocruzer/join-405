let subtaskListOverlay = [];
let addSubtaskBtn = document.getElementById("add-subtask-btn");
renderSubtasksOverlay();

/**
 * Schaltet die Sichtbarkeit der Buttons für das Hinzufügen eines Subtasks um.
 * @param {boolean} [forceShow=false] - Erzwingt die Anzeige der Buttons, wenn true.
 */
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

/**
* Fügt einen neuen Subtask zur Liste hinzu.
*/
function addSubtask() {
  const taskInput = document.getElementById("newSubtaskOverlay");
  const taskValue = taskInput.value.trim();
  if (taskValue === "") return;

  subtaskListOverlay.push(taskValue);
  renderSubtasksOverlay();

  taskInput.value = "";
  toggleButtonVisibilityOverlay();
}

/**
 * Bricht das Hinzufügen eines Subtasks ab und leert das Eingabefeld.
 */
function cancelSubtaskOverlay() {
  document.getElementById("newSubtaskOverlay").value = "";
  toggleButtonVisibilityOverlay();
}

/**
 * Rendert die Liste der Subtasks im Overlay.
 */
function renderSubtasksOverlay() {
  const subtaskContainer = document.getElementById("subtaskLabels");
  if (subtaskContainer) {
    subtaskContainer.innerHTML = "";
    subtaskListOverlay.forEach((subtask, index) => {
      subtaskContainer.innerHTML += getSubtasksTemplateOverlay(subtask, index);
    });
  }
}

/**
 * Ermöglicht das Bearbeiten eines Subtasks.
 * @param {number} index - Der Index des zu bearbeitenden Subtasks.
 */
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

/**
 * Setzt den Fokus auf das Eingabefeld eines zu bearbeitenden Subtasks.
 * @param {number} index - Der Index des Subtasks.
 */
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

/**
 * Bestätigt die Bearbeitung eines Subtasks und speichert die Änderungen.
 * @param {number} index - Der Index des Subtasks.
 */
function confirmSubtask(index) {
  const editInput = document.getElementById(`edit-subtask-${index}`);
  const updatedValue = editInput.value.trim();

  if (updatedValue) {
    subtaskListOverlay[index] = updatedValue;
    renderSubtasksOverlay();
  }
}

/**
 * Löscht einen Subtask aus der Liste.
 * @param {number} index - Der Index des zu löschenden Subtasks.
 */
function deleteSubtask(index) {
  subtaskListOverlay.splice(index, 1);
  renderSubtasksOverlay();
}

/**
 * Holt den Wert eines Formulareingabefeldes und gibt ihn ohne Leerzeichen zurück.
 * @param {string} inputId - Die ID des Eingabefeldes.
 * @returns {string} Der getrimmte Eingabewert.
 */
function getFormInputValue(inputId) {
  return document.getElementById(inputId).value.trim();
}

/**
 * Zählt die Gesamtanzahl der Subtasks und die abgeschlossenen Subtasks.
 * @param {Array<{completed: boolean}>} subtaskListOverlay - Die Liste der Subtasks.
 * @returns {{completedSubtasks: number, totalSubtasks: number}} Objekt mit Gesamt- und abgeschlossenen Subtasks.
 */
function countSubtasks(subtaskListOverlay) {
  const totalSubtasks = subtaskListOverlay.length;
  const completedSubtasks = subtaskListOverlay.filter(
    (subtask) => subtask.completed
  ).length;
  return { completedSubtasks, totalSubtasks };
}