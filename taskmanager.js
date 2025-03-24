// Task class definition
class Task {
    constructor(name, description, status = 'pending') {
        this.name = name;
        this.description = description;
        this.status = status;
    }
}


let tasks = [];

try {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        // Parse the saved tasks
        const parsedTasks = JSON.parse(savedTasks);
        
        // Verify it's an array
        if (Array.isArray(parsedTasks)) {
            tasks = parsedTasks;
        } else {
            console.error('Saved tasks is not an array:', parsedTasks);
            tasks = [];
        }
    }
} catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    tasks = [];
}

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');


function renderTasks() {
  
    taskList.innerHTML = '';
    
    // table structure
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
  
    thead.innerHTML = `
        <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Actions</th>
        </tr>
    `;
    

    if (tasks && tasks.length > 0) {
        tasks.forEach((task, index) => {
            const tr = document.createElement('tr');
            if (task.status === 'completed') {
                tr.classList.add('completed');
            }
            
            tr.innerHTML = `
                <td>${task.name}</td>
                <td>${task.description}</td>
                <td class="action-buttons">
                    <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                    <button class="status-btn" onclick="toggleStatus(${index})">${task.status === 'pending' ? 'Complete' : 'Pending'}</button>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
    } else {

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td colspan="3" style="text-align: center;">No tasks found.</td>
        `;
        tbody.appendChild(tr);
    }
    

    table.appendChild(thead);
    table.appendChild(tbody);
    taskList.appendChild(table);
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    
    if (taskName) {
        
        const newTask = new Task(taskName, taskDescription);
        
        
        tasks.push(newTask);
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
 
        renderTasks();
        
        taskForm.reset();
    } else {
        alert('Task name required!');
    }
});

function editTask(index) {
    const task = tasks[index];
    const newName = prompt('Edit task name:', task.name);
    const newDescription = prompt('Edit task description:', task.description);
    
    if (newName !== null) {
        task.name = newName;
        if (newDescription !== null) {
            task.description = newDescription;
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function deleteTask(index) {
    if (confirm('Are you sure ?')) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function toggleStatus(index) {
    const task = tasks[index];
    task.status = task.status === 'pending' ? 'completed' : 'pending';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
});