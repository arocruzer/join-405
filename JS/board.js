let selectedUsers = [];
let searchText = "";
let currentTaskId = null;
let draggedTaskId = null;

// Initializes the tasks for a specific column by loading them from localStorage and rendering them in the UI.
function loadTasks(columnId) {
  const container = document.getElementById(`${columnId}-tasks`);
  container.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem(columnId)) || [];

  tasks.forEach((task) => {
    container.innerHTML += renderTask(task);
    updateArrowIcons(columnId, task.id);
  });
  updateTaskVisibilityById(columnId);
}

// Retrieves the priority text (e.g., "Low", "Medium") from a task element.
function getPriorityText(taskElement) {
  return taskElement.querySelector(".user-container p img")
    ? taskElement
        .querySelector(".user-container p img")
        .alt.replace(" Priority", "")
    : taskElement.querySelector(".user-container p").innerText.trim();
}

// Returns the appropriate icon path based on the priority level.
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

// Retrieves the assigned users for a task as an array of objects with name and color properties.
function getAssignedUsers(taskElement) {
  return Array.from(taskElement.querySelectorAll(".user-avatar")).map(
    (user) => ({
      name: user.innerText.trim(),
      color: user.style.backgroundColor,
    })
  );
}

// Creates a task object with all relevant properties for saving in localStorage.
function createTaskObject(taskElement, taskId) {
  const priorityText = getPriorityText(taskElement);
  return {
    id: taskId,
    title: taskElement.querySelector("h4").innerText,
    description: taskElement.querySelector("p").innerText,
    priority: priorityText,
    priorityIcon: getPriorityIcon(priorityText),
    category: taskElement.querySelector(".category-label").innerText.trim(),
    assignedUsers: getAssignedUsers(taskElement),
    subtasks: taskElement.subtasks || [],
    completedSubtasks: taskElement.completedSubtasks || []
  };
}

// Saves a task to localStorage under the specified column if it doesn't already exist.
function saveTaskToLocalStorage(columnId, taskElement, taskId) {
  const tasks = JSON.parse(localStorage.getItem(columnId)) || [];

  if (!tasks.find((task) => task.id === taskId)) {
    const newTask = createTaskObject(taskElement, taskId);
    tasks.push(newTask);
    localStorage.setItem(columnId, JSON.stringify(tasks));
  }
}

// Updates the visibility of tasks in a column, hiding or showing the "no tasks" message as needed.
function updateTaskVisibilityById(columnId) {
  const container = document.getElementById(`${columnId}-tasks`);
  const taskList = document.querySelector(`#${columnId} .task-list`);
  const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
  taskList.style.display = tasks.length > 0 ? "none" : "block";
  const visibleTasks = container.querySelectorAll(
    '.user-card:not([style*="display: none"])'
  );
  taskList.style.display = visibleTasks.length === 0 ? "block" : "none";
}

// Filters and displays tasks based on a search input (tasks must match the search text).
function searchFromSearchTaskInput() {
  const searchInput = document.querySelector("#searchTask");
  const searchText =
    searchInput && searchInput.offsetParent !== null
      ? searchInput.value.trim().toLowerCase()
      : "";
  document.querySelectorAll(".user-card").forEach((task) => {
    const taskTitle = task.querySelector("h4")?.textContent.toLowerCase() || "";
    task.style.display =
      searchText.length < 3 || taskTitle.includes(searchText)
        ? "block"
        : "none";
  });
  ["todo", "in-progress", "await-feedback", "done"].forEach(
    updateTaskVisibilityById
  );
}

// Another search function, possibly for a different search input element.
function searchFromSearchInput() {
  const searchInput = document.querySelector("#search");
  const searchText =
    searchInput && searchInput.offsetParent !== null
      ? searchInput.value.trim().toLowerCase()
      : "";
  document.querySelectorAll(".user-card").forEach((task) => {
    const taskTitle = task.querySelector("h4")?.textContent.toLowerCase() || "";
    task.style.display =
      searchText.length < 3 || taskTitle.includes(searchText)
        ? "block"
        : "none";
  });
  ["todo", "in-progress", "await-feedback", "done"].forEach(
    updateTaskVisibilityById
  );
}

// Loads tasks into their respective columns when the page is loaded.
window.addEventListener("load", function () {
  ["todo", "in-progress", "await-feedback", "done"].forEach(loadTasks);
});

// Formats a date string (YYYY-MM-DD) into a more readable format (DD/MM/YYYY)
function formatDate(dateString) {
  if (!dateString) {
    console.warn("Kein Datum übergeben.");
    return "Datum nicht verfügbar";
  }

  const [year, month, day] = dateString.split("-");

  if (!year || !month || !day) {
    console.warn("Ungültiges Datumsformat:", dateString);
    return "Ungültiges Datum";
  }

  return `${day}/${month}/${year}`;
}

// Formats the priority level with both text and icon for display.
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

// Renders the assigned users as HTML elements for display.
function renderAssignedUsers(users) {
  return users
    .map(
      (user) => `
        <div class="user-item">
            <div class="user-avatar" style="background-color: ${user.color};">${
        user.name[0]
      }${user.name.split(" ")[1] ? user.name.split(" ")[1][0] : ""}</div>
            <span class="user-name">${user.name}</span>
        </div>
    `
    )
    .join("");
}

// Sets the style of an element based on the task's category (e.g., User Story, Technical Task).
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

// Redirects the user to the task creation page and stores the current column in localStorage.
function openInputPage(columnId) {
   localStorage.setItem("currentColumn", columnId);
   if (window.innerWidth <= 830) {
     window.location.href = "add-task.html";
     return;
     } 
     renderAddTask();
}

function renderAddTask() {
  let hero = document.getElementById("hero");
  hero.style.display = "flex";
}
