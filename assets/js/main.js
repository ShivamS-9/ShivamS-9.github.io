// const { Cursor } = require("mongoose")

/*===== MENU SHOW Y HIDDEN =====*/
const navMenu = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('nav-toggle'),
    closeMenu = document.getElementById('nav-close');

// SHOW MENU
if (toggleMenu) {
    toggleMenu.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}

// HIDE MENU
if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
}

// REMOVE MENU ON LINK CLICK
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

// SCROLL SECTIONS ACTIVE LINK
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', scrollActive);

function scrollActive() {
    const scrollY = window.scrollY; // Use `scrollY` instead of `pageYOffset`

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        const navItem = document.querySelector('.nav__menu a[href*="' + sectionId + '"]');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItem?.classList.add('active');
        } else {
            navItem?.classList.remove('active');
        }
    });
}