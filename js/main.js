const menuBtn = document.querySelector('.btn-menu');
const menuMobile = document.querySelector('.menu-list');

menuBtn.addEventListener(('click'), ()=>{
    menuMobile.classList.toggle('menu-open')
});