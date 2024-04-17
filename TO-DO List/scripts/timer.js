const timerClock = document.querySelector(".timerClock");
const timerResetBtn = document.querySelector(".timerResetBtn");
const timerStartStopBtn = document.querySelector(".timerStartStopBtn");
const timerDurationInputMinutes = document.querySelector("#timerMinuteLength");
const timerDurationInputSeconds = document.querySelector("#timerSecondsLength");
const timerDurationInputHours = document.querySelector("#timerHourLength");
const timerSettingsBtn = document.getElementById("timerSettingsBtn");
const timerModal = document.getElementById("timerModal");
const timerSaveBtn = document.querySelector(".timerModal-saveBtn");

let duration = ((timerDurationInputHours.value * 360) + (timerDurationInputMinutes.value * 6) + timerDurationInputSeconds.value);
let timerStartTime = null;
let remainingTime = duration;
let timerInterval = null;
let pausedTime = 0;

function updateTimerClock() {
    const currentTime = new Date().getTime() / 1000;
    const elapsedTime = Math.floor(currentTime - startTime);
    remainingTime = duration - elapsedTime;

    if (remainingTime <= 0) {
        document.getElementById('timersound').play();
        clearInterval(timerInterval);
        timerInterval = null;
        timerStartStopBtn.innerHTML = "Start";
        remainingTime = 0;
        alert("Timer has ended!");
        document.getElementById('timersound').pause();
        timerReset();
    }

    timerClock.innerHTML = formatTime(remainingTime);
}

function timerStartStop() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        elapsed = new Date().getTime() / 1000 - startTime;
        timerStartStopBtn.innerHTML = "Start";
    } else {
        if (!startTime) {
            startTime = new Date().getTime() / 1000;
            remainingTime = duration;
        } else {
            startTime = new Date().getTime() / 1000 - elapsed;
        }
        timerInterval = setInterval(updateTimerClock, 1000);
        timerStartStopBtn.innerHTML = "Stop";
    }
}

function timerReset() {
    clearInterval(timerInterval);
    timerInterval = null;
    remainingTime = duration;
    startTime = null;
    timerClock.innerHTML = formatTime(remainingTime);
    timerStartStopBtn.innerHTML = "Start";
}

timerDurationInputHours.addEventListener('change', () => {
    duration = ((timerDurationInputHours.value * 360) + (timerDurationInputMinutes.value * 6) + timerDurationInputSeconds.value);
    remainingTime = duration;
    timerClock.innerHTML = formatTime(remainingTime);
});

timerDurationInputMinutes.addEventListener('change', () => {
    duration = ((timerDurationInputHours.value * 360) + (timerDurationInputMinutes.value * 6) + timerDurationInputSeconds.value);
    remainingTime = duration;
    timerClock.innerHTML = formatTime(remainingTime);;
});

timerDurationInputSeconds.addEventListener('change', () => {
    duration = ((timerDurationInputHours.value * 360) + (timerDurationInputMinutes.value * 6) + timerDurationInputSeconds.value);
    remainingTime = duration;
    timerClock.innerHTML = formatTime(remainingTime);
});

timerStartStopBtn.addEventListener("click", timerStartStop);
timerResetBtn.addEventListener("click", timerReset);

timerSettingsBtn.addEventListener("click", function () {
    timerModal.style.display = "block";
});

timerSaveBtn.onclick = function () {
    timerModal.style.display = "none";
};

window.addEventListener("click", function (event) {
    if (event.target === timerModal) {
        timerModal.style.display = "none";
    }
});