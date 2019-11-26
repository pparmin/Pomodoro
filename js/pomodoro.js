/* Variable Declaration */
let countdown;
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const displayMinutes = document.querySelector('#min');
const displaySeconds = document.querySelector('#sec');
const nrMinutes = document.querySelector('#nr-minutes');
const nrSeconds = document.querySelector('#nr-seconds');

/* Functions and Methods */
const update = {
  minutes : function (minutes) {
    displayMinutes.textContent = minutes;
  }, 

  seconds : function (seconds) {
    displaySeconds.textContent = seconds;
  },
};

const setMode = {
  started : function () {
    startButton.classList.replace('stopped', 'started');
  },

  stopped : function () {
    startButton.classList.replace('started', 'stopped');
  },
};


function updateTime () {
  let seconds = Number(displaySeconds.textContent);
  let minutes = Number(displayMinutes.textContent);

  console.log(`Minutes: ${minutes}`);
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


}

function startCountdown () {
  if (startButton.className == 'started') {
    return;
  }
  countdown = setInterval(updateTime, 1000);
  setMode.started();
}

function stopCountdown () {
  clearInterval(countdown);
  setMode.stopped();
}

startButton.addEventListener('click', startCountdown);
stopButton.addEventListener('click', stopCountdown);

nrMinutes.addEventListener('click', e => {
  update.minutes(e.target.value);
  console.log(e.target.value);
});

nrSeconds.addEventListener('click', e => {
  update.seconds(e.target.value);
  console.log(e.target.value);
});