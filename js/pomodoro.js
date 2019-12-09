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
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

const displayMinutes = document.querySelector('#min');
const displaySeconds = document.querySelector('#sec');
const nrWorkTime = document.querySelector('#nr-work');
const nrBreakTime = document.querySelector('#nr-break');
const displayBreakMinutes = document.querySelector('#break-min');
const displayBreakSeconds = document.querySelector('#break-sec');
const colonWork = document.querySelector('#colon-work');
const colonBreak = document.querySelector('#colon-break');
const increaseButtons = document.querySelectorAll('#increase');
const decreaseButtons = document.querySelectorAll('#decrease');
const sessionTimeSettings = document.querySelector('#set-session');
const breakTimeSettings = document.querySelector('#set-break');

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

  seconds : function (seconds) {
    displaySeconds.textContent = `${seconds}0`;
    displayBreakSeconds.textContent = `${seconds}0`;
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

const setColors = {
  work : function () {
    displayMinutes.style.color = 'rgb(194, 129, 129)';
    displaySeconds.style.color = 'rgb(194, 129, 129)';
    colonWork.style.color = 'rgb(194, 129, 129)';
  },

  break : function () {
    displayBreakMinutes.style.color = 'rgb(194, 129, 129)';
    displayBreakSeconds.style.color = 'rgb(194, 129, 129)';
    colonBreak.style.color = 'rgb(194, 129, 129)';
  },

  workPaused : function () {
    displayMinutes.style.color = 'rgb(194, 129, 129)';
    displaySeconds.style.color = 'rgb(194, 129, 129)';
    colonWork.style.color = 'rgb(194, 129, 129)';
  }, 

  breakPaused : function () {
    displayBreakMinutes.style.color = 'rgb(194, 129, 129)';
    displayBreakSeconds.style.color = 'rgb(194, 129, 129)';
    colonBreak.style.color = 'rgb(194, 129, 129)';
  }
};

const removeColors = {
  work : function () {
    displayMinutes.style.color = 'rgb(34, 34, 34)';
    displaySeconds.style.color = 'rgb(34, 34, 34)';
    colonWork.style.color = 'rgb(34, 34, 34)';
  },

  break : function () {
    displayBreakMinutes.style.color = 'rgb(34, 34, 34)';
    displayBreakSeconds.style.color = 'rgb(34, 34, 34)';
    colonBreak.style.color = 'rgb(34, 34, 34)';
  }
};

const increaseInitialTime = {
  work : function () {
    let currentNumber = Number(sessionTimeSettings.textContent);
    console.log('old number: ' + currentNumber);
    currentNumber += 1;
    console.log('New cNumber: ' + currentNumber);
    sessionTimeSettings.textContent = currentNumber;
    displayMinutes.textContent = currentNumber;
  },

  break : function () {
    let currentNumber = Number(breakTimeSettings.textContent);
    console.log('old number: ' + currentNumber);
    currentNumber += 1;
    console.log('New cNumber: ' + currentNumber);
    breakTimeSettings.textContent = currentNumber;
    displayBreakMinutes.textContent = currentNumber;
  }
};

const decreaseInitialTime = {
  work : function () {

    let currentNumber = Number(sessionTimeSettings.textContent);
    console.log('old number: ' + currentNumber);
    currentNumber -= 1;
    console.log('New cNumber: ' + currentNumber);
    if (currentNumber <= 0) {
      return;
    }
    sessionTimeSettings.textContent = currentNumber;
    displayMinutes.textContent = currentNumber;
  },

  break : function () {
    let currentNumber = Number(breakTimeSettings.textContent);
    console.log('old number: ' + currentNumber);
    currentNumber -= 1;
    console.log('New cNumber: ' + currentNumber);
    if (currentNumber <= 0) {
      return;
    }

    breakTimeSettings.textContent = currentNumber;
    displayBreakMinutes.textContent = currentNumber;
  }
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

  // when the timer has run out, switch to break timer/mode
  if (minutes <= 0 && seconds <= 0) {
    stopWorkTimer();
    alert("It's time to take a break");
    setMode.break();

    // set the display for the session time back to the initial time
    setTime.work(sessionTimeSettings.textContent);
    startBreakTimer();
  }

  console.log(`Minutes: ${minutes}`);
  console.log(`Seconds: ${seconds}`);
}

// This function regulates the simulation of a second long countdown
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

  // when the timer has run out, switch to work timer/mode
  if (minutesBreak == 0 && secondsBreak == 0) {
    stopBreakTimer();
    setMode.work();
    setMode.stopped();

    // set the display for the break time back to the initial time
    setTime.break(breakTimeSettings.textContent);
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
  setColors.break();
  setMode.started();
}

function stopBreakTimer () {
  clearInterval(countdownBreak);
  removeColors.break(); 
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
  setColors.work();
  setMode.started();
}

function stopWorkTimer () {
  clearInterval(countdown);
  setMode.stopped();
  removeColors.work();
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

increaseButtons.forEach(increaseButton => increaseButton.addEventListener('click', () => {
  if (increaseButton.classList.contains('work')) {
    increaseInitialTime.work();
  } else if (increaseButton.classList.contains('break')) {
    increaseInitialTime.break();
  }
}));

decreaseButtons.forEach(decreaseButton => decreaseButton.addEventListener('click', () => {
  if (decreaseButton.classList.contains('work')) {
    decreaseInitialTime.work();
  } else if (decreaseButton.classList.contains('break')) {
    decreaseInitialTime.break();
  }
}));

resetButton.addEventListener('click', () => {
  setTime.work(25);
  setTime.break(5);
  setTime.seconds(0);
});