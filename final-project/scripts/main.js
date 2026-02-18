// --- MENU TOGGLE ---
const hamburger = document.querySelector('#hamburger');
const nav = document.querySelector('#primary-nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('open');
        hamburger.classList.toggle('open');

        if (nav.classList.contains('open')) {
            hamburger.textContent = '✕';
        } else {
            hamburger.textContent = '☰';
        }
    });
}

// --- WAYFINDING ---
const navLinks = document.querySelectorAll('#primary-nav a');
const currentPath = window.location.pathname;

navLinks.forEach(link => {
    link.classList.remove('active');

    if (currentPath.endsWith(link.getAttribute('href')) ||
        (currentPath.endsWith('/') && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
    }
});

// --- VISIT COUNTER ---
const visitMsg = document.querySelector('#last-visit');
if (visitMsg) {
    const last = localStorage.getItem('last-visit');
    const now = Date.now();
    if (!last) {
        visitMsg.textContent = "Welcome! This is your first visit.";
    } else {
        const days = Math.floor((now - last) / 86400000);
        visitMsg.textContent = days < 1 ? "Welcome back! Glad to see you again today." : `Welcome back! It has been ${days} days since your last visit.`;
    }
    localStorage.setItem('last-visit', now);
}

// --- FOOTER DATES ---
const yearSpan = document.querySelector("#currentYear");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const lastMod = document.querySelector("#lastModified");
if (lastMod) lastMod.innerHTML = `Last Modified: ${document.lastModified}`;