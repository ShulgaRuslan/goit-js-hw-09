const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.addEventListener('click', onStartColorSwitcher);
stopBtn.addEventListener('click', onStopColorSwitcher);

function onStartColorSwitcher() {
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');

  timerId = setInterval(() => {
    const body = document.querySelector('body');
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopColorSwitcher() {
  stopBtn.setAttribute('disabled', true);
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
