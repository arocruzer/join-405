// Enables editing of subtasks by allowing users to add, edit, or delete subtasks
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
    completedSubtasktask= task.completedSubtasks || [];
    modalSubtasks.innerHTML = createAddSubtaskHTML();
    renderExistingSubtasks();
}

// Renders the existing subtasks in the modal for editing with checkboxes.
function renderExistingSubtasks() {
    const subtaskListContainer = document.getElementById('subtaskList');
    if (!subtaskListContainer) {
        console.error('Element "subtaskList" nicht gefunden!');
        return;
    }

    subtaskListContainer.innerHTML = ''; // Vorherige Inhalte löschen

    subtaskList.forEach((subtask, index) => {
        const isChecked = completedSubtasktask.includes(index);
        subtaskListContainer.insertAdjacentHTML('beforeend', generateSubtaskHTML(subtask, index, isChecked));
    });
}

function toggleSubtaskIdCompletion(subtaskIndex) {
    const task = getCurrentTask();
    if (!task) return;

    if (!Array.isArray(task.completedSubtasks)) {
        task.completedSubtasks = [];
    }

    if (task.completedSubtasks.includes(subtaskIndex)) {
        task.completedSubtasks = task.completedSubtasks.filter(i => i !== subtaskIndex);
    } else {
        task.completedSubtasks.push(subtaskIndex);
    }

    updateTaskInLocalStorage(task);
    renderExistingSubtasks();
}

// Adds a new subtask to the task and updates the UI.
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
    completedSubtasktask = completedSubtasktask.filter(i => i !== index);
    completedSubtasktask = completedSubtasktask.map(i => (i > index ? i - 1 : i));
    const task = getCurrentTask();
    if (task) {
        task.subtasks = subtaskList;
        task.completedSubtasks = completedSubtasktask;
        updateTaskInLocalStorage(task);
    }
    renderExistingSubtasks();
}

// Enables inline editing for a specific subtask.
function editSubtask(index) {
    const subtaskItem = document.getElementById(`subtask-${index}`);
    subtaskItem.innerHTML = generateEditSubtaskHTML(subtaskList[index], index);
}

// Saves the edited subtask back to the task and updates the UI.
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

// Cancels the inline editing of a subtask and reverts to the original text.
function cancelEditSubtask(index, originalText) {
    subtaskList[index] = originalText;
    renderExistingSubtasks();
}

// Cancels the addition of a new subtask and resets the input field.
function cancelSubtask() {
    document.getElementById('newSubtask').value = '';
    toggleButtonVisibility(false);
}