const priorityIcons = {
  urgent: "../Assets/prio_arrow_white.png",
  medium: "../Assets/prio_medium.png",
  low: "../Assets/prio_arrowDown_white.png",
};

function initSummary() {
  loadTasksFromLocalStorage();
  displayTaskCounts();
  displayTotalTaskCount();
  displayNextDueTask();
  time();
}

function time() {
  let date = new Date();
  let hour = date.getHours();

  let greeting = document.getElementById("greeting");
  if (hour >= 19) {
    greeting = "Good Evening";
  } else if (hour >= 12) {
    greeting = "Good Afternoon";
  } else if (hour >= 6) {
    greeting = "Good Morning";
  } else {
    greeting = "Hello";
  }
  renderRegardsUser(greeting);
}
/**
 * 
 * @param {string} greeting Function time() returns string with time of day
 */
function renderRegardsUser(greeting) {
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  let userName = loggedInUser ? loggedInUser.name : "";
  let regardsUser = document.getElementById("regardsUser");

  if (regardsUser && userName == "") {
    regardsUser.innerHTML = regardsGastTemplate(greeting, userName);
  } else {
    regardsUser.innerHTML = regardsUserTemplate(greeting, userName);
  }
}

function loadTasksFromLocalStorage() {
  allTasks = {
    todo: JSON.parse(localStorage.getItem("todo")) || [],
    inProgress: JSON.parse(localStorage.getItem("in-progress")) || [],
    awaitFeedback: JSON.parse(localStorage.getItem("await-feedback")) || [],
    done: JSON.parse(localStorage.getItem("done")) || [],
  };
}
/**
 * 
 * @param {} category 
 * @returns 
 */
function getTaskCount(category) {
  if (allTasks[category]) {
    return allTasks[category].length;
  }
  console.warn(`Kategorie "${category}" nicht gefunden.`);
  return 0;
}

function displayTaskCounts() {
  const todoCount = getTaskCount("todo");
  const inProgressCount = getTaskCount("inProgress");
  const awaitFeedbackCount = getTaskCount("awaitFeedback");
  const doneCount = getTaskCount("done");

  document.getElementById("todoCount").innerHTML = todoCount;
  document.getElementById("inProgressCount").innerHTML = inProgressCount;
  document.getElementById("awaitFeedbackCount").innerHTML = awaitFeedbackCount;
  document.getElementById("doneCount").innerHTML = doneCount;
}

function getTotalTaskCount() {
  let totalCount = 0;
  for (const category in allTasks) {
    if (Array.isArray(allTasks[category])) {
      totalCount += allTasks[category].length;
    }
  }
  return totalCount;
}
function displayTotalTaskCount() {
  let totalCount = getTotalTaskCount();
  let totalCountElement = document.getElementById("totalTaskCount");
  if (totalCountElement) {
    totalCountElement.textContent = totalCount;
  } else {
    console.error("Element mit ID 'totalTaskCount' nicht gefunden.");
  }
}

function getNextDueTask() {
  let allTasksCombined = [
    ...allTasks.todo,
    ...allTasks.inProgress,
    ...allTasks.awaitFeedback,
    ...allTasks.done,
  ];

  let tasksWithDueDate = allTasksCombined.filter(task => task.dueDate);

  tasksWithDueDate.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return tasksWithDueDate[0] || null;
}

function formatDateLong(dateString) {
  let date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getPriorityIcon(priority) {
  return priorityIcons[priority];
}

function getPriorityClass(priority) {
  return `prio-${priority}`; 
}

function getPriorityText(priority) {
  switch (priority) {
    case "urgent":
      return "Urgent";
    case "medium":
      return "Medium";
    case "low":
      return "Low";
    default:
      return "Unknown";
  }
}

function displayNextDueTask() {
  const nextTask = getNextDueTask();
  const nextDueElement = document.getElementById("task-info");

  if (nextTask && nextDueElement) {
    const priorityIcon = getPriorityIcon(nextTask.priority); 
    const formattedDate = formatDateLong(nextTask.dueDate); 
    const priorityText = getPriorityText(nextTask.priority); 

    nextDueElement.innerHTML = getDueDateTemplate(priorityIcon, formattedDate, priorityText);
  } else if (nextDueElement) {
    nextDueElement.innerHTML = "<p>Keine anstehenden Aufgaben gefunden.</p>";
  }
}