document.querySelector('#currentYear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

const menuBtn = document.querySelector('#menu-toggle');
const nav = document.querySelector('#nav-list');
if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('show');
        menuBtn.textContent = nav.classList.contains('show') ? 'X' : '☰';
    });
}

const lat = 14.84;
const lon = -91.31;
const apiKey = '6d21db5e68422d5a30a4fbad7afe26a3';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            document.querySelector('#current-temp').innerHTML = `<strong>${Math.round(data.main.temp)}°F</strong>`;
            document.querySelector('#weather-desc').textContent = data.weather[0].description.toUpperCase();
            document.querySelector('#humidity').textContent = data.main.humidity;

            const weatherIcon = document.querySelector('#weather-icon');
            weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            weatherIcon.setAttribute('alt', data.weather[0].description);
        }
    } catch (error) { console.error(error); }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            const forecastContainer = document.querySelector('#forecast-container');
            const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

            forecastContainer.innerHTML = "";
            dailyData.forEach(day => {
                const weekday = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
                forecastContainer.innerHTML += `<div class="forecast-day">${weekday}: <strong>${Math.round(day.main.temp)}°F</strong></div>`;
            });
        }
    } catch (error) { console.error(error); }
}

const membersUrl = 'data/members.json';
async function loadSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const members = await response.json();
        const eligible = members.filter(m => m.membership === 3 || m.membership === 2);
        const selected = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);

        const container = document.querySelector('#spotlight-container');
        if (container) {
            container.innerHTML = "";
            selected.forEach(m => {
                const card = document.createElement('div');
                card.className = 'spotlight-card';
                card.innerHTML = `
                    <h3>${m.name}</h3>
                    <img src="images/${m.image}" alt="${m.name} logo" loading="lazy">
                    <p><strong>Phone:</strong> ${m.phone}</p>
                    <p><strong>Address:</strong> ${m.address}</p>
                    <p><a href="${m.website}" target="_blank">Visit Website</a></p>
                    <p class="membership-level">${m.membership === 3 ? 'Gold' : 'Silver'} Member</p>`;
                container.appendChild(card);
            });
        }
    } catch (error) { console.error(error); }
}

fetchWeather();
fetchForecast();
loadSpotlights();