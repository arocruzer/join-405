// Enables the editing of assigned users by rendering a dropdown menu for selection.
function enableUserEdit() {
    const modalAssignedUsers = document.getElementById('modalAssignedUsers');
    modalAssignedUsers.innerHTML = generateUserEditHTML();
    renderDropdownUsers(loadedContacts, selectedUsers);
}

// Retrieves the currently selected task object from localStorage.
function getCurrentTask() {
    const columns = ['todo', 'in-progress', 'await-feedback', 'done'];
    for (const column of columns) {
        const tasks = JSON.parse(localStorage.getItem(column)) || [];
        const task = tasks.find(task => task.id === currentTaskId);
        if (task) {
            return task;
        }
    }
    return null;
}

document.addEventListener('DOMContentLoaded', () => {
    renderDropdownUsers(loadedContacts, selectedUsers);
    addedUsers();
});

// Clears the user contact list for re-rendering.
function clearContactList() {
    const contactList = document.getElementById('contactList');
    if (contactList) {
        contactList.innerHTML = "";
    } else {
        console.error("Das Element 'contactList' wurde nicht gefunden!");
    }
}

// Checks whether a user is already selected for the task.
function isUserSelected(user, selectedUsers) {
    return selectedUsers.some(selected => selected.name === user.name);
}

// Renders the list of selectable users for assignment.
function renderUserList(loadedContacts, selectedUsers) {
    const contactList = document.getElementById('contactList');
    if (!contactList) return;
    loadedContacts.forEach((user, index) => {
        const isChecked = isUserSelected(user, selectedUsers);
        const userElement = createUserElement(user, index, isChecked);
        contactList.innerHTML += userElement;
    });
}

// Combines user rendering and dropdown menu preparation for assigned users.
function renderDropdownUsers(loadedContacts, selectedUsers) {
    clearContactList();
    renderUserList(loadedContacts, selectedUsers);
}

function getInitials(name) {
    const nameParts = name.trim().split(' ');
    if (nameParts.length > 1) {
        return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
}

// Adds a new user to the task and re-renders the assigned user avatars.
function addUserToTask(userName, userColor) {
    if (!userName || !userColor) {
        console.error("Fehler: Benutzername oder Farbe fehlen!");
        return;
    }
    selectedUsers.push({ name: userName, color: userColor });
    renderAssignedUsers(selectedUsers);
}

// Toggles user selection for the task when a checkbox is clicked.
function checkBoxUserTask(index, event) {
    if (event && event.target.tagName === "INPUT") {
        event.stopPropagation();
    }
    const user = loadedContacts[index];
    const contactElement = document.querySelectorAll('.contact')[index];
    const checkbox = document.querySelectorAll('.contact input[type="checkbox"]')[index];
    if (!user) {
        console.error(`User not found at index ${index}`);
        return;
    }
    if (!event || event.target.tagName !== "INPUT") {
        checkbox.checked = !checkbox.checked;
    }
    if (checkbox.checked) {
        if (!selectedUsers.some(u => u.name === user.name)) {
            selectedUsers.push(user);
            contactElement.classList.add('checked');
        }
    } else {
        selectedUsers = selectedUsers.filter(u => u.name !== user.name);
        contactElement.classList.remove('checked');
    }
    addedUsers();
}

// Renders the currently added users as avatars in the modal
function addedUsers() {
    const addedUsersContainer = document.getElementById("addedUsers");
    addedUsersContainer.innerHTML = "";
    selectedUsers.forEach((user, index) => {
        if (index < 4) {
            const nameParts = user.name.split(' ');
            const initials = nameParts.length > 1 
                ? nameParts[0][0] + nameParts[1][0]
                : nameParts[0][0];      
            addedUsersContainer.innerHTML += `
                <div class="user-avatar" style="background-color: ${user.color};">
                    ${initials.toUpperCase()}
                </di
            `;
        }
    });
    if (selectedUsers.length > 4) {
        addedUsersContainer.innerHTML += `
            <div class="user-avatar remaining-users-circle">
                +${selectedUsers.length - 4}
            </div>
        `;
    }
}

// Toggles the visibility of the dropdown menu for user selection.
function openDropDownMenuUser() {
    const contactList = document.getElementById('contactList');
    const dropDownArrowContacts = document.getElementById('drop-down-arrow-contacts');
    if (contactList.style.display === 'none' || !contactList.style.display) {
        contactList.style.display = 'block';
        dropDownArrowContacts.src = "../Assets/arrow_drop_downaa.png";
    } else {
        contactList.style.display = 'none';
        dropDownArrowContacts.src = "../Assets/arrow_drop_downaa (1).png";
    }
}

// Gathers the list of selected users from the modal.
function gatherSelectedUsers() {
    return selectedUsers.map(user => ({
        name: user.name,
        color: user.color,
    }));
}