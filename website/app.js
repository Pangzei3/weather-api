
let d = new Date()
// let newDate = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
let newDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";
const apiKey = "df0d3461865ce0be174fd59d5d73da0a";
const country = "us"
const zipCode = document.getElementById('zipcode')
const feeling = document.getElementById('feeling')
const errorIcon = document.getElementById('errorIcon')
// utility functions

//main function
function submitHandler() {
  const zip = document.getElementById("zipcode").value
  getWeather(baseUrl, zip, country, apiKey)
 
}

const getWeather = async (baseUrl, zip, country, apiKey) => {
  const res = await fetch(`${baseUrl}${zip},${country}&appid=${apiKey}`)
  try {
    const data = await res.json();
    data.date = newDate;
    data.feeling = document.getElementById("feeling").value;
    // console.log(data.name);
    // console.log(data)
    displayData(data)
  } catch (error) {
    console.log(error)
  }
}

const displayData = async (data) => {
  const res = await fetch ("/weather/display", {
    method: "POST",
    credentials: "same-origin",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(data)
  }).then(async (data) => {
    const res = await fetch("/weather");
    try {
      weatherData = await res.json();
      //console.log(weatherData)
      document.getElementById("city").innerHTML = `Location: ${weatherData.name}`;
      document.getElementById("description").innerHTML = `Description: ${weatherData.weather}`;
      document.getElementById("temp").innerHTML =` ${weatherData.temp} F`;
      document.getElementById("content").innerHTML = `Your feeling: ${weatherData.feeling}`;
      document.getElementById("date").innerHTML = `Today: ${weatherData.date}`;     
    } catch (error) {
      console.log(error)
      document.getElementById("city").innerHTML = weatherData.message;
    }
  })
}

document.getElementById("submit").addEventListener("click", submitHandler)
