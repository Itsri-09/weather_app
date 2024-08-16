let api_Key = "06ef4d7d8cefa609ca31a51242566a18";
let api_Url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

let sel = document.querySelector('.select input');
let sel_Btn = document.querySelector('.select button i');
let weather = document.querySelector('.weather_icon');

async function fetchCity(cloud) {
    if (cloud === '') {
        document.querySelector('.an').style.display = 'block';
        document.querySelector('.not').style.display = 'none';
        document.querySelector('.err').style.display = 'none';
        return;
    }
    
    let open = await fetch(api_Url + cloud + `&appid=${api_Key}`);
    if (open.status == 404) {
        document.querySelector('.err').style.display = 'block';
        document.querySelector('.not').style.display = 'none';
        document.querySelector('.an').style.display = 'none';
    } else {
        let close = await open.json();
        console.log(close.main.temp);
        document.querySelector('.city').innerHTML = close.name;
        document.querySelector('.temp').innerHTML = Math.round(close.main.temp);
        document.querySelector('.humidity').innerHTML = close.main.humidity;
        document.querySelector('.wind-speed').innerHTML = close.wind.speed;
        document.querySelector('.not').style.display = 'block';
        document.querySelector('.err').style.display = 'none';
        document.querySelector('.an').style.display = 'none';

        if (close.weather[0].main == 'Clouds') {
            weather.src = "src/clouds.png";
        } else if (close.weather[0].main == 'Clear') {
            weather.src = "src/clear.png";
        } else if (close.weather[0].main == 'Drizzle') {
            weather.src = "src/drizzle.png";
        } else if (close.weather[0].main == 'Mist') {
            weather.src = "src/mist.png";
        } else if (close.weather[0].main == 'Rain') {
            weather.src = "src/rain.png";
        } else if (close.weather[0].main == 'Snow') {
            weather.src = "src/snow.png";
        }
        console.log(close);
    }
}

sel_Btn.addEventListener('click', () => {
    fetchCity(sel.value);
});
