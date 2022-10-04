import Notiflix from 'notiflix';
const STORAGE_KEY = 'promise-form-state';
const formData = document.querySelector('form');

formData.addEventListener('input', onFormInput);
formData.addEventListener('submit', onFormSubmit);

const formDataInStorage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

function onFormInput(evt) {
  formDataInStorage[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formDataInStorage));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (
    !formDataInStorage.delay ||
    !formDataInStorage.step ||
    !formDataInStorage.amount
  ) {
    return;
  }
  let delayData = Number(formDataInStorage.delay);
  const stepData = Number(formDataInStorage.step);
  const amountData = Number(formDataInStorage.amount);

  console.log(localStorage.getItem(STORAGE_KEY));
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);

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
