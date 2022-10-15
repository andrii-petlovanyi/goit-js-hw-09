import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('input[type="text"]'),
  timer: document.querySelector('.timer'),
  btnStart: document.querySelector('[data-start]'),
};
const CHANGE_DELAY = 1000;

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentTime = Date.now();
    let deltaTime = selectedDates[0] - currentTime;
    let intervalId = null;
    if (deltaTime < 0) {
      refs.btnStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
    }

    function runReverseTimer() {
      refs.btnStart.disabled = true;
      refs.input.disabled = true;
      getDate(selectedDates);
      intervalId = setInterval(() => {
        getDate(selectedDates);
      }, CHANGE_DELAY);
    }

    refs.btnStart.addEventListener('click', runReverseTimer);
  },
};

function getDate(selectedDates) {
  currentTime = Date.now();
  deltaTime = selectedDates[0] - currentTime;

  if (deltaTime < 1000) {
    clearInterval(intervalId);
  }

  updateDataTimeOnPage(deltaTime);
}

function updateDataTimeOnPage(deltaTime) {
  let dateOutputRefs = refs.timer.querySelectorAll('.value');

  dateOutputRefs.forEach(
    (elRef, index) =>
      (elRef.textContent = Object.values(convertMs(deltaTime))[index])
  );
}

const fp = flatpickr(refs.input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
