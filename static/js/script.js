import {KEY} from "../../secrets.js"


document.addEventListener("DOMContentLoaded", ()=>{

    initiatePosition()

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
    return (lat, long)
}

const errorCode = (error) => {
    console.log(error)
}
