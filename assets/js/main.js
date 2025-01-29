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

document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevents page reload

    let form = event.target;
    let formData = new FormData(form);

    try {
        let response = await fetch("https://getform.io/f/bdrredvb", {
            method: "POST",
            body: formData
        });

        const formStatus = document.getElementById("form-status");

        if (response.ok) {
            // Show success message with a smooth fade-in effect
            formStatus.style.display = "block";
            formStatus.style.opacity = 1;

            // Hide the success message after 3 seconds with a smooth fade-out effect
            setTimeout(() => {
                formStatus.style.opacity = 0;
                setTimeout(() => {
                    formStatus.style.display = "none";
                }, 500); // Wait for fade-out transition to complete
            }, 3000); // 3 seconds

            form.reset(); // Clear form
        } else {
            alert("There was an error submitting the form.");
        }
    } catch (error) {
        alert("Something went wrong. Please try again.");
    }
});
