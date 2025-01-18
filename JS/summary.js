let allTasks = {}; 


function initSummary() {
    loadTasksFromLocalStorage();
    displayTaskCounts();
    displayTotalTaskCount();
}

function loadTasksFromLocalStorage() {
    allTasks = {
        todo: JSON.parse(localStorage.getItem('todo')) || [],
        inProgress: JSON.parse(localStorage.getItem('in-progress')) || [],
        done: JSON.parse(localStorage.getItem('done')) || [],
        awaitFeedback: JSON.parse(localStorage.getItem('await-feedback')) || [],
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
    const todoCount = getTaskCount('todo');
    const inProgressCount = getTaskCount('in-progress');
    const awaitFeedbackCount = getTaskCount("await-feedback");
    const doneCount = getTaskCount('done');

    document.getElementById('todoCount').innerHTML = todoCount;
    document.getElementById('inProgressCount').innerHTML = inProgressCount;
    document.getElementById('awaitFeedbackCount').innerHTML = awaitFeedbackCount;
    document.getElementById('doneCount').innerHTML = doneCount;
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
    const totalCountElement = document.getElementById('totalTaskCount');
    if (totalCountElement) {
        totalCountElement.textContent = totalCount;
    } else {
        console.error("Element mit ID 'totalTaskCount' nicht gefunden.");
    }
}