let loc = document.getElementById("location")
let time = document.getElementById("time")
let temp = document.getElementById("temp")
let condition = document.getElementById("condition")
let feels = document.getElementById("feels")
let wind = document.getElementById("wind")
let max = document.getElementById("max")
let min = document.getElementById("min")


document.addEventListener("DOMContentLoaded", ()=>{

    initiatePosition();

    setInterval(getTime, 100);

})


const initiatePosition = () => {

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition, errorCode)
    }

    else{
        console.log("Not supported")
    }    

}

const getPosition = (location) =>{
    const lat = location.coords.latitude;
    const long = location.coords.longitude;

    console.log(lat, long)
    getWeather(lat, long)
}


const getWeather = async (lat, long) =>{

    const response = await fetch (`https://api.weatherapi.com/v1/current.json?key=${keys.KEY}&q=${lat},${long}&aqi=no`)

    const data = await response.json()

    if(response.ok){

        displayWeather(data)
        console.log(data)
    }

    else{
        console.log(error)
    }

}


const displayWeather = (data) =>{

    loc.innerText = `${data.location.name}, ${data.location.country}`

    temp.innerHTML = `${data.current.temp_c}<sup>o</sup>C`

    condition.innerText = `${data.current.condition.text}`

    feels.innerHTML = `Feels Like: ${data.current.feelslike_c}<sup>o</sup>C`

    wind.innerText = `Wind: ${data.current.wind_kph}kmph`

    // max.innerHTML = `${data.}`

}


const getTime = () =>{
    let currentTime = new Date()
    time.innerText = currentTime.toLocaleTimeString();
}

const errorCode = (error) => {
    console.log(error)
}
