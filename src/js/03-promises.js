import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelay = document.querySelector('input[name="delay"]');
const stepDelay = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const createPromisesBtn = document.querySelector('button');

createPromisesBtn.addEventListener('click', onCreateNotify);

function createPromise(position, delay) {
  return new Promise((resoult, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resoult({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onCreateNotify(evt) {
  evt.preventDefault();

  let delay = Number(firstDelay.value);
  let step = Number(stepDelay.value);

  for (let i = 0; i < amount.value; i += 1) {
    createPromise(i+1, delay + i*step).then(({ position, delay }) => {
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
      position: 'right-top',
    });
  })
  .catch(({ position, delay }) => {
    Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
      position: 'right-top',
    });
  }); 
  }
}