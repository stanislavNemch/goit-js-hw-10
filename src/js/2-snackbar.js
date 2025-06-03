// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо посилання на форму
const form = document.querySelector('.form');

// Функція для створення промісу
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); // Виконуємо проміс зі значенням затримки
      } else {
        reject(delay); // Відхиляємо проміс зі значенням затримки
      }
    }, delay);
  });
}

// Обробник події submit форми
form.addEventListener('submit', event => {
  event.preventDefault(); // Запобігаємо стандартній відправці форми

  const delayInput = form.elements.delay; // Отримуємо поле вводу затримки
  const stateInput = form.elements.state; // Отримуємо радіокнопки стану

  const delay = Number(delayInput.value); // Перетворюємо значення затримки на число
  const state = stateInput.value; // Отримуємо обраний стан (fulfilled або rejected)

  form.reset(); // Очищаємо форму

  // Створюємо проміс
  createPromise(delay, state)
    .then(result => {
      // Обробка успішного виконання промісу
      iziToast.success({
        // title: 'Ok',
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topRight', // Позиція сповіщення
        progressBar: false, // Вимикаємо індикатор прогресу
        icon: false, // Вимикаємо іконку
        close: false,
        // timeout: 3000, // Час відображення сповіщення
      });
    })
    .catch(error => {
      // Обробка відхилення промісу
      iziToast.error({
        // title: 'Not Ok',
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight', // Позиція сповіщення
        progressBar: false, // Вимикаємо індикатор прогресу
        icon: false, // Вимикаємо іконку
        close: false,
        // timeout: 3000, // Час відображення сповіщення
      });
    });
});
