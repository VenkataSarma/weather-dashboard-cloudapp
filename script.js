document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '11b183759076eac39d6e7dd44c5d7471'; // Replace with your OpenWeatherMap API key

    document.getElementById('get-weather-btn').addEventListener('click', function() {
        const city = document.getElementById('location-input').value;
        if (city) {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`API request failed with status ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data); // Log the entire response for debugging

                    if (data.main && data.weather && data.wind) {
                        document.getElementById('weather-details').style.display = 'block';
                        document.getElementById('temperature').textContent = data.main.temp;
                        document.getElementById('high').textContent = data.main.temp_max;
                        document.getElementById('low').textContent = data.main.temp_min;
                        document.getElementById('humidity').textContent = data.main.humidity;
                        document.getElementById('wind').textContent = data.wind.speed;
                        document.getElementById('precipitation').textContent = data.rain ? data.rain['1h'] : 0;
                        document.getElementById('pressure').textContent = data.main.pressure;
                        document.getElementById('conditions').textContent = data.weather[0].description;
                    } else {
                        console.error('Unexpected API response format:', data);
                        alert('Error fetching weather data. Please check the console for details.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    alert('Error fetching weather data. Please try again later.');
                });
        } else {
            alert('Please enter a city name.');
        }
    });
});