const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const filterCategory = document.getElementById('filter-category');
const sortBy = document.getElementById('sort-by');
const sortOrder = document.getElementById('sort-order');

let tasks = [];

function renderTask(task) {
   const taskItem = document.createElement('li');
   const taskText = document.createElement('span');
   taskText.innerText = task.text;
   taskItem.appendChild(taskText);

   const category = document.createElement('span');
   category.innerText = task.category;
   taskItem.appendChild(category);

   const editButton = document.createElement('button');
   editButton.innerText = 'Edit';
   editButton.addEventListener('click', () => {
      const editText = prompt('Edit task:', task.text);
      if (editText !== null && editText.trim() !== '') {
         task.text = editText.trim();
         taskText.innerText = task.text;
      }
   });
   taskItem.appendChild(editButton);

   const deleteButton = document.createElement('button');
   deleteButton.innerText = 'Delete';
   deleteButton.addEventListener('click', () => {
      const index = tasks.indexOf(task);
      if (index !== -1) {
         tasks.splice(index, 1);
         taskList.removeChild(taskItem);
      }
   });
   taskItem.appendChild(deleteButton);

   const reminderButton = document.createElement('button');
   reminderButton.innerText = 'Set Reminder';
   reminderButton.addEventListener('click', () => {
      const reminderDate = prompt('Set reminder date (YYYY-MM-DD):');
      if (reminderDate !== null && reminderDate.trim() !== '') {
         task.reminder = new Date(reminderDate.trim());
         if (task.reminder < Date.now()) {
            taskItem.classList.add('overdue');
         }
      }
   });
   taskItem.appendChild(reminderButton);

   const completedCheckbox = document.createElement('input');
   completedCheckbox.type = 'checkbox';
   completedCheckbox.id = `task-${tasks.length}`;
   completedCheckbox.addEventListener('change', () => {
      if (completedCheckbox.checked) {
         task.completed = true;
         taskItem.classList.add('completed');
      } else {
         task.completed = false;
         taskItem.classList.remove('completed');
      }
   });
   taskItem.appendChild(completedCheckbox);

   if (task.completed) {
      taskItem.classList.add('completed');
      completedCheckbox.checked = true;
   }

   if (task.reminder !== undefined && task.reminder < Date.now()) {
      taskItem.classList.add('overdue');
   }

   taskList.appendChild(taskItem);
}

addTaskButton.addEventListener('click', () => {
   const newTaskText = newTaskInput.value.trim();
   if (newTaskText !== '') {
      const newTask = {
         text: newTaskText,
         category: document.getElementById('task-category').value,
         created: new Date(),
         completed: false
      };
      tasks.push(newTask);
      renderTask(newTask);
      newTaskInput.value = '';
   }
});

filterCategory.addEventListener('change', () => {
   const category = filterCategory.value;
   const filteredTasks = tasks.filter(task => category === 'all' || task.category === category);
   taskList.innerHTML = '';
   filteredTasks.forEach(task => renderTask(task));
});

sortBy.addEventListener('change', () => {
   const sortKey = sortBy.value;
   const sortFunction = (a, b) => {
      if (sortKey === 'text') {
         return a.text.localeCompare(b.text);
      } else if (sortKey === 'category') {
         return a.category.localeCompare(b.category);
      } else if (sortKey === 'date') {
         return a.created - b.created;
      } else {
         return 0;
      }
   };
   const sortedTasks = tasks.slice().sort(sortFunction);
   if (sortOrder.checked) {
      sortedTasks.reverse();
   }
   taskList.innerHTML = '';
   sortedTasks.forEach(task => renderTask(task));
});