const SLIDER = document.querySelector('#slider');
const SLIDER_CIRCLE = document.querySelector('#slider-circle');


if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

SLIDER.onclick = () =>{
  if (document.documentElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'light');
    console.log(localStorage.getItem('theme'));
    return document.documentElement.classList.remove('dark');
  }

  document.documentElement.classList.add('dark');
  localStorage.setItem('theme', 'dark');
  console.log(localStorage.getItem('theme'));
}

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