const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);

let tasks = [];
checkEmptyList();

// functions
function addTask(event) {
	event.preventDefault();

	// get the text of the task from the input field
	const taskText = taskInput.value;

	// создаем объект с задачами
	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false,
	};

	// добавляем задачу в массив
	tasks.push(newTask);

	// формируем CSS class
	const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

	// generate markup for a new task
	const taskHTML = `		
  <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
  <span class="${cssClass}">${newTask.text}</span>
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

	checkEmptyList();
}

function deleteTask(event) {
	if (event.target.dataset.action !== 'delete') return;

	const parentNode = event.target.closest('li');

	// определяем id задачи
	const id = Number(parentNode.id);

	// находим индекс задачи в массиве
	const index = tasks.findIndex((task) => task.id == id);

	// удаляем задачу из массива
	tasks.splice(index, 1);

	// 2 метод - удаляем задачу через фильтрацию массива
	// tasks = tasks.filter((task) => task.id !== id);

	// удаляем задачу из разметки
	parentNode.remove();

	checkEmptyList();
}

function doneTask(event) {
	if (event.target.dataset.action !== 'done') return;

	const parentNode = event.target.closest('li');

	// определяем id задачи
	const id = Number(parentNode.id);

	const task = tasks.find((task) => task.id === id);

	task.done = !task.done;

	const taskTitle = parentNode.querySelector('span');
	taskTitle.classList.toggle('task-title--done');
}

function checkEmptyList() {
	if (tasks.length === 0) {
		const emptyListHTML = `
    <li id="emptyList" class="list-group-item empty-list">
    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3" />
    <div class="empty-list__title">Список дел пуст</div>
  </li>`;

		tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
	}

	if (tasks.length > 0) {
		const emptyListEl = document.querySelector('#emptyList');
		emptyListEl ? emptyListEl.remove() : null;
	}
}
