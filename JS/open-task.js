// Opens the task details modal and populates it with the selected task's data.
function openTaskDetails(taskId) {
    const tasks = getAllTasks();
    const task = findTaskById(tasks, taskId);
  
    if (task) {
      currentTaskId = taskId;
      updateModalContent(task);
      document.getElementById("taskModal").style.display = "block";
      toggleModalLayout(false);
      addSaveAndCancelButtons(false);
    }
  }
  
  // Aggregates all tasks across columns into a single array.
  function getAllTasks() {
    return [
      ...JSON.parse(localStorage.getItem("todo") || "[]"),
      ...JSON.parse(localStorage.getItem("in-progress") || "[]"),
      ...JSON.parse(localStorage.getItem("await-feedback") || "[]"),
      ...JSON.parse(localStorage.getItem("done") || "[]"),
    ];
  }
  
  // Finds a specific task by its ID from the aggregated task list.
  function findTaskById(tasks, taskId) {
    return tasks.find((task) => task.id === taskId);
  }
  
  // Updates the modal content with task details such as category, title, and description.
  function updateModalContent(task) {
    updateModalCategory(task);
    updateModalTitleAndDescription(task);
    updateModalDueDate(task);
    updateModalPriority(task);
    updateModalAssignedUsers(task);
    updateModalSubtasks(task);
  }
  
  function updateModalCategory(task) {
    const modalCategory = document.getElementById("modalCategory");
    modalCategory.innerText = task.category || "No Category";
    modalCategory.className = `category-label ${task.categoryClass || ""}`;
    setCategoryStyle("modalCategory", task.category);
  }
  
  function updateModalTitleAndDescription(task) {
    document.getElementById("modalTitle").innerText = task.title;
    document.getElementById("modalDescription").innerText = task.description;
  }
  
  function updateModalDueDate(task) {
    const dueDateElement = document.getElementById("modalDueDate");
    dueDateElement.innerText = task.dueDate
      ? formatDate(task.dueDate)
      : "Kein Fälligkeitsdatum";
  }
  
  function updateModalPriority(task) {
    document.getElementById("modalPriority").innerHTML = formatPriority(
      task.priority
    );
  }
  
  function updateModalAssignedUsers(task) {
    document.getElementById("modalAssignedUsers").innerHTML = renderAssignedUsers(
      task.assignedUsers
    );
  }
  
  // Closes the task details modal.
  function closeTaskModal() {
    document.getElementById("taskModal").style.display = "none";
  }
  
  // Deletes the current task from all columns and refreshes the UI.
  function deleteTask() {
    const allColumns = ["todo", "in-progress", "await-feedback", "done"];
    allColumns.forEach((column) => {
      let tasks = JSON.parse(localStorage.getItem(column)) || [];
      tasks = tasks.filter((task) => task.id !== currentTaskId);
      localStorage.setItem(column, JSON.stringify(tasks));
      loadTasks(column);
    });
    closeTaskModal();
  }
  
  function closeTaskModal() {
    document.getElementById("taskModal").style.display = "none";
  }
  
  // Adjusts the visibility of add buttons based on the screen size.
  function addButton() {
    const headerBoard = document.getElementById("sectionBoard");
    const headerBoardPlus = document.getElementById("sectionBoardPlus");
    if (window.innerWidth < 1355) {
      headerBoard.classList.remove("hidden");
      headerBoardPlus.classList.add("hidden");
    } else {
      headerBoard.classList.add("hidden");
      headerBoardPlus.classList.remove("hidden");
    }
  }
  
  window.addEventListener("resize", addButton);
  window.addEventListener("DOMContentLoaded", addButton);
  
  // Drag-and-drop handlers for moving tasks between columns.
  function drag(event) {
    draggedTaskId = event.target.id;
    event.dataTransfer.effectAllowed = "move";
  }
  
  function allowDrop(event) {
    event.preventDefault();
    const taskContainer = event.target.closest(".task-container");
    if (taskContainer) {
      document
        .querySelectorAll(".task-container.highlight-drop")
        .forEach((container) => {
          container.classList.remove("highlight-drop");
        });
      taskContainer.classList.add("highlight-drop");
    }
  }
  
  // Drag-and-drop handlers for moving tasks between columns.
  function removeHighlight() {
    document
      .querySelectorAll(".task-container.highlight-drop")
      .forEach((container) => {
        container.classList.remove("highlight-drop");
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
        updateLocalStorage(
          sourceTaskContainer,
          targetTaskContainer,
          draggedTaskId
        );
        refreshUI(sourceTaskContainer, targetTaskContainer);
      }
    }
  }
  
  // Helper function to retrieve the closest task container during a drop operation
  function getClosestTaskContainer(element) {
    return element.closest(".task-container");
  }
  
  function getSourceTaskContainer(draggedTaskElement) {
    return draggedTaskElement.closest(".task-container");
  }
  
  // Moves a task between columns in the DOM and updates localStorage accordingly.
  function moveTaskInDOM(draggedTaskElement, targetTaskContainer) {
    targetTaskContainer.appendChild(draggedTaskElement);
  }
  
  function updateLocalStorage(sourceTaskContainer, targetTaskContainer, taskId) {
    const sourceColumnId = sourceTaskContainer.closest(".column").id;
    const targetColumnId = targetTaskContainer.closest(".column").id;
  
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
    const sourceColumnId = sourceTaskContainer.closest(".column").id;
    const targetColumnId = targetTaskContainer.closest(".column").id;
    loadTasks(sourceColumnId);
    loadTasks(targetColumnId);
  }
  
  document.querySelectorAll(".task-container").forEach((taskContainer) => {
    taskContainer.addEventListener("dragleave", removeHighlight);
  });
  
  function moveTask(taskId, direction, event) {
    if (event) event.stopPropagation();
    const columns = ["todo", "in-progress", "await-feedback", "done"];
    const tasks = getAllTasks();
    const task = findTaskById(tasks, taskId);
    if (!task) return;
    const currentColumnIndex = findCurrentColumnIndex(columns, taskId);
    const targetColumnIndex = calculateTargetColumnIndex(
      currentColumnIndex,
      direction,
      columns.length
    );
    if (targetColumnIndex === null) return;
    const currentColumn = columns[currentColumnIndex];
    const targetColumn = columns[targetColumnIndex];
    moveTaskBetweenColumns(taskId, task, currentColumn, targetColumn);
    refreshUII(currentColumn, targetColumn);
  }
  
  // Function to find the current column index of the task
  function findCurrentColumnIndex(columns, taskId) {
    return columns.findIndex((column) => {
      const columnTasks = JSON.parse(localStorage.getItem(column)) || [];
      return columnTasks.some((t) => t.id === taskId);
    });
  }
  
  function calculateTargetColumnIndex(currentIndex, direction, totalColumns) {
    let targetIndex =
      direction === "previous" ? currentIndex - 1 : currentIndex + 1;
    return targetIndex < 0 || targetIndex >= totalColumns ? null : targetIndex;
  }
  
  function moveTaskBetweenColumns(taskId, task, currentColumn, targetColumn) {
    let currentTasks = JSON.parse(localStorage.getItem(currentColumn)) || [];
    currentTasks = currentTasks.filter((t) => t.id !== taskId);
    localStorage.setItem(currentColumn, JSON.stringify(currentTasks));
    let targetTasks = JSON.parse(localStorage.getItem(targetColumn)) || [];
    targetTasks.push(task);
    localStorage.setItem(targetColumn, JSON.stringify(targetTasks));
  }
  
  function refreshUII(currentColumn, targetColumn) {
    loadTasks(currentColumn);
    loadTasks(targetColumn);
  }
  
  function updateArrowIcons(columnId, taskId) {
      const taskElement = document.getElementById(taskId);
      const arrowRightIcon = taskElement.querySelector('.arrow-right-icon');
      const arrowLeftIcon = taskElement.querySelector('.arrow-left-icon');
      if (columnId === 'todo') {
          arrowRightIcon.style.display = 'none';
      }
      if (columnId === 'done') {
          arrowLeftIcon.style.display = 'none';
      } 
  }
  
  function updateModalSubtasks(task) {
    const subtasksContainer = document.getElementById("modalSubtasks");
    if (!subtasksContainer) return;
  
    subtasksContainer.innerHTML = "";
  
    if (!Array.isArray(task.completedSubtasks)) {
        task.completedSubtasks = [];
    }
  
    if (!Array.isArray(task.subtasks) || task.subtasks.length === 0) {
        displayNoSubtasksMessage(subtasksContainer);
        return;
    }
  
    renderSubtasks(task, subtasksContainer);
  }
  
  function displayNoSubtasksMessage(container) {
    container.innerHTML = "<p>Keine Subtasks vorhanden</p>";
  }
  
  function renderSubtasks(task, container) {
    task.subtasks.forEach((subtask, index) => {
        const subtaskElement = createSubtaskElement(task, subtask, index);
        container.appendChild(subtaskElement);
    });
  }
  
  function createSubtaskElement(task, subtask, index) {
    const subtaskElement = document.createElement("div");
    subtaskElement.classList.add("subtask-item");
  
    const checkbox = createCheckbox(task, index);
    const subtaskText = createSubtaskText(subtask);
  
    subtaskElement.appendChild(checkbox);
    subtaskElement.appendChild(subtaskText);
  
    return subtaskElement;
  }
  
  function createCheckbox(task, index) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completedSubtasks.includes(index);
    checkbox.addEventListener("change", () => toggleSubtaskCompletion(task.id, index));
    return checkbox;
  }
  
  function createSubtaskText(subtask) {
    const subtaskText = document.createElement("span");
    subtaskText.textContent = subtask;
    subtaskText.style.marginLeft = "10px";
    return subtaskText;
  }
  
  function toggleSubtaskCompletion(taskId, subtaskIndex) {
    const columnId = findTaskColumn(taskId);
    let tasks = JSON.parse(localStorage.getItem(columnId)) || [];
    const task = tasks.find((t) => t.id === taskId);
    if (!Array.isArray(task.completedSubtasks)) {
        task.completedSubtasks = [];
    }
    if (task.completedSubtasks.includes(subtaskIndex)) {
        task.completedSubtasks = task.completedSubtasks.filter((i) => i !== subtaskIndex);
    } else {
        task.completedSubtasks.push(subtaskIndex);
    }
    localStorage.setItem(columnId, JSON.stringify(tasks));
    const taskElement = document.getElementById(taskId);
    if (taskElement) {
        taskElement.outerHTML = renderTask(task);
    }
  }
  
  // Funktion zur Ermittlung der Spalte, in der sich eine Task befindet
  function findTaskColumn(taskId) {
    const columns = ["todo", "in-progress", "await-feedback", "done"];
    for (let column of columns) {
        let tasks = JSON.parse(localStorage.getItem(column)) || [];
        if (tasks.some(task => task.id === taskId)) {
            return column;
        }
    }
    return null;
  }