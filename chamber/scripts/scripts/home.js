/* --- 1. CORE FUNCTIONALITY (Menu & Footer) --- */
// Update Footer Year and Last Modified
document.querySelector('#currentYear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Mobile Menu Toggle
const menuBtn = document.querySelector('#menu-toggle');
const nav = document.querySelector('#nav-list');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('show');
        menuBtn.textContent = nav.classList.contains('show') ? 'X' : '☰';
    });
}

/* --- 2. WEATHER API LOGIC --- */
// Coordinates for Nahualá, Guatemala
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
            // Populate current weather
            document.querySelector('#current-temp').innerHTML = `<strong>${Math.round(data.main.temp)}°F</strong>`;
            const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            const desc = data.weather[0].description;

            const weatherIcon = document.querySelector('#weather-icon');
            weatherIcon.setAttribute('src', iconSrc);
            weatherIcon.setAttribute('alt', desc);
            document.querySelector('#weather-desc').textContent = desc.toUpperCase();
        }
    } catch (error) {
        console.error("Weather Fetch Error:", error);
    }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            const forecastContainer = document.querySelector('#forecast-container');

            // Filter to get one forecast per day at midday (12:00:00)
            const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

            forecastContainer.innerHTML = ""; // Clear placeholder
            dailyData.forEach(day => {
                const date = new Date(day.dt * 1000);
                const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
                forecastContainer.innerHTML += `
                    <div class="forecast-day">
                        <span>${weekday}:</span> <strong>${Math.round(day.main.temp)}°F</strong>
                    </div>`;
            });
        }
    } catch (error) {
        console.error("Forecast Fetch Error:", error);
    }
}

/* --- 3. BUSINESS SPOTLIGHT LOGIC --- */
const membersUrl = 'data/members.json';

async function loadSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const members = await response.json();

        // Requirement: Only Gold (3) and Silver (2) members
        const eligible = members.filter(m => m.membership === 3 || m.membership === 2);

        // Requirement: Random selection (Shuffle array)
        const shuffled = eligible.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3); // Display 3 members

        const container = document.querySelector('#spotlight-container');
        container.innerHTML = ""; // Clear container

        selected.forEach(m => {
            const card = document.createElement('div');
            card.className = 'spotlight-card';
            card.innerHTML = `
                <h3>${m.name}</h3>
                <img src="images/${m.image}" alt="${m.name} logo" loading="lazy">
                <p><strong>Phone:</strong> ${m.phone}</p>
                <p><strong>Address:</strong> ${m.address}</p>
                <p><a href="${m.website}" target="_blank">Visit Website</a></p>
                <p class="membership-level">${m.membership === 3 ? 'Gold Member' : 'Silver Member'}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Spotlight Fetch Error:", error);
    }
}

// Execute all functions on page load
fetchWeather();
fetchForecast();
loadSpotlights();