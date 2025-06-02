// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо посилання на елементи DOM
const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let userSelectedDate = null; // Змінна для зберігання обраної користувачем дати
let countdownInterval = null; // Змінна для зберігання інтервалу таймера

// Функція для додавання "0" на початок числа, якщо воно менше двох символів
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція для конвертації мілісекунд у дні, години, хвилини та секунди
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

// Параметри для flatpickr
const options = {
  enableTime: true, // Дозволяє вибір часу
  time_24hr: true, // 24-годинний формат часу
  defaultDate: new Date(), // Початкова дата за замовчуванням
  minuteIncrement: 1, // Крок для хвилин
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; // Зберігаємо обрану дату

    // Перевіряємо, чи обрана дата в минулому
    if (userSelectedDate < new Date()) {
      iziToast.error({
        message: `<span class="error-icon">
                    <img src="./img/error-icon.svg" width="24" height="24" alt="error" />
                  </span>
                Please choose a date in the future`,
        position: 'topRight',
        class: 'custom-izitoast',
        close: false,
        timeout: 3000,
      });
      startButton.disabled = true; // Деактивуємо кнопку "Start"
    } else {
      startButton.disabled = false; // Активуємо кнопку "Start"
    }
  },
};

// Ініціалізація flatpickr
flatpickr(datetimePicker, options);

// Обробник події для кнопки "Start"
startButton.addEventListener('click', () => {
  // Деактивуємо кнопку "Start" та поле вибору дати
  startButton.disabled = true;
  datetimePicker.disabled = true;

  // Запускаємо інтервал оновлення таймера кожну секунду
  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const msRemaining = userSelectedDate.getTime() - currentTime.getTime();

    // Якщо час вийшов, зупиняємо таймер
    if (msRemaining <= 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
        position: 'topRight',
        close: false,
        timeout: 3000,
      });
      datetimePicker.disabled = false; // Активуємо поле вибору дати
      // Оновлюємо інтерфейс, щоб показати 00:00:00:00
      daysValue.textContent = '00';
      hoursValue.textContent = '00';
      minutesValue.textContent = '00';
      secondsValue.textContent = '00';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(msRemaining);

    // Оновлюємо інтерфейс
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }, 1000); // Оновлюємо кожну секунду (1000 мс)
});

// При першому завантаженні сторінки кнопка "Start" має бути неактивною
startButton.disabled = true;

// Когда счетчик активен:
datetimePicker.classList.add('active-timer');

// Когда счетчик неактивен:
datetimePicker.classList.remove('active-timer');
