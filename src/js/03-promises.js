import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
};

const notiflix = {
  // timeout: 2800,
  useIcon: false,
};
 
refs.form.addEventListener('submit', (e) =>{
  e.preventDefault();
let {delay, step, amount} = readingData();
  
  for (let position = 1; position <= amount; position += 1) {
  createPromise(position, delay)
  .then(({position, delay}) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, notiflix);
  })
  .catch(({position, delay}) =>{
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, notiflix);
  });
  delay = delay + step;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(()=>{
      if (shouldResolve) {
        resolve({position: position, delay: delay});
      } else {
        reject({position: position, delay: delay});
      }
    }, delay)
  })
}

function readingData(){
  return {
    delay: Number(refs.inputDelay.value), 
    step: Number(refs.inputStep.value), 
    amount: Number(refs.inputAmount.value),
  };
};
