import validator from 'validator';

const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

// Завантаження збережених даних
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  formData = JSON.parse(savedData);
  emailInput.value = formData.email;
  messageInput.value = formData.message;
}

// Делегування події input
form.addEventListener('input', e => {
  if (e.target.name in formData) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// Делегування події submit
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }
  if (!validator.isEmail(formData.email.trim())) {
    alert('Please enter a valid email');
    return;
  }
  console.log(formData);
  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});
