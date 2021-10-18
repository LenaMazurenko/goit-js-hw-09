import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
let selectedDate = 0;
let timerId = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates && selectedDates[0] - currentDate > 0) {
      selectedDate = selectedDates[0].getTime();
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
      //alert('Please choose a date in the future');
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    const currentDate = Date.now();
    const deltaDates = selectedDate - currentDate;
    const param = convertMs(deltaDates);
    outputTimeLeft(param);
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
  //return value < 10 ? '0' + value : value;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  if (ms <= 0) {
    clearInterval(timerId);
    Notify.info('Finish)');
    ms = 0;
  }
  const days = addLeadingZero(Math.floor(ms / day)); // Remaining days
  const hours = addLeadingZero(Math.floor((ms % day) / hour)); // Remaining hours
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute)); // Remaining minutes
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second)); // Remaining seconds

  return { days, hours, minutes, seconds };
}

function outputTimeLeft({ days, hours, minutes, seconds }) {
  document.querySelector('span[data-days]').textContent = days;
  document.querySelector('span[data-hours]').textContent = hours;
  document.querySelector('span[data-minutes]').textContent = minutes;
  document.querySelector('span[data-seconds]').textContent = seconds;
}
