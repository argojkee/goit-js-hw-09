import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let selectedTime = null;
let intervalId = null;

disabledButton();

startBtn.addEventListener('click', () => {
  onStartTimerBtn();
  disabledButton();
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (Date.parse(selectedDates[0]) < Date.now()) {
      Report.failure(
        'Date picker error',
        'Unfortunately, you cannot select a date in the past.',
        'Okay'
      );
      disabledButton();
      return;
    }

    enableButton();
    selectedTime = Date.parse(selectedDates[0]);
  },
};
flatpickr(inputEl, options);

function onStartTimerBtn() {
  const differentTime = selectedTime - Date.now();
  const { days, hours, minutes, seconds } = convertMs(differentTime);

  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);

  intervalId = setInterval(() => {
    const differentTime = selectedTime - Date.now();
    const { days, hours, minutes, seconds } = convertMs(differentTime);

    if (differentTime < 1000) {
      clearInterval(intervalId);
      disabledButton();
    }

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const updateValue = String(value).padStart(2, '0');
  return updateValue;
}

function enableButton() {
  startBtn.removeAttribute('disabled');
}

function disabledButton() {
  startBtn.setAttribute('disabled', 'disabled');
}

//Styles

const timerEl = document.querySelector('.timer');
const fieldEl = document.querySelectorAll('.field');

timerEl.style.display = 'flex';
timerEl.style.columnGap = '20px';

fieldEl.forEach(element => {
  element.style.display = 'flex';
  element.style.flexDirection = 'column';
  element.style.alignItems = 'center';
  element.style.fontSize = '20px';
  element.firstElementChild.style.backgroundColor = 'blue';
  element.firstElementChild.style.width = '100%';
  element.firstElementChild.style.textAlign = 'center';
  element.lastElementChild.style.backgroundColor = 'yellow';
});
