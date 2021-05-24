// open weather map key & url
const weatherApi = {
    key: "41c1c622f297ca719e4649cefd34e051",
    url: "https://api.openweathermap.org/data/2.5/weather"
}

// include html file
const searchInputBox = document.getElementById('input-box');

// Event Listener Function
searchInputBox.addEventListener('keypress', (event)=>{
    if( event.keyCode == 13 ){
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    document.querySelector('.weather-body').style.display = "block";
    }
});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.url}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather =>{
            return weather.json();
    }).then(showWeatherReport);
};

// Show weather report
function showWeatherReport(weather) {
    //  console.log(weather);
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temprature = document.getElementById('temp');
    temprature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let maxTemp = document.getElementById('max');
    maxTemp.innerHTML = `${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let minTemp = document.getElementById('min');
    minTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)`;

    let weatherType = document.getElementById('weather');      
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "linear-gradient(hsl(50, 27%, 96%),rgb(112, 219, 233))";
    }

    else if(weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = "linear-gradient(hsl(222, 81%, 86%),rgb(12, 112, 29))";
    }

    else if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundImage= "linear-gradient(hsl(222, 81%, 86%),rgb(5, 25, 71))";
    }

    else if(weatherType.textContent == 'Thunderstrom'){
        document.body.style.backgroundImage= "linear-gradient(hsl(187, 63%, 75%),rgb(135, 51, 168))";
    }

    else if(weatherType.textContent == 'Shnow'){
        document.body.style. backgroundImage= "linear-gradient(hsl(50, 87%, 79%),rgb(240, 122, 54))";
    }

    else if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage= "linear-gradient(hsl(187, 79%, 81%),rgb(22, 81, 168))";
    }
}

// Date manage
function dateManage(todayDate){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] ;
    let months = ["January", "Fabuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let year = todayDate.getFullYear();
    let month = months[todayDate.getMonth()];
    let date = todayDate.getDate();
    let day = days[todayDate.getDay()];
    
    return `${date} ${month} (${day}) ${year}`;
}