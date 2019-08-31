const API_KEY = "74d4df040bc6ad6998b0e1c2183ac963";
const COORDS = `coords`
const weather = document.querySelector(".js-weather");

function getWeather(lat , lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        const temperture = json.main.temp;
        const place = json.name;
        const join = `${temperture} @ ${place}`;
        console.log(join);
        weather.innerText = join;
      });
    }
    
function saveCoords(cordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(cordsObj));
}
function handleGeoSuccess(position) {

    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't find your location");
}

function askForCords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    if (loadedCords === null) {
        askForCords();
    } else {
        const parsedcoords = JSON.parse(loadedCords);
        getWeather(parsedcoords.latitude,parsedcoords.longitude);
    }
}


function init() {
    loadCoords();
}

init();