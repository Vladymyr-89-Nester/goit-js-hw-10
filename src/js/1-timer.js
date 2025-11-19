import flatpickr from 'flatpickr';
import iziToast from "izitoast";
import iconMessage from '../public/group.svg'

const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

let userSelectedDate = null;

let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const chosenDate = selectedDates[0];
        const nowDate = Date.now();

        if (chosenDate.getTime() <= nowDate) {
            refs.startBtn.disabled = true;
            return iziToast.error({
                message: 'Please choose a date in the future',
                timeout: 7000,
                iconUrl: iconMessage,
                backgroundColor: '#ef4040',
                messageColor: '#FFFFFF',
                position: "topRight",
            });
        }

        userSelectedDate = chosenDate;

        refs.startBtn.disabled = false;
    },
};


flatpickr(refs.inputDate, options);

function startTimer(event) {
    refs.inputDate.disabled = true;
    refs.startBtn.disabled = true;

    clearInterval(timerId);

    timerId = setInterval(() => {
        const startDate = Date.now();
        const endDate = userSelectedDate.getTime();
        const differenceValues = endDate - startDate;

        if (differenceValues <= 0) {
            clearInterval(timerId);

            changeValues({ days: 0, hours: 0, minutes: 0, seconds: 0 });

            refs.inputDate.disabled = false;
            refs.startBtn.disabled = true;
            return;
        }
        changeValues(convertMs(differenceValues));
    }, 1000)
};

refs.startBtn.addEventListener('click', startTimer);

function changeValues({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days)
    refs.hours.textContent = addLeadingZero(hours)
    refs.minutes.textContent = addLeadingZero(minutes)
    refs.seconds.textContent = addLeadingZero(seconds)
};

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
};

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
};
