const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');
const humidityDisplay = document.querySelector('#humidity');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-33.02&lon=-71.55&units=metric&appid=6d21db5e68422d5a30a4fbad7afe26a3';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
        const weatherBox = document.querySelector('#weather-box');
        if (weatherBox) {
            weatherBox.innerHTML = `<p>Weather data error</p>`;
        }
    }
}

function displayResults(data) {
    if (currentTemp) {
        currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;C`;
    }

    if (weatherIcon) {
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const desc = data.weather[0].description;
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', desc);

        if (captionDesc) {
            captionDesc.textContent = desc;
        }
    }

    if (humidityDisplay) {
        humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
    }
}

apiFetch();