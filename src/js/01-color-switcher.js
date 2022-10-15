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

refs.btnStart.addEventListener('click', colorSwitchStart);
refs.btnStop.addEventListener('click', colorSwitchStop);

if (lastColor) {
  document.body.style.backgroundColor = lastColor;
}

function colorSwitchStart() {
  refs.btnStop.disabled = false;
  refs.btnStart.disabled = true;
  setColor();
  timerId = setInterval(() => {
    setColor();
  }, COLOR_CHANGE_DELAY);
}

function colorSwitchStop() {
  clearInterval(timerId);
  refs.btnStop.disabled = true;
  refs.btnStart.disabled = false;
}

function setColor() {
  let color = getRandomHexColor();
  document.body.style.backgroundColor = color;
  localStorage.setItem(STORAGE_KEY, color);
}
