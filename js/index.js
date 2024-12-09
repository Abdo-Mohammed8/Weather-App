
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


navigator.geolocation.getCurrentPosition(showPosition, handleError);



document.getElementById('searchInput').addEventListener("keyup" , a =>{
    if (a.target.value.length > 2){
    search(a.target.value)
    }
})
document.getElementById("find").addEventListener('click', function() {

    if (document.getElementById("searchInput").value.length > 2) {
    search(document.getElementById('searchInput').value)
    }
    else {
        alert("Please enter at least the first three letters.")

    }

});

async function getLocation(lat,lon) {
    let t = await fetch(`https://geocode.maps.co/reverse?lat=${lat}4&lon=${lon}&api_key=675753f548f77267762146qombff7c0`);
    if (t.ok && 400!= t.status) {
        let a = await t.json();
        search(a.address.city);  
    }

}




async function search(a) {
    let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=178bdd1eb42a48f6b5f153958240712&q=${a}&days=3`);
    if (t.ok && 400!= t.status) {
        let a = await t.json();
        displayCurrent(a.location,a.current);
        displayAnother(a.forecast.forecastday);

    }
    else {
        document.getElementById("colOne").innerHTML = `<div class = "inner text-center"><span class = "text-danger fs-3 fw-blod bg-dark bg-opacity-50">Enter a valid city name</span></div>`;
        document.getElementById("colTow").innerHTML = `<div class = "inner-mid"></div>`;
        document.getElementById("colThree").innerHTML = `<div class = "inner"></div>`;
    }
}


function handleError() {
    search("Cairo");
}

function showPosition(position) {
    let lat =  position.coords.latitude ;
    let lon =  position.coords.longitude;
    getLocation(lat,lon)
}

function displayCurrent(a,t) {
    if (null != t) {
        var e = new Date(t.last_updated.replace(" ", "T"));
        let f = `
        <div class="inner">
                        <div class="head-of-data d-flex justify-content-between">
                            <div class="day"><span>${days[e.getDay()]}</span></div>
                                    <div class="date"><span>${e.getDate() +" "+ monthName[e.getMonth()]}</span></div>
                            </div>
                        <div class="content p-3">
                                    <div class="location fs-5 mt-4"><span>${a.name}</span></div>
                                    <div class="num">${t.temp_c}<sup>o</sup>C</div>
                                    <div class="image">
                                        <img src="https:${t.condition.icon}" alt="icon" width="90">
                                    </div>
                                    <div class="custom"><span>${t.condition.text}</span></div>
                                    <div class="my-icons d-flex">
                                    <div class="me-5"><i class="fa-solid fa-umbrella fa-xl"></i><span class="ms-2">${t.wind_kph}</span></div>
                                    <div class="me-5"><i class="fa-solid fa-wind fa-xl"></i><span class="ms-2">${t.wind_kph}</span></div>
                                    <div class="me-5"><i class="fa-regular fa-compass fa-xl"></i><span class="ms-2">${t.wind_dir}</span></div>
                                    </div>
                                    
                         </div>
    
        </div>`;
        document.getElementById("colOne").innerHTML = f
    }
}

function displayAnother(a) {

    let t = `
    <div class="inner-mid text-center">
    
                                <div class="head-of-data">
                                    <div class="day"><span>${days[new Date(a[1].date.replace(" ", "T")).getDay()]}</span></div>
                                </div>
                                <div class="py-5 px-2">
                                    <div class="mb-3"><img src="https:${a[1].day.condition.icon}" alt="icon" width="48"></div>
                                    <div class="degreey">
                                        <p class="m-0 fs-5 fw-bold text-white">${a[1].day.maxtemp_c}<sup>o</sup>C</p>
                                        <p>${a[1].day.mintemp_c}<sup>o</sup>C</p>
                                    </div>
                                    <div class="custom">
                                        <span>${a[1].day.condition.text}</span>
        
                                    </div>
                                </div>
                                
    
                            </div>

    `
    let y = `

    <div class="inner text-center">
    
                                <div class="head-of-data">
                                    <div class="day"><span>${days[new Date(a[2].date.replace(" ", "T")).getDay()]}</span></div>
                                </div>
                                <div class="py-5 px-2">
                                    <div class="mb-3"><img src="https:${a[2].day.condition.icon}" alt="icon" width="48"></div>
                                    <div class="degreey">
                                    <p class="m-0 fs-5 fw-bold text-white">${a[2].day.maxtemp_c}<sup>o</sup>C</p>
                                    <p>${a[2].day.mintemp_c}<sup>o</sup>C</p>
                                    </div>
                                    <div class="custom">
                                        <span>${a[2].day.condition.text}</span>
        
                                    </div>
                                </div>
                                
    
                            </div>


    
    `
    document.getElementById("colTow").innerHTML = t;
    document.getElementById("colThree").innerHTML = y;

}















    


