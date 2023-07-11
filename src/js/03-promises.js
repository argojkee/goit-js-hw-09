import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputCount = document.querySelector('[name="amount"]');
const createPromisesBtn = document.querySelector('[type="submit"]');

createPromisesBtn.setAttribute('disabled', 'disabled');

formEl.addEventListener('input', checkValidate);
createPromisesBtn.addEventListener('click', e => {
  e.preventDefault();
  const selectedDelay = Number(inputDelay.value);
  const selectedStep = Number(inputStep.value);
  const selectedPromisesCount = Number(inputCount.value);
  onButtonClick(selectedDelay, selectedStep, selectedPromisesCount);
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function onButtonClick(delay, step, promisesCount) {
  let currentPosition = 1;
  let currentDelay = delay;
  for (let i = 0; i < promisesCount; i += 1) {
    setTimeout(() => {
      createPromise(currentPosition, currentDelay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      currentDelay += step;
      currentPosition += 1;
    }, delay);

    delay += step;
  }
}

function checkValidate() {
  if (
    Number(inputDelay.value) >= 0 &&
    Number(inputStep.value) >= 0 &&
    Number(inputCount.value) >= 0 &&
    inputDelay.value !== '' &&
    inputStep.value !== '' &&
    inputCount.value !== ''
  ) {
    createPromisesBtn.removeAttribute('disabled');
  } else {
    createPromisesBtn.setAttribute('disabled', 'disabled');
  }
}
