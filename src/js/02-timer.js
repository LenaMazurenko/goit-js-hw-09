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

startBtn.addEventListener('click', () => {
  console.log(convertMs(fp.difference));
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
