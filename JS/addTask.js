let dropDownArrow = document.getElementById("drop-down-arrow");
let concatList = document.getElementById("contact-list");
let selectedUsers = [];
let state = 1;

function openDropDownMenu() {
    switch (state) {
        case 1:
            concatList.style.display = 'block';
            dropDownArrow.src = "../Assets/arrow_drop_downaa.png";
            state = 2;
            addUserToTask();
            break;
        case 2:
            concatList.style.display = 'none';
            dropDownArrow.src = "../Assets/arrow_drop_downaa (1).png";
            state = 1;
            break;
    }
}

function getInitials(name) {
    return name
        .split(' ')                
        .map(word => word[0])      
        .join('')                  
        .toUpperCase();            
}

function addUserToTask() {
    concatList.innerHTML = ""; 

    users.forEach((user, index) => {
        let isChecked = selectedUsers.includes(user) ? "checked" : "";

        let initials = getInitials(user.name);

        let color = user.color

        concatList.innerHTML += renderAddToTaskContacts(color, initials, user, index, isChecked);
    });
}

function checkBoxUserTask(index) {
    const user = users[index];
    const checkbox = document.querySelectorAll('.contact input[type="checkbox"]')[index];

    if (checkbox.checked) {
        if (!selectedUsers.includes(user)) {
            selectedUsers.push(user);
        }
    } else {
        selectedUsers = selectedUsers.filter((u) => u !== user);
    }

    addedUsers();
}

function addedUsers() {
  let addedUsers = document.getElementById("addedUers");
  addedUsers.innerHTML = "";

  selectedUsers.forEach((user) => {
      let initials = getInitials(user.name);

      let color = user.color;  

      addedUsers.innerHTML += renderAddedUsers(color, initials);
  });
}

/*function clearTask() {
    document.getElementById("title-input").value = "";
    document.getElementById("description").value = "";
    document.getElementById("addedUers").innerHTML = "";
    document.getElementById("date-input").value = "";
}*/
// Funktion zum Erstellen einer neuen Aufgabe
// Kategorie aus der URL auslesen und im Formular speichern
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        localStorage.setItem("currentCategory", category);
    }
};

// Aufgabe mit der gespeicherten Kategorie speichern
function createTask() {
    const title = document.getElementById("title-input").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("date-input").value;
    const priority = document.querySelector(".btn-prio.active")?.textContent || "Low";

    // Kategorie aus dem localStorage auslesen
    const category = localStorage.getItem("currentCategory") || "to-do";

    if (!title || !dueDate) {
        alert("Please fill out all required fields!");
        return;
    }

    const newTask = {
        id: `task-${Date.now()}`,
        title,
        description,
        dueDate,
        priority,
        category
    };

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Zurück zum Board mit aktualisierter Liste
    window.location.href = "board.html";
}
