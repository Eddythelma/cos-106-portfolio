// ==========================================
// ACADEMIC PLANNER: Interactive Task Manager
// ==========================================

// We use an array to store your tasks[cite: 5]
let tasks = [];

// Grab the HTML elements using the IDs we set up earlier (DOM Manipulation)[cite: 5]
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Only run this code if the user is currently on the Planner page
if (addTaskBtn) {
    // Event Handling: Listen for a click on the "Add Task" button[cite: 5]
    addTaskBtn.addEventListener("click", function() {
        let taskText = taskInput.value.trim();
        
        if (taskText !== "") {
            // Add the new task to our array[cite: 3]
            tasks.push({ text: taskText, completed: false });
            taskInput.value = ""; // Clear the input box
            refreshTasks(); // Update the screen
        }
    });
}

// Function to redraw the task list whenever something changes
function refreshTasks() {
    taskList.innerHTML = ""; // Clear the current list on the screen
    
    // Loop through our array and create a new HTML list item for each task
    for (let i = 0; i < tasks.length; i++) {
        let li = document.createElement("li");
        li.textContent = tasks[i].text + " ";
        
        // If the task is marked completed, cross it out visually
        if (tasks[i].completed) {
            li.style.textDecoration = "line-through";
            li.style.color = "#999";
        }

        // Create the "Complete" button[cite: 3]
        let completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.style.marginLeft = "10px";
        completeBtn.style.padding = "8px 15px"; // Make these buttons a bit smaller
        completeBtn.addEventListener("click", function() {
            tasks[i].completed = !tasks[i].completed; // Toggle the status
            refreshTasks(); // Update the screen[cite: 5]
        });

        // Create the "Delete" button[cite: 3]
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.style.padding = "8px 15px";
        deleteBtn.style.backgroundColor = "#e74c3c"; // Red for delete
        deleteBtn.addEventListener("click", function() {
            tasks.splice(i, 1); // Remove it from the array
            refreshTasks(); 
        });

        // Attach the buttons to the task, and the task to the list
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }
}


// ==========================================
// CONTACT PAGE: Form Validation
// ==========================================

const contactForm = document.getElementById("contactForm");
const formError = document.getElementById("formError");

// Only run this code if the user is currently on the Contact page
if (contactForm) {
    // Event Handling: Listen for the user clicking "Send Message"[cite: 5]
    contactForm.addEventListener("submit", function(event) {
        // Stop the page from refreshing immediately so we can check the rules
        event.preventDefault();
        
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let message = document.getElementById("message").value.trim();
        
        formError.style.color = "#e74c3c"; // Red text for errors

        // Rule 1: No field is empty[cite: 4]
        if (name === "" || email === "" || phone === "" || message === "") {
            formError.textContent = "Error: All fields are required. Please do not leave any blank.";
            return; // Stop the function here
        }
        
        // Rule 2: Email format is valid (basic check for the '@' symbol)[cite: 4]
        if (!email.includes("@") || !email.includes(".")) {
            formError.textContent = "Error: Please enter a valid email address.";
            return;
        }

        // Rule 3: Phone number contains ONLY digits[cite: 4]
        // This math logic checks if the string contains anything that is not 0-9
        if (!/^\d+$/.test(phone)) {
            formError.textContent = "Error: Phone number must contain only numbers (no spaces, dashes, or letters).";
            return;
        }

        // If the user passes all the rules, show a success message!
        formError.style.color = "#2ecc71"; // Green text for success
        formError.textContent = "Success! Your message has been validated and sent.";
        contactForm.reset(); // Clear the form boxes
    });
}