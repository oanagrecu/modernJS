import Data from "./config.js";
import "./style.css";
import { displayWeatherCards } from "./displayData.js";
import component from "./src/component.js";
const searchBar = document.querySelector("#searchBar");
const container = document.querySelector(".container");

document.body.appendChild(component());
const cityNameContainer = document.querySelector(".city-name");

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Event will start on a keyup action
searchBar.addEventListener("keyup", getCoordonates);

function getCoordonates(event) {
  // checking the action for specific key (Enter)
  if (event.key === "Enter") {
    // Store target in variable
    const thisCity = event.target.value.toLowerCase();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${thisCity}&appid=${Data.key}`;
    // Fetching first api to get the City coordinates
    event.currentTarget.value = "";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        cityNameContainer.innerHTML = data.name;
        const lon = data.coord.lon;
        console.log(lon);
        const lat = data.coord.lat;
        console.log(lat);

        getData(lat, lon);
      });
  }
}
function getData(lat, lon) {
  //Fetching final data according to the coordinates
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&units=metric&appid=${Data.key}`
  )
    .then((response) => response.json())
    .then((result) => {
      //   console.log(
      //     "Welcome to this basic weather app. this is not a product but the product of an academic exercise."
      //   );
      console.log(result);
      //   //  Removing all child elements from Container before creating new set of elements
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      displayWeatherCards(result, container, weekdays);
    });
}
