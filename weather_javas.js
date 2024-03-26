function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '138b36873382bc891b1d3565ffa666cd'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const weatherInfo = document.getElementById('weatherInfo');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorInfo = document.getElementById('errorInfo');

    weatherInfo.innerHTML = '';
    errorInfo.innerHTML = '';
    loadingIndicator.style.display = 'block';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const { name, sys, main, weather, wind, clouds, rain } = data;
            const temperature = main.temp;
            const description = weather[0].description;
            const humidity = main.humidity;
            const windSpeed = wind.speed;
            const precipitation = rain ? (rain['1h'] ? rain['1h'] : 0) : 0; // Precipitation in the last 1 hour, if available
            const pressure = main.pressure;

            weatherInfo.innerHTML = `
                <h2>${name}, ${sys.country}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
                <p>Precipitation: ${precipitation} mm</p>
                <p>Pressure: ${pressure} hPa</p>
            `;
            loadingIndicator.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            errorInfo.innerHTML = 'Error fetching weather data. Please try again.';
            loadingIndicator.style.display = 'none';
        });
}



const cityInput = document.getElementById('cityInput');
const cityList = document.getElementById('cityList');

cityInput.addEventListener('input', function () {
    const inputText = this.value.trim().toLowerCase();
    if (inputText.length === 0) {
        cityList.innerHTML = '';
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${inputText}&type=like&mode=json&cnt=5&appid=138b36873382bc891b1d3565ffa666cd`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const cities = data.list;
            const citySuggestions = cities.map(city => city.name);
            displayCitySuggestions(citySuggestions);
        })
        .catch(error => {
            console.error('Error fetching city suggestions:', error);
            cityList.innerHTML = '';
        });
});

function displayCitySuggestions(suggestions) {
    cityList.innerHTML = '';
    suggestions.forEach(suggestion => {
        const listItem = document.createElement('div');
        listItem.classList.add('city-list-item');
        listItem.textContent = suggestion;
        listItem.addEventListener('click', function () {
            cityInput.value = this.textContent;
            cityList.innerHTML = '';
        });
        cityList.appendChild(listItem);
    });
}
