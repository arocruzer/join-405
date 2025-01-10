let dropDownArrow = document.getElementById("drop-down-arrow");
let concatList = document.getElementById("contact-list");
let categoryList = document.getElementById("category-list");
let btnUrgent = document.getElementById("btn-urgent");
let btnMedium = document.getElementById("btn-medium");
let btnLow = document.getElementById("btn-low");
let selectedUsers = [];
let state = 1;
let page = "add-task";

function openDropDownMenuUser() {
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

function openDropDownMenuCategory() {
    switch (state) {
        case 1:
            categoryList.style.display = 'block';
            dropDownArrow.src = "../Assets/arrow_drop_downaa.png";
            state = 2;
            break;
        case 2:
            categoryList.style.display = 'none';
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

function clearTask() {
    document.getElementById("title-input").value = "";
    document.getElementById("description").value = "";
    document.getElementById("addedUers").innerHTML = "";
    document.getElementById("date-input").value = "";
    document.getElementById("subtask-input").value = "";
    btnMedium.style.backgroundColor = '#FFA800';
    btnLow.style.backgroundColor = '#ffffff';
    btnUrgent.style.backgroundColor = '#ffffff';
}

function addTask() {
    let title = document.getElementById("title-input").value
    let description = document.getElementById("description").value
    let date = document.getElementById("date-input").value
    let subtasks = document.getElementById("subtask-input").value
    console.log(title, description, date, subtasks, selectedUsers);
    clearTask();
}

function chnageColorPrioBtn() {
    switch (state) {
        case 1:
            btnUrgent.style.backgroundColor = '#FFA800';
            btnMedium.style.backgroundColor = '#ffffff';
            btnLow.style.backgroundColor = '#ffffff';
            state = 2;
            break;
        case 2:
            btnUrgent.style.backgroundColor = '#ffffff';
            btnMedium.style.backgroundColor = '#ffffff';
            btnLow.style.backgroundColor = '#FFA800';
            state = 3;
            break;
        case 3:
            btnUrgent.style.backgroundColor = '#ffffff';
            btnMedium.style.backgroundColor = '#FFA800';
            btnLow.style.backgroundColor = '#ffffff';
            state = 1;
            break;
    }
}