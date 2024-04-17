// DOM Elements
const alarmList = document.querySelector(".alarmList");
const addAlarmBtn = document.querySelector("#addAlarmBtn");
const alarmModal = document.getElementById("alarmModal");
const alarmModalCancelBtn = document.querySelector(".alarmModal-cancelBtn");
const alarmForm = document.getElementById("alarmForm");
const alarmTimeInput = document.getElementById("alarmTimeInput");
const alarmNotesInput = document.getElementById("alarmNotesInput");
const repeatWeekInput = document.getElementById("repeatWeekInput");
const repeatDayInput = document.getElementById("repeatDayInput");
const repeatMonthInput = document.getElementById("repeatMonthInput");

const alarmSound = new Audio('assets/timersound.mp3');

document.addEventListener('DOMContentLoaded', loadAlarms);
addAlarmBtn.addEventListener("click", openAlarmModal);
alarmForm.addEventListener("submit", saveAlarm);
alarmModalCancelBtn.addEventListener("click", closeAlarmModal);

let alarms = [];


function loadAlarms() {
    const alarmsJSON = localStorage.getItem("alarms");
    if (alarmsJSON) {
        alarms = JSON.parse(alarmsJSON);
        renderAlarms();
    }
}

function saveAlarms() {
    localStorage.setItem("alarms", JSON.stringify(alarms));
}

function renderAlarms() {
    alarmList.innerHTML = '';
    alarms.forEach(renderAlarm);
}

// Render a single alarm
function renderAlarm(alarm) {
    const alarmElement = document.createElement("div");
    alarmElement.classList.add("alarm");

    const timeElement = document.createElement("span");
    timeElement.classList.add("alarm-time");
    timeElement.textContent = alarm.time;
    alarmElement.appendChild(timeElement);

    const notesElement = document.createElement("span");
    notesElement.classList.add("alarm-notes");
    notesElement.textContent = alarm.notes;
    alarmElement.appendChild(notesElement);

    const controlsElement = document.createElement("div");
    controlsElement.classList.add("alarm-controls");

    const onOffSwitch = document.createElement("input");
    onOffSwitch.type = "checkbox";
    onOffSwitch.checked = alarm.enabled;
    onOffSwitch.addEventListener("change", () => toggleAlarm(alarm, onOffSwitch.checked));
    controlsElement.appendChild(onOffSwitch);

    const editBtn = document.createElement("button");
    editBtn.textContent = "EDIT";
    editBtn.addEventListener("click", () => editAlarm(alarm));
    controlsElement.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "DELETE";
    deleteBtn.addEventListener("click", () => deleteAlarm(alarm));
    controlsElement.appendChild(deleteBtn);

    alarmElement.appendChild(controlsElement);

    alarmList.appendChild(alarmElement);
}


function saveAlarm(event) {
    event.preventDefault();

    const time = alarmTimeInput.value;
    const notes = alarmNotesInput.value;
    const repeat = {
        week: repeatWeekInput.checked,
        day: repeatDayInput.checked,
        month: repeatMonthInput.checked,
    };

    const newAlarm = {
        id: Date.now().toString(),
        time: time,
        notes: notes,
        repeat: repeat,
        enabled: true,
    };

    alarms.push(newAlarm);
    saveAlarms();
    renderAlarm(newAlarm);
    closeAlarmModal();
    alarmForm.reset();
}


function deleteAlarm(alarm) {
    alarms = alarms.filter(a => a.id !== alarm.id);
    saveAlarms();
    renderAlarms();
}


function toggleAlarm(alarm, on) {
    alarm.enabled = on;
    saveAlarms();
}

function openAlarmModal() {
    alarmModal.style.display = "block";
}

function closeAlarmModal() {
    alarmModal.style.display = "none";
    alarmTimeInput.required = false;
}


function editAlarm(alarm) {
    alarmTimeInput.required = true;
    alarmTimeInput.value = alarm.time;
    alarmNotesInput.value = alarm.notes;
    repeatWeekInput.checked = alarm.repeat.week;
    repeatDayInput.checked = alarm.repeat.day;
    repeatMonthInput.checked = alarm.repeat.month;

    openAlarmModal();
}
