/*
What works so far? 
Automatic switch between work time and break time
Stop button stops both fields

TODO:
Start button should also be able to restart break (but not start)
normal timer at the same time (introduce mode to break time?)
  --> Introduce mode for break/work time: When work timer is running: mode "work",
      when break timer is running: mode "break")


Introduce proper classes/modes for new structure
*/


/* Variable Declaration */
let countdown;
let countdownBreak;
const startButton = document.querySelector('#play');
//const stopButton = document.querySelector('#stop');
const displayMinutes = document.querySelector('#min');
const displaySeconds = document.querySelector('#sec');
const nrWorkTime = document.querySelector('#nr-work');
const nrBreakTime = document.querySelector('#nr-break');
const displayBreakMinutes = document.querySelector('#break-min');
const displayBreakSeconds = document.querySelector('#break-sec');

const playButton = document.querySelector('#play');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');


/* Functions and Methods */
const update = {
  minutes : function (minutes) {
    displayMinutes.textContent = minutes;
  }, 

  seconds : function (seconds) {
    displaySeconds.textContent = seconds;
  },

  minutesBreak : function (minutes) {
    displayBreakMinutes.textContent = minutes;
  },

  secondsBreak : function (seconds) {
    displayBreakSeconds.textContent = seconds;
  },
};


const setTime = {
  work : function (minutes) {
    displayMinutes.textContent = minutes;
  }, 

  break : function (minutes) {
    displayBreakMinutes.textContent = minutes;
  },

  fullValue : function (minutes) {
    displayMinutes.textContent = minutes;
  },

  fullValueBreak : function (minutes) {
    displayBreakMinutes.textContent = minutes;
  }
};

const setMode = {
  started : function () {
    startButton.classList.replace('stopped', 'started');
  },

  stopped : function () {
    startButton.classList.replace('started', 'stopped');
  },

  break : function () {
    startButton.classList.replace('work', 'break');
    stopButton.classList.replace('work', 'break');
  },

  work : function () {
    startButton.classList.replace('break', 'work');
    stopButton.classList.replace('break', 'work');
  },

};

function updateWorkTimer () {
  let seconds = Number(displaySeconds.textContent);
  let minutes = Number(displayMinutes.textContent);

  seconds--;
  update.seconds(seconds);

  if (seconds < 0) {
    seconds = 59;
    update.seconds(seconds);

    minutes--;
    update.minutes(minutes);
  } else if (seconds < 10) {
    displaySeconds.textContent = `0${seconds}`;
  }

  if (minutes == 0 && seconds == 0) {
    stopWorkTimer();
    setMode.break();
    startBreakTimer();
  }

  console.log(`Minutes: ${minutes}`);
  console.log(`Seconds: ${seconds}`);
}

function updateBreakTimer () {
  let secondsBreak = Number(displayBreakSeconds.textContent);
  let minutesBreak = Number(displayBreakMinutes.textContent);

  secondsBreak--;
  update.secondsBreak(secondsBreak);

  if (secondsBreak < 0) {
    secondsBreak = 59;
    update.secondsBreak(secondsBreak);

    minutesBreak--;
    update.minutesBreak(minutesBreak);
  } else if (secondsBreak < 10) {
    displayBreakSeconds.textContent = `0${secondsBreak}`;
  }

  console.log(`Minutes break: ${minutesBreak}`);
  console.log(`Seconds break: ${secondsBreak}`);

  if (minutesBreak == 0 && secondsBreak == 0) {
    stopBreakTimer();
    setMode.work();
    startWorkTimer();
  }
}

function startBreakTimer () {

  // if timer is already running, don't execute function
  if (startButton.classList.contains('started')) {
    return;
  } else if (startButton.classList.contains('work')) {
    console.log('We are in work mode');
    return;
  }

  countdownBreak = setInterval(updateBreakTimer, 1000);
  setMode.started();
}

function stopBreakTimer () {
  clearInterval(countdownBreak);
}

function startWorkTimer () {

  // if timer is already running, don't execute function
  if (startButton.classList.contains('started')) {
    console.log('The timer has been started already')
    return;
  } else if (startButton.classList.contains('break')) {
    return;
  }
  countdown = setInterval(updateWorkTimer, 1000);
  setMode.started();
}

function stopWorkTimer () {
  clearInterval(countdown);
  setMode.stopped();
}

/* ------------------------------------------------ */

startButton.addEventListener('click', (event) => {
  startBreakTimer();
  startWorkTimer();
});

stopButton.addEventListener('click', () => {
  stopWorkTimer();
  stopBreakTimer();
});

nrWorkTime.addEventListener('click', e => {
  setTime.work(e.target.value);
  console.log(e.target.value);
});

nrBreakTime.addEventListener('click', e => {
  setTime.break(e.target.value);
  console.log(e.target.value);
});