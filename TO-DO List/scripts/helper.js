function formatTime(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - (hours * 3600)) / 60);
    let seconds = time - (hours * 3600) - (minutes * 60);

    if (hours < 10) hours = "0" + hours;
    if (seconds < 10) seconds = "0" + seconds;

    if (minutes >= 10) {
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return hours + ":0" + minutes + ":" + seconds;
    }
}

function militaryTo12HourTime(militaryTime) {
    const [hours, minutes] = militaryTime.split(':').map(num => parseInt(num));
    const period = hours < 12 ? 'AM' : 'PM';
    const twelveHourFormat = hours % 12 || 12;
    return `${twelveHourFormat.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function toMilitaryTime(time) {
    const [hours, minutes, period] = time.split(/:|\s/);
    let militaryHours = parseInt(hours);
    if (period.toUpperCase() === "PM" && militaryHours !== 12) {
      militaryHours += 12;
    } else if (period.toUpperCase() === "AM" && militaryHours === 12) {
      militaryHours = 0;
    }
    const militaryTime = `${militaryHours.toString().padStart(2, "0")}:${minutes}`;
    return militaryTime;
  }
  