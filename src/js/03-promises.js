import Notiflix from 'notiflix';
const formData = document.querySelector('form');

formData.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  let delayData = +formData.elements.delay.value;
  const stepData = +formData.elements.step.value;
  const amountData = +formData.elements.amount.value;

  evt.target.reset();

  for (let amount = 0; amount < amountData; amount++)
    createPromise(amount + 1, (delayData += stepData))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

  function createPromise(position, delay) {
    const promise = new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, (delay -= stepData));
    });

    return promise;
  }
}
