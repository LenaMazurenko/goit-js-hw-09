import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  difference: 0,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    const currentDate = new Date();
    if (selectedDates && selectedDates[0] - currentDate > 0) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
      alert('Please choose a date in the future');
    }
  },
  onClose(selectedDates) {
    const currentDate = new Date();
    this.difference = selectedDates[0] - currentDate;
  },
};

const fp = flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', setInterval(outputTimeLeft(convertMs(fp.difference)), 1000));

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day); // Remaining days
  const hours = Math.floor((ms % day) / hour); // Remaining hours
  const minutes = Math.floor(((ms % day) % hour) / minute); // Remaining minutes
  const seconds = Math.floor((((ms % day) % hour) % minute) / second); // Remaining seconds

  return { days, hours, minutes, seconds };
}

function outputTimeLeft({ days, hours, minutes, seconds }) {
  document.querySelector('span[data-days]').textContent = addLeadingZero(days);
  document.querySelector('span[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('span[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('span[data-seconds]').textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  //return value.padStart(2, '0');
  return value < 10 ? '0' + value : value;
}
