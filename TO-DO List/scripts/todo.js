// Selecting necessary elements
const newTaskForm = document.getElementById("new-task-form");
const newTaskInput = document.getElementById("new-task-input");
const taskList = document.getElementById("tasks");

// Adding event listener for form submission
newTaskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const taskName = newTaskInput.value.trim();
    
    if (taskName !== "") {
        // Adding task with location
        const taskLocation = document.getElementById('task-location').value;
        addTask(taskName, taskLocation);
        newTaskInput.value = ""; // Clear input field after adding task
    } else {
        alert("Task name cannot be empty!"); // Notify if the task name is empty
    }
});

// Function to add task
function addTask(taskName, taskLocation) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.textContent = taskName + " - " + taskLocation; // Displaying task name and location

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.classList.add("delete-task-btn");
    deleteButton.addEventListener("click", function() {
        taskItem.remove();
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}
