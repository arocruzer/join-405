let choseUser = document.getElementById ("browsers");

function addUserToTask() {
    let options = "";
    users.forEach((user) => {
        options += `<option value="${user.name}"></option>`;
      });
    
      choseUser.innerHTML = options;
    }