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

startBtn.setAttribute('disabled', 'disabled');

startBtn.addEventListener('click', onStartTimerBtn);

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
      startBtn.setAttribute('disabled', 'disabled');
      return;
    }

    startBtn.removeAttribute('disabled');
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
      startBtn.setAttribute('disabled', 'disabled');
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
