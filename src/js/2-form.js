const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: ''
};

const form = document.querySelector('.feedback-form');


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


function handleInput(event) {
  const { name, value } = event.target;

  if (name === 'email' || name === 'message') {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
}


function handleSubmit(event) {
  event.preventDefault();

 
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

 
  console.log('Form submitted:', { ...formData });


  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData.email = '';
  formData.message = '';
}


form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);


restoreFormState();
