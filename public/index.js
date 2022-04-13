'use strict'

const main = document.querySelector('#main');
const mainContent = document.querySelector('.maincontent');
const middleText = document.querySelector('#middle-text');
const middleTextDiv = document.querySelector('.middle-text-div');
const instructionsOuterDiv = document.querySelector('.instructionspopup');
const theInstructions = document.querySelectorAll('.instructions-text');
const closeInstructions = document.querySelector('.close-instructions');
const helpBtn = document.querySelector('.help-button');

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
	document.documentElement.classList.add('dark');
} else {
	document.documentElement.classList.remove('dark');
}

let stuffs = () =>{
	const addBtn = document.querySelector('#add');
	const SLIDER = document.querySelector('#slider');
	const SLIDER_CIRCLE = document.querySelector('#slider-circle');
	let undoneTodosDiv = document.querySelector('#undone-todos-div');
	let doneTodosDiv = document.querySelector('#done-todos-div');
	const editTodosPopupArea = document.querySelector('#editpopuparea');
	const doneEditing = document.querySelector('#done-editing-btn');
	const editTodosPopup = document.querySelector('#editpopup');
	const pendingTasks = document.querySelector('#pending');
	const completedTasks = document.querySelector('#completed');
	let todos = document.querySelectorAll('.todos');
	let undoneTodos = document.querySelectorAll('.undone-todos');
	let doneTodos = document.querySelectorAll('.done-todos');
	let pencilIcon = document.querySelectorAll('.pencil-icon');
	let todosText = document.querySelectorAll('.todos-text');
	let checkBoxes = document.querySelectorAll('.check-box');
	let deleteBtn = document.querySelectorAll('.delete');
	const header = document.querySelector('#header');
	let theUsersTarget;

	window.onload = () => {
		if (!localStorage.new) {
			localStorage.setItem('new', 1);
			middleText.textContent = `Welcome, click the button at the buttom-right corner to start`;
			middleText.style.display = 'block';
			todosChecker('yes');
			showOrHideInstructions('show');
		}else{
			undoneTodosDiv.innerHTML = JSON.parse(localStorage.getItem('undoneTodosDivBackupJSON'));
			doneTodosDiv.innerHTML = JSON.parse(localStorage.getItem('doneTodosDivBackupJSON'));
			stuffs();
			todosChecker();
			showOrHideInstructions('hide');
		}
	}

	const setHeightOfContentAreaAndFindTarget = () => {	
		document.documentElement.onclick = e => {return theUsersTarget = e.target};
		let mainHeight = parseInt(window.getComputedStyle(main, null).getPropertyValue("height"));
		let headerHeight = window.getComputedStyle(header, null).getPropertyValue("height");
		const difference = document.documentElement.clientHeight - parseInt(`${headerHeight}`);
		mainHeight <= `${document.documentElement.clientHeight}` ? main.style.height = `${difference}px`
		: main.style.height = 'auto';
	}

	setHeightOfContentAreaAndFindTarget();
	document.documentElement.addEventListener('click', setHeightOfContentAreaAndFindTarget());



	if (instructionsOuterDiv.style.display === 'block' && theUsersTarget !== instructionsOuterDiv && theUsersTarget !== undefined) {showOrHideInstructions('hide')}
	const showOrHideInstructions = value =>{
		switch (true) {
			case value === 'hide' || instructionsOuterDiv.style.display === 'block':
				instructionsOuterDiv.style.display = 'none';
				main.style.filter = 'brightness(100%)';
				addBtn.style.filter = 'brightness(100%)';
				addBtn.style.pointerEvents = 'auto';
				helpBtn.style.pointerEvents = 'auto';
			break;
			default:
				instructionsOuterDiv.style.display = 'block';
				main.style.filter = 'brightness(50%)';
				addBtn.style.filter = 'brightness(50%)';
				addBtn.style.pointerEvents = 'none';
				helpBtn.style.pointerEvents = 'none';
			break;
		}
	}
	
	helpBtn.onclick = () => showOrHideInstructions('show');
	closeInstructions.onclick = () => showOrHideInstructions('hide');

	let todosChecker = (areyounew) =>{
		middleText.style.display = 'none';
		middleTextDiv.style.display = 'none';
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
				if (areyounew !== 'yes') {middleText.textContent = `You're all caught up! 👍🏼`};
				middleText.style.display = 'block';
				middleTextDiv.style.display = 'flex';
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

	let editTodos = aNode =>{
		editTodosPopup.style.display = 'block';
		main.style.filter = 'brightness(50%)';
		addBtn.style.filter = 'brightness(50%)';
		editTodosPopupArea.textContent = aNode.textContent;
		editTodosPopupArea.style.border = 'none';
		mainContent.style.pointerEvents = 'none';
		addBtn.style.pointerEvents = 'none';

		main.onmousedown = () => {
			editTodosPopup.style.display = 'none';
			main.style.filter = 'brightness(100%)';
			addBtn.style.filter = 'brightness(100%)';
			mainContent.style.pointerEvents = 'auto';
			addBtn.style.pointerEvents = 'auto';
			if (aNode.textContent == '' || aNode.textContent.trim() == '') {
				aNode.parentNode.parentNode.lastChild.remove(); 
				todosChecker();
			}
		}

		doneEditing.onclick = () =>{
			if (editTodosPopupArea.textContent == '' || editTodosPopupArea.textContent.trim() == '') {return editTodosPopupArea.style.border = '1px solid red'}
			aNode.textContent = editTodosPopupArea.textContent;
			editTodosPopup.style.display = 'none';
			main.style.filter = 'brightness(100%)';
			addBtn.style.filter = 'brightness(100%)';
			mainContent.style.pointerEvents = 'auto';
			addBtn.style.pointerEvents = 'auto';
		}
	};

	const reduceTodosInfo = () =>{
		todosText.forEach((element, index) =>{
			if (theUsersTarget !== todosText[index] || todosText[index].style.whiteSpace === 'normal') {
				todosText[index].style.whiteSpace = 'nowrap';
				todosText[index].style.overflow = 'hidden';
			}else{
				todosText[index].style.whiteSpace = 'normal';
				todosText[index].style.overflowY = 'visible';
			}
		});
	};

	reduceTodosInfo();
	window.onclick = () => {
		reduceTodosInfo(); 
	};

	pencilIcon.forEach((element, index) =>{
		pencilIcon[index].onclick = () => editTodos(todosText[index]);
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
					setTimeout(() => todosChecker(), 100);
					setTimeout(() => {
						todos[index].style.animation = '';
					} , 200);
				}, 200);
			} else {
				todos[index].style.animation = 'goOut 0.2s linear forwards';
				todos[index].classList.remove('done-todos');
				todos[index].classList.add('undone-todos');
				setTimeout(() =>{
					todos[index].style.animation = 'goOut 0.2s linear reverse forwards';
					undoneTodosDiv.appendChild(todos[index]);
					setTimeout(() => todosChecker(), 100);
					setTimeout(() => {
						todos[index].style.animation = '';
					} , 200);
				}, 200);
			}
		}
	});

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
		main.style.display = 'block';
		let createAnElement = (htmlElement, varName, theClassName, parentName) =>{
			switch (true) {
				case htmlElement !== "":
					varName = document.createElement(htmlElement);
					varName.classList.add(theClassName);
					return varName;
				break;

				case parentName !== undefined:
					parentName.appendChild(varName);
				break;

				case theClassName !== "" && htmlElement == "":
					varName.classList.add(theClassName);
				break;
			}
		}

		//I tried editing createAnElement in order to make what's below shorter, but some errors occured and so I didn't bother again
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
		let todosText = document.querySelectorAll('.todos-text');//had to re-assign it in order to update the variable, i don't know why i used let
		stuffs();
		todosChecker();
		editTodos(todosText[index]);
	};

	setInterval(() =>{
		let undoneTodosDivBackup = undoneTodosDiv.innerHTML;
		let doneTodosDivBackup = doneTodosDiv.innerHTML;
		localStorage.setItem('undoneTodosDivBackupJSON', JSON.stringify(undoneTodosDivBackup));		
		localStorage.setItem('doneTodosDivBackupJSON', JSON.stringify(doneTodosDivBackup));
	}, 1000);
}

stuffs();