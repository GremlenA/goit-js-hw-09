const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: ''
};

const form = document.querySelector('.feedback-form');

// Відновлює дані з localStorage при завантаженні сторінки
function restoreFormState() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);

    if (parsedData.email) {
      form.elements.email.value = parsedData.email;
      formData.email = parsedData.email;
    }

    if (parsedData.message) {
      form.elements.message.value = parsedData.message;
      formData.message = parsedData.message;
    }
  } catch (error) {
    console.error('Помилка при читанні з localStorage:', error);
  }
}

// Оновлює formData і зберігає в localStorage при вводі
function handleInput(event) {
  const { name, value } = event.target;

  if (name === 'email' || name === 'message') {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
}

// Обробка submit з перевіркою і очищенням
function handleSubmit(event) {
  event.preventDefault();

  // ОНОВЛЮЄМО formData прямо перед перевіркою
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  // Все заповнено — виводимо об'єкт
  console.log('Form submitted:', { ...formData });

  // Очищаємо форму, локальне сховище і formData
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData.email = '';
  formData.message = '';
}

// Додаємо обробники
form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);

// Відновлення стану при завантаженні
restoreFormState();
