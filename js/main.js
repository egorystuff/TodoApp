const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');
const heart = document.querySelector('#heart');
const btnAdd = document.querySelector('#btnAdd');
const box = document.querySelector('#box');

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);

heart.addEventListener('click', addClassHeart);

taskInput.addEventListener('keydown', keyHandlerEsc);

let tasks = [];

// проверяем есть ли local Storage для записи в массив
if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));

	// передаем данные из localStorage в массив
	tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

addDisabledBtn();

checkBox();

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

	checkBox();

	addDisabledBtn();
}

function deleteTask({ target }) {
	if (target.dataset.action !== 'delete') return;

	const parentNode = target.closest('li');

	// определяем id задачи
	const id = Number(parentNode.id);

	// находим индекс задачи в массиве
	const index = tasks.findIndex((task) => task.id === id);

	// удаляем задачу из массива
	tasks.splice(index, 1);

	// 2 метод - удаляем задачу через фильтрацию массива
	// tasks = tasks.filter((task) => task.id !== id);

	// удаляем задачу из разметки
	parentNode.remove();

	checkEmptyList();

	saveToLocalStorage();
}

function doneTask({ target }) {
	if (target.dataset.action !== 'done') return;

	const parentNode = target.closest('li');

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
  <li id="${task.id}"  class="list-group-item d-flex justify-content-between task-item">
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
		e.target.value = '';
		e.target.blur();
		addDisabledBtn();
		return;
	}

	if (e.key === 'Enter') {
		const taskText = taskInput.value;

		// создаем объект с задачами
		const newTask = {
			id: Date.now(),
			text: taskText,
			done: false,
		};

		tasks.push(newTask);

		renderTask(newTask);

		taskInput.value = '';
		taskInput.blur();

		addDisabledBtn();
		taskInput.focus();

		checkEmptyList();

		saveToLocalStorage();

		checkBox();

		addDisabledBtn();
	}
}

const cross = document.getElementById('cross');

cross.addEventListener('click', () => {
	taskInput.value = '';
	cross.classList.remove('active');
	addDisabledBtn();
});

function addDisabledBtn() {
	btnAdd.setAttribute('disabled', true);

	taskInput.oninput = function () {
		if (!taskInput.value.trim()) {
			cross.classList.remove('active');
			btnAdd.setAttribute('disabled', true);
		} else {
			cross.classList.add('active');
			btnAdd.removeAttribute('disabled');
		}
	};
}

function checkBox() {
	box.oninput = function () {
		if (box.checked) {
			btnAdd.setAttribute('disabled', true);
			taskInput.setAttribute('disabled', true);
			addDisabled();
		} else {
			btnAdd.removeAttribute('disabled');
			taskInput.removeAttribute('disabled');
			dellDisabled();
			addDisabledBtn();
		}
	};
}

function addDisabled() {
	const btnAll = document.querySelectorAll('button');
	const linksAll = document.querySelectorAll('a');
	const I = document.querySelectorAll('i');

	for (let i = 0; i < btnAll.length; i++) {
		btnAll[i].classList.add('disabled');
	}

	for (let i = 0; i < linksAll.length; i++) {
		linksAll[i].classList.add('disabled');
	}

	for (let i = 0; i < I.length; i++) {
		I[i].classList.add('disabled');
	}
}

function dellDisabled() {
	const btnAll = document.querySelectorAll('button');
	const linksAll = document.querySelectorAll('a');
	const I = document.querySelectorAll('i');

	for (let i = 0; i < btnAll.length; i++) {
		btnAll[i].classList.remove('disabled');
	}

	for (let i = 0; i < linksAll.length; i++) {
		linksAll[i].classList.remove('disabled');
	}

	for (let i = 0; i < I.length; i++) {
		I[i].classList.remove('disabled');
	}
}
