const body = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop');
buttonStop.disabled = true;
let timer = null;

buttonStart.addEventListener('click', () => {
  timer = setInterval(() => {
    body.style.backgroundColor = `#${Math.floor(
      Math.random() * 16777215
    ).toString(16)}`;
  }, 1000);
  buttonStart.disabled = true;
  buttonStop.disabled = false;
});

buttonStop.addEventListener('click', () => {
  clearInterval(timer);
  buttonStart.disabled = false;
  buttonStop.disabled = true;
});
