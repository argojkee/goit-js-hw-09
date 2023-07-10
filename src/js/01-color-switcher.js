const refs = {
  startBtn: document.querySelector('[data-start'),
  stopBtn: document.querySelector('[data-stop'),
};
let intervalId = null;

refs.startBtn.addEventListener('click', onStartChangeBackgroundColor);
refs.stopBtn.addEventListener('click', onStopChangeBackgroundColor);

refs.stopBtn.setAttribute('disabled', 'disabled');

function onStartChangeBackgroundColor() {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  refs.startBtn.setAttribute('disabled', 'disabled');
  refs.stopBtn.removeAttribute('disabled');
}

function onStopChangeBackgroundColor() {
  clearInterval(intervalId);
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', 'disabled');
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
