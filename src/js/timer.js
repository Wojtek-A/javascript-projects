import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const calendar = document.querySelector('#datetime-picker');
const button = document.querySelector('button');
button.disabled = true;

const currentDate = new Date();
let date = null;

flatpickr(calendar, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate >= currentDate) {
      button.disabled = false;
      date = selectedDate;
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
});

button.addEventListener('click', () => {
  button.disabled = true;

  const dateIntreval = setInterval(() => {
    const todayDate = new Date();
    let ms = 0;

    function checkCorrectDate() {
      if (date > todayDate) {
        return (ms = Math.abs(date - todayDate));
      } else ms = 0;
      Notify.failure('Please choose a date in the future');
    }
    checkCorrectDate();

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    function addLeadingZero(value) {
      if (value <= 9) {
        return String(value).padStart(2, '0');
      } else return value;
    }

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);

    if (ms < 1000) {
      clearInterval(dateIntreval);
      button.disabled = false;
    }
  }, 1000);
});
