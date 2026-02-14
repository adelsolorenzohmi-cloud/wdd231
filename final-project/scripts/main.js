// --- MENU TOGGLE ---
const hamburger = document.querySelector('#hamburger');
const nav = document.querySelector('#primary-nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('open');
        hamburger.classList.toggle('open');

        // Logical check to switch between Hamburger and 'X'
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

// --- WEATHER FETCHING (Home Page) ---
const weatherBox = document.querySelector('#weather-box');
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const humidityDisplay = document.querySelector('#humidity');

if (weatherBox && currentTemp) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Vina%20del%20Mar,cl&units=metric&appid=73d8de1ab116352097aee2f56a2da362';
    async function fetchWeather() {
        try {
            const resp = await fetch(url);
            if (!resp.ok) throw new Error("Network response was not ok");
            const data = await resp.json();

            currentTemp.textContent = `${Math.round(data.main.temp)}°C`;
            humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;

            // Setting icon
            const iconCode = data.weather[0].icon;
            weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`);
            weatherIcon.setAttribute('alt', data.weather[0].description);

            const caption = weatherBox.querySelector('figcaption');
            if (caption) caption.textContent = data.weather[0].description;

        } catch (e) {
            console.error(e);
            weatherBox.innerHTML = "<p>Weather data currently unavailable</p>";
        }
    }
    fetchWeather();
}

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