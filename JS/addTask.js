let dropDownArrow = document.getElementById("drop-down-arrow");
let concatList = document.getElementById("contact-list");
let state = 1

function openDropDownMenu() {
  switch (state) {
    case 1: 
      concatList.style.display = 'block'; 
      dropDownArrow.src = "../Assets/arrow_drop_downaa.png"
      state = 2; 
      break;
    case 2: 
      concatList.style.display = 'none';
      dropDownArrow.src = "../Assets/arrow_drop_downaa (1).png"
      state = 1; 
      break;
  }
}

function addUserToTask() {
    users.forEach((user) => {
        concatList.innerHTML += `<div class="contacts> 
                          <div class"name-and-img>
                            <img src="../Assets/Profile badge.png" 
                            <p>${user.name}"</p>
                          </div>
                          <input type="checkbox">
                        </div>`;
      });
    }