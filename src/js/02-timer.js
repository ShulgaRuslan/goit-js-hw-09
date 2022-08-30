import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
let selectedDate = null;
let intervalID = null;
startBtn.setAttribute('disabled', true);

startBtn.addEventListener('click', startTimer);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate.getTime() <= Date.now()) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-center',
      });
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
});

function startTimer() {
  const delta = selectedDate.getTime() - Date.now();

  intervalID = setInterval(() => {
    const delta = selectedDate.getTime() - Date.now();
    if (delta <= 0) {
        clearInterval(intervalID);
        console.log(intervalID);
      return;
    }

    let refs = convertMs(delta);

    document.querySelector('[data-days]').textContent = addLeadinfZero(
      refs.days
    );
    document.querySelector('[data-hours]').textContent = addLeadinfZero(
      refs.hours
    );
    document.querySelector('[data-minutes]').textContent = addLeadinfZero(
      refs.minutes
    );
    document.querySelector('[data-seconds]').textContent = addLeadinfZero(
      refs.seconds
    );
  }, 1000);
}

function addLeadinfZero(value) {
  return String(value).padStart(2, 0);
}

function convertMs(diff) {
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const seconds = Math.floor(diff / 1000) % 60;
  return { days, hours, minutes, seconds };
}
