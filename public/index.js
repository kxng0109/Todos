'use strict'

const main = document.querySelector('#main');
const mainContent = document.querySelector('.maincontent');

if (!localStorage.new) {
	localStorage.setItem('new', 1);
	middleText.textContent = `Welcome, click the button at the button-right corner to start`;
	middleText.style.display = 'block';
} else{
	// let previous =  localStorage.getItem('before');
	// mainContent.innerHTML = JSON.parse(previous);
	// let previousContentClass =  localStorage.getItem('contentsClass');
	// let contentClassList = JSON.parse(previousContentClass);
	// contentClassList.forEach((element, index) => mainContent.classList.add(`${element}`))
}

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
	document.documentElement.classList.add('dark');
} else {
	document.documentElement.classList.remove('dark');
}

let stuffs = () =>{
	const addBtn = document.querySelector('#add');
	const SLIDER = document.querySelector('#slider');
	const SLIDER_CIRCLE = document.querySelector('#slider-circle');
	const middleText = document.querySelector('#middle-text');
	const undoneTodosDiv = document.querySelector('#undone-todos-div');
	const doneTodosDiv = document.querySelector('#done-todos-div');
	const editPopupArea = document.querySelector('#editpopuparea');
	const doneEditing = document.querySelector('#done-editing-btn');
	const editPopup = document.querySelector('#editpopup');
	const pendingTasks = document.querySelector('#pending');
	const completedTasks = document.querySelector('#completed');
	let todos = document.querySelectorAll('.todos');
	let undoneTodos = document.querySelectorAll('.undone-todos');
	let doneTodos = document.querySelectorAll('.done-todos');
	let pencilIcon = document.querySelectorAll('.pencil-icon');
	let todosText = document.querySelectorAll('.todos-text');
	let checkBoxes = document.querySelectorAll('.check-box');
	let deleteBtn = document.querySelectorAll('.delete');

	let todosChecker = () =>{
		middleText.style.display = 'none';
		switch (true) {
			case undoneTodosDiv.children.length === 0 && doneTodosDiv.children.length !== 0:
				pendingTasks.style.display = 'none';
				completedTasks.style.display = 'block';
			break;
			case undoneTodosDiv.children.length !== 0 && doneTodosDiv.children.length === 0:
				completedTasks.style.display = 'none';
				pendingTasks.style.display = 'block';
			break;
			case undoneTodosDiv.children.length === 0 && doneTodosDiv.children.length === 0:
				completedTasks.style.display = 'none';
				pendingTasks.style.display = 'none';
				middleText.textContent = `You're all caught up!&#128077;`
				middleText.style.display = 'block';
			break;
			default:
				completedTasks.style.display = 'block';
				pendingTasks.style.display = 'block';
			break;
		}
	}

	SLIDER.onclick = () =>{
		if (document.documentElement.classList.contains('dark')) {
		 	localStorage.setItem('theme', 'light');
		 	return document.documentElement.classList.remove('dark');
	  }

		document.documentElement.classList.add('dark');
		localStorage.setItem('theme', 'dark');
	}

	let editFunction = aNode =>{
		editPopup.style.display = 'block';
		main.style.filter = 'brightness(50%)';
		addBtn.style.filter = 'brightness(50%)';
		editPopupArea.textContent = aNode.textContent;
		editPopupArea.style.border = 'none';
		mainContent.style.pointerEvents = 'none';

		main.onmousedown = () => {
			editPopup.style.display = 'none';
			main.style.filter = 'brightness(100%)';
			addBtn.style.filter = 'brightness(100%)';
			mainContent.style.pointerEvents = 'auto';
		}

		doneEditing.onclick = () =>{
			if (editPopupArea.textContent == '' || editPopupArea.textContent == ' ' || editPopupArea.textContent == '‎') {return editPopupArea.style.border = '1px solid red'}
			aNode.textContent = editPopupArea.textContent;
			editPopup.style.display = 'none';
			main.style.filter = 'brightness(100%)';
			addBtn.style.filter = 'brightness(100%)';
		}
	}

	pencilIcon.onclick = () => alert('hello')

	pencilIcon.forEach((element, index) =>{
		pencilIcon[index].onclick = () => editFunction(todosText[index]);
	});

	checkBoxes.forEach((element, index) =>{
		checkBoxes[index].oninput = () =>{
			if (checkBoxes[index].parentNode.classList.contains('undone-todos')) {
				todos[index].style.animation = 'goOut 0.2s linear forwards';
				todos[index].classList.remove('undone-todos');
				todos[index].classList.add('done-todos');
				setTimeout(() =>{
					todos[index].style.animation = 'goOut 0.2s linear reverse forwards';
					doneTodosDiv.appendChild(todos[index]);
					setTimeout(() => {
						todos[index].style.animation = '';
						setTimeout(() => todosChecker(), 100);
					} , 200);
				}, 200);
			} else {
				todos[index].style.animation = 'goOut 0.2s linear forwards';
				todos[index].classList.remove('done-todos');
				todos[index].classList.add('undone-todos');
				setTimeout(() =>{
					todos[index].style.animation = 'goOut 0.2s linear reverse forwards';
					undoneTodosDiv.appendChild(todos[index]);
					setTimeout(() => {
						todos[index].style.animation = '';
						setTimeout(() => todosChecker(), 100);
					} , 200);
				}, 200);
			}
		}
	})

	deleteBtn.forEach((element, index) =>{
		deleteBtn[index].onclick  = () => {
			todos[index].style.animation = 'goOut 0.5s linear forwards';
			setTimeout(() => {
				todos[index].remove();
				setTimeout(() => todosChecker(), 100);
			}, 500);
		};
	});

	addBtn.onclick = () =>{
		let index = undoneTodosDiv.children.length;
		let createAnElement = (element, varName, theClassName, parentName) =>{
			switch (true) {
				case element !== "":
					varName = document.createElement(element);
					varName.classList.add(theClassName);
					return varName;
				break;

				case parentName !== undefined:
					parentName.appendChild(varName);
				break;

				case theClassName !== "" && element == "":
					varName.classList.add(theClassName);
				break;
			}
		}

		let outerDiv = createAnElement("div", "outerDiv", "todos");
		createAnElement("", outerDiv, "undone-todos");
		let theInput = createAnElement("input", "theInput", "check-box");
		theInput.setAttribute('type', 'checkbox');
		let theP = createAnElement("p", "theP", "todos-text");
		let innerDiv = createAnElement("div", "innerDiv", "lol");
		let pencil = createAnElement("ion-icon", "pencil", "pencil-icon");
		pencil.setAttribute('name', 'pencil-outline');
		let trash = createAnElement("ion-icon", "trash", "delete");
		trash.setAttribute('name', 'trash-outline');
		createAnElement("", pencil, "", innerDiv);
		createAnElement("", trash, "", innerDiv);
		createAnElement("", theInput, "", outerDiv);
		createAnElement("", theP, "", outerDiv);
		createAnElement("", innerDiv, "", outerDiv);
		undoneTodosDiv.appendChild(outerDiv);
		let todosText = document.querySelectorAll('.todos-text');
		stuffs();
		todosChecker();
		editFunction(todosText[index]);
	}

	setInterval(() =>{
		let everything = mainContent.innerHTML;
		let contentClass = mainContent.classList;
		localStorage.setItem('contentsClass', JSON.stringify(contentClass));		
		let previousContent = JSON.stringify(everything);
		localStorage.setItem('before', previousContent);
	}, 1000)
}

stuffs();