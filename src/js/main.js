const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');
const heart = document.querySelector('#heart');

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);

heart.addEventListener('click', addClassHeart);

taskInput.addEventListener('keydown', keyHandlerEsc);

let tasks = [];

// проверяем есть ли local Storage для записи в массив
if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));

	// передаетм данные из localStorage в массив
	tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

// функции
function addTask(event) {
	event.preventDefault();

	// Получите текст задачи из поля ввода
	const taskText = taskInput.value;

	// создаем объект с задачами
	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false,
	};

	// добавляем задачу в массив
	tasks.push(newTask);

	renderTask(newTask);

	// clear the input field and return focus to it
	taskInput.value = '';
	taskInput.focus();

	checkEmptyList();

	saveToLocalStorage();
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

	saveToLocalStorage();
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

	saveToLocalStorage();
}

function checkEmptyList() {
	// Проверка не вустой ли массив
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

function saveToLocalStorage() {
	// сохранение массива в Local Storage браузера
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
	// формируем CSS class
	const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

	// генерировать разметку для новой задачи
	const taskHTML = `		
  <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
  <span class="${cssClass}">${task.text}</span>
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
}

function addClassHeart() {
	if (heart.classList.contains('fa-heart--red')) heart.classList.remove('fa-heart--red');
	else heart.classList.add('fa-heart--red');
}

function keyHandlerEsc(e) {
	if (e.keyCode === 27 || e.key === 'Escape') {
		console.log('esc');
		e.target.value = '';
		e.target.blur();
	}
}
