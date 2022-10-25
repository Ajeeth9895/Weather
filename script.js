//Dom
const details = document.querySelector(".container-lg");

//fetching country details from rest countries api
let weather_api = async () => {
  let api = "https://restcountries.com/v3.1/all";
  let res = await fetch(api, {
    method: "GET",
  });
  details.innerHTML = `<h4>Loading Please Wait.....</h4>`;

  let out = await res.json();

  details.innerHTML = "";

  for (let i = 0; i < out.length; i++) {
    
    let flag = out[i].flags.svg;
    let name = out[i].name.common;
    let region = out[i].region;
    let capital = out[i].capital;
    let population = out[i].population;
    let lat = out[i].latlng[0];
    let lng = out[i].latlng[1];

    details.innerHTML += `
        <div class="card" style="width: 15em; height:33em;  border: 2px solid black; ">
        <img src="${flag}" class="card-img-top" style="height:10em;" alt="...">
        <div class="card-body" style="height:18em;">
          <h5 class="card-title"><b>Name: </b>${name}</h5>
          <p class="card-text" id="region_area"><b>Region: </b>${region}</p>
          <p class="card-text"><b>Capital:  </b>${capital}</p>
          <p class="card-text"><b>Population: </b>${population}</p>
          <div id="${out[i].name.common}"></div>
        </div>
        <div class="card-footer" id="Weather_area" >
         <button type="button" class="btn btn-primary"  onclick="getWeather(${lat},${lng},'${out[i].name.common}')">Get Weather</button>
        </div>
      </div>
        `;
  }
};

//fetching weather details from weather api
async function getWeather(lat, lng, id) {
  let weather_detail = document.getElementById(id);

  let API_key = "80f6c6231def0207f859cab8192b488b";

  let api1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_key}`;

  let res1 = await fetch(api1, {
    method: "GET",
  });

  let out1 = await res1.json();

  weather_detail.innerHTML = `
    <p class="card-text"><b>Weather: </b>${out1.weather[0].main}</p>
    <p class="card-text"><b>Temp: </b>${out1.main.temp}</p>
    `;
}

//calling  weather api
weather_api();
