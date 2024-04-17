const worldClock = document.querySelector(".worldClock");
const worldClockTimezoneSelect = document.querySelector(".timeZoneSelector");
function updateClock() {
    // Get current date and time
    var now = new Date();
    var timeZone = document.getElementById("time-zone").value;

    var date = now.toLocaleDateString('en-US', { timeZone: timeZone });
    var time = now.toLocaleTimeString('en-US', { timeZone: timeZone });
    document.querySelector('.worldClock').innerHTML = `${date}<br>${time}`;
}

function updateWorldClock(time) {
    const mins = Math.floor(time / 60).toString().padStart(2, "0");
    const secs = (time % 60).toString().padStart(2, "0");
    worldClock.textContent = `${mins}:${secs}`;
}

function updateTime() {
    const timeZone = document.getElementById("time-zone").value;
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
        timeZone: timeZone,
    });
    const parts = formatter.formatToParts(now);
    let hour, minute, second;
    for (const part of parts) {
        switch (part.type) {
            case "hour":
                hour = part.value;
                break;
            case "minute":
                minute = part.value;
                break;
            case "second":
                second = part.value;
                break;
            case "dayPeriod":
                ampm = part.value;
                break;
        }
    }

    // Check if daylight saving time is in effect
    const isDST = now.toLocaleString("en-US", { timeZone, timeZoneName: "short" }).endsWith("DT");
    if (isDST) {
        hour = parseInt(hour).toString(); 
    }

    hour = hour.padStart(2, "0");
    minute = minute.padStart(2, "0");
    second = second.padStart(2, "0");

    const timeString = `${hour}:${minute}:${second} ${ampm}`;
    const dateString = now.toLocaleString("en-US", { timeZone, dateStyle: "long" });

    document.querySelector("#worldClock .time").textContent = timeString;
    document.querySelector("#worldClock .date").textContent = dateString;
}

updateTime(); 
setInterval(updateTime, 1000); // Update time every second