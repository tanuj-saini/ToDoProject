const main = document.getElementById("main"),
  navWrapper = document.getElementById("nav-wrapper");

const toggleNav = () => {
  main.dataset.nav = main.dataset.nav === "true" ? "false" : "true";
  if (main.dataset.nav == "true") {
    navWrapper.style.opacity = 100;
  } else {
    navWrapper.style.opacity = 0;
  }
};

// Event listeners to each tab to switch between components
const alarmTab = document.querySelector("#alarm-tab");
const stopwatchTab = document.querySelector("#stopwatch-tab");
const calendarTab = document.querySelector("#calendar-tab");
const todoListTab = document.querySelector("#todo-list-tab");
const weatherTab = document.querySelector("#weather-tab"); // New weather tab button
const MapTab = document.querySelector("#map");

const alarmComponent = document.querySelector("#alarm-component");
const stopwatchComponent = document.querySelector("#stopwatch-component");
const calendarComponent = document.querySelector("#calendar-component");
const todoListComponent = document.querySelector("#todo-list-component");

alarmTab.addEventListener("click", () => {
  alarmTab.classList.add("active");
  stopwatchTab.classList.remove("active");
  calendarTab.classList.remove("active");
  todoListTab.classList.remove("active");

  alarmComponent.classList.add("active");
  stopwatchComponent.classList.remove("active");
  calendarComponent.classList.remove("active");
  todoListComponent.classList.remove("active");
});

stopwatchTab.addEventListener("click", () => {
  alarmTab.classList.remove("active");
  stopwatchTab.classList.add("active");
  calendarTab.classList.remove("active");
  todoListTab.classList.remove("active");

  alarmComponent.classList.remove("active");
  stopwatchComponent.classList.add("active");
  calendarComponent.classList.remove("active");
  todoListComponent.classList.remove("active");
});

calendarTab.addEventListener("click", () => {
  alarmTab.classList.remove("active");
  stopwatchTab.classList.remove("active");
  calendarTab.classList.add("active");
  todoListTab.classList.remove("active");

  alarmComponent.classList.remove("active");
  stopwatchComponent.classList.remove("active");
  calendarComponent.classList.add("active");
  todoListComponent.classList.remove("active");
});

todoListTab.addEventListener("click", () => {
  alarmTab.classList.remove("active");
  stopwatchTab.classList.remove("active");
  calendarTab.classList.remove("active");
  todoListTab.classList.add("active");

  alarmComponent.classList.remove("active");
  stopwatchComponent.classList.remove("active");
  calendarComponent.classList.remove("active");
  todoListComponent.classList.add("active");
});
weatherTab.addEventListener("click", () => {
  // Redirect to weather.html when weather tab is clicked
  window.location.href = "weather-web/index.html";
});
function navigateToMap() {
  window.location.href = "map.html"; // Navigate to map.html when the MapTab button is clicked
}
