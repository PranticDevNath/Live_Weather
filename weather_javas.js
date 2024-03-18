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
            const { name, sys, main, weather } = data;
            const temperature = main.temp;
            const description = weather[0].description;

            weatherInfo.innerHTML = `
                <h2>${name}, ${sys.country}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
            `;
            loadingIndicator.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            errorInfo.innerHTML = 'Error fetching weather data. Please try again.';
            loadingIndicator.style.display = 'none';
        });
}
