const SLIDER = document.querySelector('#slider');
const SLIDER_CIRCLE = document.querySelector('#slider-circle');
const middleText = document.querySelector('#middle-text');
const deleteDone = document.querySelectorAll('.done-delete');
const deleteUndone = document.querySelectorAll('.undone-delete');
const undoneTodos = document.querySelectorAll('.undone-todos');
const doneTodos = document.querySelectorAll('.done-todos');
const undoneTodosDiv = document.querySelector('#undone-todos-div');
const doneTodosDiv = document.querySelector('#done-todos-div');

if (!localStorage.new) {
	localStorage.setItem('new', 1);
	middleText.textContent = `Welcome, click the button at the button-right corner to start`;
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

function deleteAction (theNode) {
	// console.log(theNode.parentNode)
	setTimeout(() => theNode.parentNode.removeChild(theNode), 600);
}

deleteDone.forEach((element, index) =>{
	deleteDone[index].onclick  = () => deleteAction(doneTodos[index]);
});

// let themeChecker = () =>{
//   if (!(localStorage.getItem('theme'))) {
//     if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//       localStorage.setItem('theme', 'dark');
//       document.documentElement.classList.add('dark')
//     }

//     localStorage.setItem('theme', 'light');
//     document.documentElement.classList.remove('dark')
//   }

//   document.documentElement.classList.add(localStorage.getItem('theme'));
// }

// themeChecker();