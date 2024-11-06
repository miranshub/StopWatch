let toggleBtn = document.getElementById('toggle');
let resetBtn = document.getElementById('reset');

let hour = 0
let minute = 0;
let second = 0;
let count = 0;
let current_time = 0, previous_time = null;

let countToggle = 0;

// pause
toggleBtn.addEventListener('click', function () {
    if (countToggle % 2) {
        timer = false;
        toggleBtn.innerHTML = "Start";
        countToggle = 0;
    } else {
        timer = true;
        stopWatch();
        toggleBtn.innerHTML = "Stop";
        countToggle = 1;
    }
});

toggleBtn.addEventListener('mouseenter', function() {
    if(countToggle % 2) {
        toggleBtn.style.backgroundColor = "#0f46ad";
    }
    else {
        toggleBtn.style.backgroundColor = "#009779";
    }
});

toggleBtn.addEventListener("mouseleave", function() {
    toggleBtn.style.backgroundColor = "";
});

document.addEventListener("keydown", function (event) {
    // Check if the pressed key is the spacebar
    if (event.code === "Space") {
        event.preventDefault(); // Prevents the default action (scrolling, etc.)
        if (countToggle % 2) {
            timer = false;
            toggleBtn.innerHTML = "Start";
            countToggle++;
        } else {
            timer = true;
            stopWatch();
            toggleBtn.innerHTML = "Stop";
            countToggle++;
        }
    }
});

// reset time
resetBtn.addEventListener('click', function () {
    timer = false;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    countToggle = 0;
    toggleBtn.innerHTML = "Start";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('count').innerHTML = "00";
    document.getElementById('lapse-display').innerHTML = "";
    current_time = 0;
    previous_time = null;
});

document.addEventListener("keydown", function(event) {
    if(event.code === "Backspace" || event.key === "0") {
        timer = false;
        hour = 0;
        minute = 0;
        second = 0;
        count = 0;
        countToggle = 0;
        toggleBtn.innerHTML = "Start";
        document.getElementById('hour').innerHTML = "00";
        document.getElementById('min').innerHTML = "00";
        document.getElementById('sec').innerHTML = "00";
        document.getElementById('count').innerHTML = "00";
        document.getElementById('lapse-display').innerHTML = "";
        current_time = 0;
        previous_time = null;
    }
});

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function stopWatch() {
    if (timer) {
        count++;
        // let x = count++;
        // if(x < count) {
        //     mode_toggler();
        // }

        if (count == 100) {
            second++;
            count = 0;
        }

        if (second == 60) {
            minute++;
            second = 0;
        }
        
        if (minute == 60) {
            hour++;
            minute = 0;
        }

        let hourString = formatTime(hour);
        let minString = formatTime(minute);
        let secString = formatTime(second);
        let countString = formatTime(count);

        document.getElementById('hour').innerHTML = hourString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;
        current_time = hourString + ":" + minString + ":" + secString + "." + countString;
        setTimeout(stopWatch, 10);
    }
}

const toggleButton = document.getElementById('toggle-mode');
const body = document.body;

// Add an event listener to toggle the mode
toggleButton.addEventListener('click', mode_toggler);

document.addEventListener("keydown", function(event) {
    if(event.key === "m" || event.key === "5") {
        mode_toggler();
    }
});

function mode_toggler () {
        // console.log('.');
        body.classList.toggle('light-mode');
}


// lap
document.addEventListener('keydown', function(event) {
    if(event.key === 'f' && timer) {
        const lap_display = document.getElementById('lapse-display');
        // console.log(current_time);    
        let lapText = "<li>" + current_time;
        if (previous_time) {
            console.log('.');
            const lapDiff = calculateTimeDifference(previous_time, current_time);
            lapText += ` - [${lapDiff}]</li>`;
        }
        previous_time = current_time;
        lap_display.innerHTML = lapText + lap_display.innerHTML;
    }
});

document.getElementById('lapse-btn').addEventListener('click', function() {
    if(timer) {
        const lap_display = document.getElementById('lapse-display');
        // console.log(current_time);    
        let lapText = "<li>" + current_time;
        if (previous_time) {
            console.log('.');
            const lapDiff = calculateTimeDifference(previous_time, current_time);
            lapText += ` - [${lapDiff}]</li>`;
        }
        previous_time = current_time;
        lap_display.innerHTML = lapText + lap_display.innerHTML;
    }
});

function calculateTimeDifference(previous, current) {
    const prevParts = previous.split(/[:.]/).map(Number);
    const currParts = current.split(/[:.]/).map(Number);

    let [prevHour, prevMin, prevSec, prevCount] = prevParts;
    let [currHour, currMin, currSec, currCount] = currParts;

    let hourDiff = currHour - prevHour;
    let minDiff = currMin - prevMin;
    let secDiff = currSec - prevSec;
    let countDiff = currCount - prevCount;

    // Adjust for negatives in counts and seconds
    if (countDiff < 0) {
        countDiff += 100;
        secDiff--;
    }
    if (secDiff < 0) {
        secDiff += 60;
        minDiff--;
    }
    if (minDiff < 0) {
        minDiff += 60;
        hourDiff--;
    }

    return `${formatTime(hourDiff)}:${formatTime(minDiff)}:${formatTime(secDiff)}.${formatTime(countDiff)}`;
}
