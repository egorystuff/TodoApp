// find elements on page
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

// adding a task
form.addEventListener('submit', addTask);

// deleting a task
tasksList.addEventListener('click', deleteTask);

// task mark completed
tasksList.addEventListener('click', doneTask);

// functions
function addTask(event) {
	event.preventDefault();

	// get the task text
	const taskText = taskInput.value;

	// generate markup for a new task
	const taskHTML = `		
  <li class="list-group-item d-flex justify-content-between task-item">
  <span class="task-title">${taskText}</span>
  <div class="task-item__buttons">
    <button type="button" data-action="done" class="btn-action">
      <img src="./img/tick.svg" alt="Done" width="18" height="18" />
    </button>
    <button type="button" data-action="delete" class="btn-action">
      <img src="./img/cross.svg" alt="Done" width="18" height="18" />
    </button>
  </div>
</li>`;

	// add a task to the page
	tasksList.insertAdjacentHTML('beforeend', taskHTML);

	// clear the input field and return focus to it
	taskInput.value = '';
	taskInput.focus();

	// hide the block "To-do list is empty"
	if (tasksList.children.length > 1) {
		emptyList.classList.add('none');
	}
}

function deleteTask(event) {
	if (event.target.dataset.action === 'delete') {
		const parentNode = event.target.closest('li');
		parentNode.remove();
	}

	if (tasksList.children.length === 1) {
		emptyList.classList.remove('none');
	}
}

function doneTask(event) {
	if (event.target.dataset.action === 'done') {
		const parentNode = event.target.closest('li');
		const taskTitle = parentNode.querySelector('span');
		taskTitle.classList.toggle('task-title--done');
	}
}
