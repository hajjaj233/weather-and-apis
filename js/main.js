

const country = document.getElementById("location")
country.addEventListener("input",function(event){
    getdata(event.target.value)
})




async function getdata(city) {
    if (city.length>3){
        let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=3&key=60405fc0f3764b9e868213248242312`)
        let finaldata = await result.json()
        console.log(finaldata)
        display(finaldata)
    }
   
}




function display(finaldata){
    let todaydate = new Date(finaldata.current.last_updated)

    document.getElementById("todayday").innerHTML = todaydate.toLocaleString('en-us',{weekday:'long'})
    document.getElementById("month").innerHTML = todaydate.getDate()+' '+todaydate.toLocaleString('en-us',{month:'long'})
    document.getElementById("town").innerHTML = finaldata.location.name
    document.getElementById("degree").innerHTML = finaldata.current.temp_c+" C"
    document.getElementById("icon").setAttribute('src',`https:${finaldata.current.condition.icon}`)
    document.getElementById("statue").innerHTML = finaldata.current.condition.text
    document.getElementById("humidity").innerHTML = finaldata.current.humidity+'%'
    document.getElementById("wind").innerHTML = finaldata.current.wind_kph+'km/h'
    document.getElementById("winddirection").innerHTML = finaldata.current.wind_dir

    let printer = ""
    for(let i=1;i<=2;i++){
        let nextdate = new Date (finaldata.forecast.forecastday[i].date)
        printer =`
            
                <div class="card-header body-bg text-center text-white">
                    <span class="ms-3">${nextdate.toLocaleString('en-us',{weekday:'long'})}</span>
                </div>
                <div class="card-body header-bg text-white p-4 d-flex flex-column justify-content-center align-items-center">
                    <br>
                    <img src="	https:${finaldata.forecast.forecastday[i].day.condition.icon}" width="100" id="tomorrowicon" alt="tomorrow statue">
                    <br>
                    <span class="fs-1">${finaldata.forecast.forecastday[i].day.maxtemp_c} C</span>
                    <br>
                    <small class="fs-5">${finaldata.forecast.forecastday[i].day.mintemp_c}</small>
                    <br>
                    <span class="text-primary fs-5" >${finaldata.forecast.forecastday[i].day.condition.text}</span>
                </div>
            
        `
        document.querySelectorAll('.nextday')[i-1].innerHTML = printer
    } 

}

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(currentposition){
        let lat = currentposition.coords.latitude
        let long = currentposition.coords.longitude
        getdata(`${lat},${long}`)
    })
}