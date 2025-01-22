let allTasks = {};
const priorityIcons = {
  urgent: "../Assets/urgent_big.png",
  medium: "../Assets/urgent_big.png",
  low: "../Assets/urgent_big.png",
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
  const totalCount = getTotalTaskCount();
  const totalCountElement = document.getElementById("totalTaskCount");
  if (totalCountElement) {
    totalCountElement.textContent = totalCount;
  } else {
    console.error("Element mit ID 'totalTaskCount' nicht gefunden.");
  }
}

function getNextDueTask() {
  const allTasksCombined = [
    ...allTasks.todo,
    ...allTasks.inProgress,
    ...allTasks.awaitFeedback,
    ...allTasks.done,
  ];

  const tasksWithDueDate = allTasksCombined.filter(task => task.dueDate);

  tasksWithDueDate.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return tasksWithDueDate[0] || null;
}

function formatDateLong(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getPriorityIcon(priority) {
  return priorityIcons[priority];
}

function displayNextDueTask() {
  const nextTask = getNextDueTask();
  const nextDueElement = document.getElementById("task-info");

  if (nextTask && nextDueElement) {
    const priorityIcon = getPriorityIcon(nextTask.priority);
    const formattedDate = formatDateLong(nextTask.dueDate);
    nextDueElement.innerHTML = `
                            <div class="task-info">
                        <div class="prio">
                          <div>
                            <img src="${priorityIcon}" />
                          </div>
                          <div class="status">
                            <h4>1</h4>
                            <p>Urgent</p>
                          </div>
                        </div>
                        <hr style="height: 102px; display: inline-block; border: 1px solid #d1d1d1;"/>
                        <div class="date">
                          <h3>${formattedDate}</h3>
                          <p>Upcoming Deadline</p>
                        </div>
                      </div>
    `;
  } else if (nextDueElement) {
    nextDueElement.innerHTML = "<p>Keine anstehenden Aufgaben gefunden.</p>";
  }
}