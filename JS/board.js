function toggleCardModal() {
    const modal = document.getElementById("cardModal");
    modal.classList.toggle("d-none");
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    document.querySelectorAll(".task-section").forEach(section => {
        const category = section.querySelector('h2').textContent.toLowerCase().replace(/\s+/g, '-');
        const userCard = section.querySelector(".user-card");
        const taskList = section.querySelector(".task-list");

        // Container leeren
        userCard.innerHTML = "";
        taskList.innerHTML = "";

        const filteredTasks = tasks.filter(task => task.category === category);

        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<div class="no-tasks">No tasks available</div>';
        } else {
            let tasksHTML = ""; // Für normale Schleife
            for (const task of filteredTasks) {
                let userAvatarsHTML = "";

                if (task.assignedTo && task.assignedTo.length > 0) {
                    for (const user of task.assignedTo) {
                        userAvatarsHTML += `
                            <div class="user-avatar" style="background-color: ${user.color};">
                                ${user.initials}
                            </div>`;
                    }
                } else {
                    userAvatarsHTML = '<span style="color: #999;">No users assigned</span>';
                }

                tasksHTML += `
                    <div class="user-story-card" onclick="toggleCardModal()">
                        <div class="progress-container">
                            <h3>User Story</h3>
                        </div>
                        <h4>${task.title}</h4>
                        <p>${task.description}</p>
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress" style="width: 0%;"></div>
                            </div>
                            <span class="subtasks">0/2 Subtasks</span>
                        </div>
                        <div class="user-container">
                            <div class="user-avatar-container">
                                ${userAvatarsHTML}
                            </div>
                            <img class="avatar-symbol" src="../Assets/Prio media.png" alt="Prio media">
                        </div>
                    </div>
                `;
            }

            // Aufgaben in den userCard Container einfügen
            userCard.innerHTML = tasksHTML;
        }

        // Sichtbarkeit der Container basierend auf vorhandenen Aufgaben
        userCard.classList.toggle('d-none', filteredTasks.length === 0);
        taskList.classList.toggle('d-none', filteredTasks.length > 0);
    });
}
