document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskLabelInput = document.getElementById('task-label');
    const taskList = document.getElementById('task-list');
    const todoApp = document.getElementById('todo-app');

    // Cargar las tareas guardadas de LocalStorage
    loadTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        const taskLabel = taskLabelInput.value.trim();

        if (taskText && taskLabel) {
            addTask(taskText, taskLabel);
            taskInput.value = '';
            taskLabelInput.value = '';
        }
    });

    function addTask(taskText, taskLabel) {
        const li = document.createElement('li');
        const taskContent = document.createElement('span');
        taskContent.textContent = `${taskText} [${taskLabel}]`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(taskContent);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            const text = li.querySelector('span').textContent;
            const taskText = text.substring(0, text.lastIndexOf(' ['));
            const taskLabel = text.substring(text.lastIndexOf(' [') + 2, text.length - 1);
            tasks.push({ text: taskText, label: taskLabel });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        savedTasks.forEach(task => {
            addTask(task.text, task.label);
        });
    }

    // Evento beforeunload para asegurarse de que las tareas se guarden antes de cerrar la página
    window.addEventListener('beforeunload', saveTasks);
});
