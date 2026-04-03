/* ===== MOBILE NAV ===== */
const navToggle  = document.getElementById('navToggle');
const navClose   = document.getElementById('navClose');
const mobileNav  = document.getElementById('mobileNav');
const navOverlay = document.getElementById('navOverlay');

function openNav() {
    mobileNav.classList.add('open');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeNav() {
    mobileNav.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (navToggle)  navToggle.addEventListener('click', openNav);
if (navClose)   navClose.addEventListener('click', closeNav);
if (navOverlay) navOverlay.addEventListener('click', closeNav);

// Close on mobile nav link click
document.querySelectorAll('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', closeNav);
});

/* ===== SCROLL PROGRESS BAR ===== */
const progressBar = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + '%';
});

/* ===== ACTIVE NAV LINK (sidebar) ===== */
const sections    = document.querySelectorAll('section[id]');
const sidebarLinks = document.querySelectorAll('.sidebar__link');

function updateActiveLink() {
    const scrollY = window.scrollY;
    sections.forEach(section => {
        const top    = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        const link   = document.querySelector(`.sidebar__link[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}
window.addEventListener('scroll', updateActiveLink);

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal, .exp-card, .work-card, .info-card, .skills__group').forEach(el => {
    revealObserver.observe(el);
});

/* ===== SKILL BARS (animate when in view) ===== */
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-item__bar').forEach(bar => {
                const w = bar.getAttribute('data-width');
                bar.style.width = w + '%';
            });
            skillBarObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skills__group').forEach(group => {
    skillBarObserver.observe(group);
});

/* ===== STAGGER REVEAL FOR GRIDS ===== */
document.querySelectorAll('.exp__grid .exp-card, .works__grid .work-card').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.07) + 's';
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = this.querySelector('[type="submit"]');
        const status = document.getElementById('form-status');

        btn.disabled = true;
        btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending…';

        try {
            const response = await fetch('https://getform.io/f/bdrredvb', {
                method: 'POST',
                body: new FormData(this)
            });

            if (response.ok) {
                status.style.display = 'block';
                status.style.opacity = '1';
                this.reset();

                setTimeout(() => {
                    status.style.opacity = '0';
                    setTimeout(() => { status.style.display = 'none'; }, 500);
                }, 3500);
            } else {
                alert('There was an error submitting the form. Please try again.');
            }
        } catch {
            alert('Something went wrong. Please try again.');
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="bx bx-send"></i> Send Message';
        }
    });
}