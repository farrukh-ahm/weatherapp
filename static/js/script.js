import conditionCodes from "../../conditions.js"

let loc = document.getElementById("location")
let time = document.getElementById("time")
let temp = document.getElementById("temp")
let condition = document.getElementById("condition")
let feels = document.getElementById("feels")
let wind = document.getElementById("wind")
let maxMinContainer = document.querySelector("#max-min")
let max = document.getElementById("max")
let min = document.getElementById("min")
let loading = document.getElementById("loader")


document.addEventListener("DOMContentLoaded", ()=>{

    initiatePosition();

    setInterval(getTime, 100);

    console.log(data)

})


// -------- Get the Latitude and Longitude --------------
const initiatePosition = () => {

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition, errorCode)
    }

    else{
        console.log("Not supported")
    }    

}


// ----------- Get Data and Initiate Layout --------------
const getPosition = (location) =>{
    const lat = location.coords.latitude;
    const long = location.coords.longitude;

    // console.log(lat, long)
    // getWeather(lat, long)
    getCurrentMaxMin(lat, long)
}


// ------------- Get Data of Current Condition -------------
// const getWeather = async (lat, long) =>{

//     const response = await fetch (`https://api.weatherapi.com/v1/current.json?key=${keys.KEY}&q=${lat},${long}&aqi=no`)

//     const data = await response.json()

//     if(response.ok){

//         displayWeather(data)
//         console.log(data)
//     }

//     else{
//         console.log(error)
//     }

// }


// ---------------- Get Forecast Data ----------------
const getCurrentMaxMin = async (lat, long) => {

    const response = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${long}&days=3&aqi=no&alerts=no`)

    const data = await response.json()

    if(response.ok){
        console.log(data)
        console.log(data.forecast.forecastday[0].day.maxtemp_c)
        console.log(data.forecast.forecastday[0].day.mintemp_c)
        displayCurrentMaxMin(data)
    }

    else{
        console.log("forecast error")
    }

}


// ---------- Display Current Weather -----------
// const displayWeather = (data) =>{

//     conditionBackground(data.current.condition.code)

//     loc.innerText = `${data.location.name}, ${data.location.country}`

//     temp.innerHTML = `${data.current.temp_c}<sup>o</sup>C`

//     condition.innerText = `${data.current.condition.text}`

//     feels.innerHTML = `Feels Like: ${data.current.feelslike_c}<sup>o</sup>C`

//     wind.innerText = `Wind: ${data.current.wind_kph}kmph`

// }


// ------------- Display Current and Max Min ---------------------
const displayCurrentMaxMin = (data) => {

    conditionBackground(data.current.condition.code)

    loading.style.display = "none"

    loc.innerText = `${data.location.name}, ${data.location.country}`

    temp.innerHTML = `${data.current.temp_c} <sup>o</sup> C`

    condition.innerText = `${data.current.condition.text}`

    feels.style.display = "initial"
    feels.insertAdjacentHTML("beforeend", `${data.current.feelslike_c} <sup>o</sup> C`)

    wind.style.display = "initial"
    wind.insertAdjacentHTML("beforeend", `${data.current.wind_kph} kmph`)
    // wind.innerText = `Wind: ${data.current.wind_kph}kmph`

    maxMinContainer.style.display = "flex"
    max.style.display = "initial"
    max.innerHTML = `Max: ${data.forecast.forecastday[0].day.maxtemp_c} <sup>o</sup> C`

    min.style.display = "initial"
    min.innerHTML = `Min: ${data.forecast.forecastday[0].day.mintemp_c} <sup>o</sup> C`

}




// ---------- Time Display Handler ------------------
const getTime = () =>{
    let currentTime = new Date()
    time.innerText = currentTime.toLocaleTimeString();
}


// -------------- Background Handler According to the condition ----------------
function conditionBackground(code){

    for(let i of conditionCodes){
        if(Object.values(i)[0].includes(code)){
            console.log(Object.keys(i)[0])
            document.querySelector("body").style.backgroundImage = `url(../../assets/${Object.keys(i)[0]}.jpg)`
        }
    }

    // document.querySelector("body").style.backgroundImage = `url(/assets/thunder.jpg)`
    // for(let i of conditionCodes){
    //     console.log(Object.values(i)[0])
    //     }
    // }

}


function errorCode(error){
    switch(error.code){
        case error.PERMISSION_DENIED:
            alert("User denied the request for GeoLocation");
            break
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable");
            break
        case error.TIMEOUT:
            alert("The request timed out");
            break
        case error.UNKNOWN_ERROR:
            alert("An unknown error occured");
            break
    }
}
