let currentDate = new Date();
let selectedDate = new Date();

function displayCalendar() {
    const calendarGrid = document.getElementById("calendargrid");

    while (calendarGrid.firstChild) {
        calendarGrid.removeChild(calendarGrid.firstChild);
    }

    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

    const numCells = (lastDayOfMonth.getDate() + firstDayOfMonth.getDay());
    const fillCells = 42 - numCells;

    for (let i = 0; i < numCells; i++) {
        const cell = document.createElement("div");
        cell.classList.add("calendar-cell");
        if (i >= firstDayOfMonth.getDay() && i >= numCells - lastDayOfMonth.getDate()) {
            const dayOfMonth = i - firstDayOfMonth.getDay() + 1;
            const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), dayOfMonth);
            cell.dataset.date = date.toISOString().split('T')[0];
            cell.textContent = dayOfMonth;
        } else {
            cell.classList.add("empty-cell");
        }
        calendarGrid.appendChild(cell);
        eventElements.push(cell);
    }

    for (let i = 0; i < fillCells; i++) {
        const cell = document.createElement("div");
        cell.classList.add("calendar-cell");
        cell.classList.add("empty-cell");
        calendarGrid.appendChild(cell);
        eventElements.push(cell);
    }

    const calendarHeader = document.getElementById("calendar-header");
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    calendarHeader.textContent = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
}

window.onload = displayCalendar;

function moveCalendarMonth(delta) {
    selectedDate.setMonth(selectedDate.getMonth() + delta);

    displayCalendar();
}

function moveCalendarYear(delta) {
    selectedDate.setFullYear(selectedDate.getFullYear() + delta);

    displayCalendar();
}

document.getElementById("prev-month-btn").addEventListener("click", function () {
    moveCalendarMonth(-1);
});

document.getElementById("next-month-btn").addEventListener("click", function () {
    moveCalendarMonth(1);
});

document.getElementById("add-event-btn").addEventListener("click", function () {
    document.getElementById("event-form").style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", function () {
    document.getElementById("event-form").style.display = "none";
});

let eventElements = []; // Array to store created event elements

document.getElementById("event-form-data").addEventListener("submit", function (event) {
    event.preventDefault(); // prevent the form from submitting

    let eventName = document.getElementById("event-name").value;
    let eventDate = document.getElementById("event-date").value;
    let eventStartTime = document.getElementById("event-start-time").value;
    let eventEndTime = document.getElementById("event-end-time").value;
    let eventRepeat = document.getElementById("event-repeat").value;
    let eventNotes = document.getElementById("event-notes").value;

    let newEvent = {
        name: eventName,
        date: eventDate,
        startTime: eventStartTime,
        endTime: eventEndTime,
        repeat: eventRepeat,
        notes: eventNotes
    };

    addEventToCalendar(newEvent);

    document.getElementById("event-name").value = "";
    document.getElementById("event-date").value = "";
    document.getElementById("event-start-time").value = "";
    document.getElementById("event-end-time").value = "";
    document.getElementById("event-repeat").value = "";
    document.getElementById("event-notes").value = "";
});

function addEventToCalendar(event) {
    console.log(event.date);
    let calendarCell = document.querySelector(`.calendar-cell[data-date='${event.date}']`);

    let eventElement = document.createElement("div");
    eventElement.classList.add("event");
    eventElement.innerHTML = `
    <div class="event-time">${event.startTime} - ${event.endTime}</div>
    <div class="event-name">${event.name}</div>
    <div class="event-notes">${event.notes}</div>
  `;

    calendarCell.appendChild(eventElement);

    if (event.repeat !== "") {
        eventList.push(event);
    }

    eventElements.push(eventElement); // Store the created event element in the array
}

function getEventElementByDate(date) {
    for (let i = 0; i < eventElements.length; i++) {
        if (eventElements[i].dataset.date === date) {
            return eventElements[i];
        }
    }
    return null; // Return null if no matching element found
}

function removeEventFromCalendar(eventElement) {
    eventElement.parentNode.removeChild(eventElement);
}

displayCalendar();