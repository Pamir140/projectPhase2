// query selectors to access dom elements of html page
var btnAddNewItem = document.querySelector("#add");
var listToCreate = document.querySelector("ul#list");
var tasksCompleted = document.querySelector("ul#completed");

// onclick eventlistener for + Task button.
btnAddNewItem.onclick = function () {
  var input = document.querySelector("#input");
  var li = document.createElement("li");
  li.setAttribute("class", "list-group-item row");
  var itemValue = input.value;
  console.log(itemValue);
  li.innerHTML = itemValue;
  var checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("id", "myCheck");
  checkBox.setAttribute("class", "col-sm-1");

  // append child of checkbox
  li.appendChild(checkBox);
  checkBox.onchange = function () {
    playSound();
    var completedLi = document.createElement("li");
    li.removeChild(checkBox);
    completedLi.setAttribute("class", "list-group-item");
    var itemStringValue = li.innerText.toString();
    var completedItemValue = li.innerText
      .toString()
      .substr(0, itemStringValue.length - 6);
    completedLi.innerText = completedItemValue;
    var btnFinishedTask = document.createElement("button");
    btnFinishedTask.innerText = "Delete";
    btnFinishedTask.setAttribute("id", "deleteCompleted");
    btnFinishedTask.setAttribute("style", "float: left;");
    completedLi.appendChild(btnFinishedTask);
    btnFinishedTask.onclick = function () {
      console.log("Completed item deleted!");
      tasksCompleted.removeChild(completedLi);
    };
    completedLi.setAttribute(
      "style",
      "background-color: rgb(100, 250, 100);margin-bottom: 15px;text-Decoration: line-through;"
    );
    tasksCompleted.appendChild(completedLi);
    listToCreate.removeChild(li);
  };
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.setAttribute("id", "delete");
  deleteButton.setAttribute("style", "float: right;");
  li.appendChild(deleteButton);
  deleteButton.onclick = function () {
    console.log("Item Deleted successfuly");
    li.style.display = "none";
  };
  if (itemValue === "") {
    alert("First you have to add something to text field.");
  } else {
    listToCreate.appendChild(li);
  }
  input.value = "";
};

function playSound() {
  document.getElementById("audio").play();
}

// Browser API
// FullScreen mode API for user to use applicaiton in fullscreen mode or regular mode.

var btnFullScreen = document.querySelector("#fullScreen");
btnFullScreen.onclick = toggleFullScreen;

function toggleFullScreen() {
  // if the fullscreenElement is not true then button press will convert the screen to the full screen mode.
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// 3rd party API
// https://openweathermap.org/ for weather data

// code from my lab 10 to get coordinates of the location

function geoFindMe() {
  const status = document.querySelector("#status");
  const weatherData = document.querySelector("#weatherData");
  const weatherLocation = document.querySelector("#weatherLocation");

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // api from 3rd party
    const appId = "9127a20731ad82eda8fd796a51a25d76";

    const apiFormat =
      "http://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      appId;

    fetch(apiFormat)
      .then((resp) => resp.json()) // transfer data to the json format for the use...
      .then(function (data) {
        console.log(data);
        weatherLocation.textContent = data.name;
        weatherData.textContent = data.main.temp - 273.15;
      });
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Location tracking is not supported";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.watchPosition(success, error);
  }
}

// geoFindMe function call on windows load for location data and API work
window.onload = geoFindMe();
