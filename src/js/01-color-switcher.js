const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
const COLOR_CHANGE_DELAY = 1000;
const STORAGE_KEY = 'last-color';
const lastColor = localStorage.getItem(STORAGE_KEY);
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.btnStart.classList.add('timer-btn');
refs.btnStop.classList.add('timer-btn');

refs.btnStart.addEventListener('click', onClickStart);
refs.btnStop.addEventListener('click', onClickStop);

if (lastColor) {
  document.body.style.backgroundColor = lastColor;
}

function onClickStart() {
  refs.btnStop.disabled = false;
  refs.btnStart.disabled = true;

  timerId = setInterval(() => {
    let color = getRandomHexColor();
    document.body.style.backgroundColor = color;
    localStorage.setItem(STORAGE_KEY, color);
  }, COLOR_CHANGE_DELAY);
}

function onClickStop() {
  clearInterval(timerId);
  refs.btnStop.disabled = true;
  refs.btnStart.disabled = false;
}
