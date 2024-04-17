const pomodoroClock = document.querySelector(".pomodoroClock");
const pomodoroStartStopBtn = document.getElementById("pomodoroStartStopBtn");
const pomodoroResetBtn = document.getElementById("pomodoroResetBtn");
const pomodoroClockLabel = document.getElementById("pomodoroClockLabel");
const pomodoroSettingsBtn = document.getElementById("pomodoroSettingsBtn");
const pomodoroModal = document.getElementById("pomodoroModal");
const pomodoroSaveBtn = document.querySelector(".pomodoroModal-saveBtn");
const pomodoroInput = document.getElementById("pomodoroInput");

let isTimerRunning = false;
let timerIntervalId;
let remainingTimeInSeconds;

function updatePomodoroClock(time) {
    const mins = Math.floor(time / 60).toString().padStart(2, "0");
    const secs = (time % 60).toString().padStart(2, "0");
    pomodoroClock.textContent = `${mins}:${secs}`;
}

function startPomodoroTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        pomodoroStartStopBtn.innerHTML = "Stop";
        pomodoroResetBtn.disabled = true;
        if (!remainingTimeInSeconds) {
            remainingTimeInSeconds = pomodoroInput.value * 60;
        }
        timerIntervalId = setInterval(updatePomodoroTimer, 1000);
    } else {
        stopPomodoroTimer();
    }
}

function stopPomodoroTimer() {
    clearInterval(timerIntervalId);
    isTimerRunning = false;
    pomodoroStartStopBtn.innerHTML = "Start";
    pomodoroResetBtn.disabled = false;
}

function resetPomodoroTimer() {
    stopPomodoroTimer();
    pomodoroClockLabel.innerHTML = "Pomodoro";
    pomodoroClock.innerHTML = formatPomodoroTime(pomodoroInput.value * 60);
    remainingTimeInSeconds = null;
}

function updatePomodoroTimer() {
    remainingTimeInSeconds--;
    pomodoroClock.innerHTML = formatPomodoroTime(remainingTimeInSeconds);

    if (remainingTimeInSeconds === 0) {
        stopPomodoroTimer();
        alert("Time's up!");
    }
}

function formatPomodoroTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secondsRemaining = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${secondsRemaining < 10 ? "0" : ""}${secondsRemaining}`;
}

pomodoroStartStopBtn.addEventListener("click", startPomodoroTimer);
pomodoroResetBtn.addEventListener("click", resetPomodoroTimer);

pomodoroSettingsBtn.addEventListener("click", function () {
    pomodoroModal.style.display = "block";
});

pomodoroSaveBtn.onclick = function () {
    pomodoroModal.style.display = "none";
};

window.addEventListener("click", function (event) {
    if (event.target === pomodoroModal) {
        pomodoroModal.style.display = "none";
    }
});
