"use strict";

const wrapper = document.querySelector(".weather-items"),
      search = document.querySelector(".search-box button"),
      weatherBox = document.querySelector(".weather-box"),
      weatherDetails = document.querySelector(".weather-details"),
      error404 = document.querySelector(".not-found");
      
search.addEventListener("click", e => {
    const APIkey = "17f08cc1c3d15468f3c21924c7cdf628";
    const city = document.querySelector(".search-box input").value;

    if (city === "") {
        return;
    }

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
    )
        .then(response => response.json())
        .then(json => {
            if (json.cod === "404") {
                wrapper.style.height = "404px";
                weatherBox.style.display = "none";
                weatherDetails.style.display = "none";
                error404.style.display = "block";
                error404.classList.add("fadeIn");
                return;
            }

            error404.style.display = "none";
            error404.classList.remove("fadeIn");

            const image = document.querySelector(".weather-box img"),
                  temperature = document.querySelector(".weather-box .temperature"),
                  description = document.querySelector(".weather-box .description"),
                  humidity = document.querySelector(".weather-details .humidity span"),
                  wind = document.querySelector(".weather-details .wind span");
                  
            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "img/clear.png";
                    break;
                case "Rain":
                    image.src = "img/rain.png";
                    break;
                case "Clouds":
                    image.src = "img/clouds.png";
                    break;
                case "Snow":
                    image.src = "img/snow.png";
                    break;
                case "Haze":
                    image.src = "img/haze.png";
                    break;
                default:
                    image.src = "";
            }

            temperature.innerHTML = `${json.main.temp}<span>°С</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = "";
            weatherDetails.style.display = "";
            weatherBox.classList.add("fadeIn");
            weatherDetails.classList.add("fadeIn");
            wrapper.style.height = "590px";



        })

})

