const stopwatchClock = document.querySelector(".stopwatchClock");
const stopwatchResetBtn = document.querySelector(".stopwatchResetBtn");
const stopwatchStartStopBtn = document.querySelector(".stopwatchStartStopBtn");

let startTime = null;
let elapsedTime = 0; //Initialize time variable
let stopwatchInterval = null;

function updateStopwatchClock() {
    let currentTime = new Date().getTime();
    elapsedTime = Math.floor((currentTime - startTime) / 1000);
    stopwatchClock.innerHTML = formatTime(elapsedTime);
}

function stopwatchStartStop() {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        stopwatchStartStopBtn.innerHTML = "Start";
    } else {
        if (startTime === null) {
            startTime = new Date().getTime() - elapsedTime * 1000;
        } else {
            startTime = new Date().getTime() - elapsedTime * 1000 - 10;
        }
        stopwatchInterval = setInterval(updateStopwatchClock, 10);
        stopwatchStartStopBtn.innerHTML = "Stop";
    }
}

function stopwatchReset() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    startTime = 0;
    elapsedTime = 0;
    stopwatchClock.innerHTML = "00:00:00";
    stopwatchStartStopBtn.innerHTML = "Start";
}

stopwatchStartStopBtn.addEventListener("click", () => {
    stopwatchStartStop();
});

stopwatchResetBtn.addEventListener("click", () => {
    stopwatchReset();
});