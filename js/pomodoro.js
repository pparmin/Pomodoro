
const setTime = {
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
};

/*function updateSeconds () {
  let seconds = Number(displaySeconds.textContent);

  console.log('Helo');
  seconds--;
  displaySeconds.textContent = seconds;

  if (seconds < 0) {
    seconds = 59;
    displaySeconds.textContent = seconds;
  } else if (seconds < 10) {
    displaySeconds.textContent = `0${seconds}`;
  }
}*/

function updateTime () {
  let seconds = Number(displaySeconds.textContent);
  let minutes = Number(displayMinutes.textContent);

  console.log(`Minutes: ${minutes}`);
  seconds--;
  displaySeconds.textContent = seconds;

  if (seconds < 0) {
    seconds = 59;
    displaySeconds.textContent = seconds;

    minutes--;
    displayMinutes.textContent = minutes;
  } else if (seconds < 10) {
    displaySeconds.textContent = `0${seconds}`;
  }


}

function updateMinutes () {
  let minutes = Number(displayMinutes.textContent);

  minutes--;
  displayMinutes.textContent = minutes;
}

function triggerCountdown () {

}

function startCountdown () {
  /*setInterval(updateSeconds, 1000);
  setInterval(updateMinutes, 60000)*/
  countdown = setInterval(updateTime, 1000);
  setMode.started();
  /*minutes--;
  displayMinutes.textContent = minutes;
  seconds--;
  displaySeconds.textContent = seconds;
*/
}

function stopCountdown () {
  clearInterval(countdown);
}

function getMinutes() {
  let date = new Date();
  let minutes = date.getMinutes();

  return minutes;
}

function getSeconds() {
  let date = new Date();
  let seconds = date.getSeconds();

  return seconds;
}

let countdown;
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const displayMinutes = document.querySelector('#min');
const displaySeconds = document.querySelector('#sec');
const nrMinutes = document.querySelector('#nr-minutes');
const nrSeconds = document.querySelector('#nr-seconds');

startButton.addEventListener('click', startCountdown);
stopButton.addEventListener('click', stopCountdown);

nrMinutes.addEventListener('click', e => {
  setTime.minutes(e.target.value);
  console.log(e.target.value);
});

nrSeconds.addEventListener('click', e => {
  setTime.seconds(e.target.value);
  console.log(e.target.value);
})