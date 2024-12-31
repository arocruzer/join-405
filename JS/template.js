function renderAddToTaskContacts(color, initials, user, index, isChecked) {
  return `<div class="contact">
                <div class="name-and-img">
                    <div class="initials-circle" style="background-color: ${color};">
                        ${initials}
                    </div>
                    <p>${user.name}</p>
                </div>
                <input onclick="checkBoxUserTask(${index})" type="checkbox" ${isChecked} name="checkbox">
            </div>`;
}
function renderAddedUsers(color, initials) {
  return `
            <div class="initials-circle" style="background-color: ${color};">
                ${initials}
            </div>`;
}
