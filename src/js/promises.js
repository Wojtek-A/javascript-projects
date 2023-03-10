import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelayInput = document.querySelector('input[name="delay"]');
const delayStepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const button = document.querySelector('button');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const promisesHandler = event => {
  event.preventDefault();

  let delay = firstDelayInput.valueAsNumber;
  const delayStepValue = delayStepInput.valueAsNumber;
  const amountValue = amountInput.valueAsNumber;

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${i} in ${delay}ms `);
        Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms `, {
          useIcon: false,
        });
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${i} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`, {
          useIcon: false,
        });
      });
    delay += delayStepValue;
  }
  button.disabled = true;
  setTimeout(function () {
    button.disabled = false;
  }, delay);
};

button.addEventListener('click', promisesHandler);
