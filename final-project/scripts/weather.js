const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const humidityDisplay = document.querySelector('#humidity');

// URL updated for Viña del Mar, Chile
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=6d21db5e68422d5a30a4fbad7afe26a3';

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
        document.querySelector('#weather-box').innerHTML = `<p>Weather data error</p>`;
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;

    // Adding humidity logic
    if (humidityDisplay) {
        humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
    }
}

apiFetch();