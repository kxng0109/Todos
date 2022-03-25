const main = document.querySelector('#main');
const mainContent = document.querySelector('.maincontent');
const addBtn = document.querySelector('#add');
const SLIDER = document.querySelector('#slider');
const SLIDER_CIRCLE = document.querySelector('#slider-circle');
const middleText = document.querySelector('#middle-text');
const deleteBtn = document.querySelectorAll('.delete');
const todos = document.querySelectorAll('.todos');
const undoneTodos = document.querySelectorAll('.undone-todos');
const doneTodos = document.querySelectorAll('.done-todos');
const undoneTodosDiv = document.querySelector('#undone-todos-div');
const doneTodosDiv = document.querySelector('#done-todos-div');
const pencilIcon = document.querySelectorAll('.pencil-icon');
const editPopup = document.querySelector('#editpopup');
const todosText = document.querySelectorAll('.todos-text');
const editPopupArea = document.querySelector('#editpopuparea');
const doneEditing = document.querySelector('#done-editing-btn');
const checkBoxes = document.querySelectorAll('.check-box');

if (!localStorage.new) {
	localStorage.setItem('new', 1);
	// middleText.textContent = `Welcome, click the button at the button-right corner to start`;
}


if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
	document.documentElement.classList.add('dark');
} else {
	document.documentElement.classList.remove('dark');
}

SLIDER.onclick = () =>{
	if (document.documentElement.classList.contains('dark')) {
	 	localStorage.setItem('theme', 'light');
	 	return document.documentElement.classList.remove('dark');
  }

	document.documentElement.classList.add('dark');
	localStorage.setItem('theme', 'dark');
}

pencilIcon.forEach((element, index) =>{
	pencilIcon[index].onclick = () =>{
		editPopup.style.display = 'block';
		console.log(document.body)
		main.style.filter = 'brightness(50%)';
		addBtn.style.filter = 'brightness(50%)';
		editPopupArea.textContent = todosText[index].textContent;
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
			todosText[index].textContent = editPopupArea.textContent;
			editPopup.style.display = 'none';
			main.style.filter = 'brightness(100%)';
			addBtn.style.filter = 'brightness(100%)';
		}
	}
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
				setTimeout(() => todos[index].style.animation = '' , 200);
			}, 200);
		} else {
			todos[index].style.animation = 'goOut 0.2s linear forwards';
			todos[index].classList.remove('done-todos');
			todos[index].classList.add('undone-todos');
			setTimeout(() =>{
				todos[index].style.animation = 'goOut 0.2s linear reverse forwards';
				undoneTodosDiv.appendChild(todos[index]);
				setTimeout(() => todos[index].style.animation = '' , 200);
			}, 200);
		}
	}
})

deleteBtn.forEach((element, index) =>{
	deleteBtn[index].onclick  = () => {
		todos[index].style.animation = 'goOut 0.5s linear forwards';
		setTimeout(() => todos[index].remove(), 500);
	};
});


addBtn.onclick = () =>{

}
// function checker(){

// }