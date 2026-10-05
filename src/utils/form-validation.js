// Базовая валидация форм: <form novalidate data-validate> с полями .field > input + .field__error
// Правила — по атрибутам: required, minlength, type="email", type="tel".
// После успешной проверки форма сбрасывается и шлёт событие `form:valid` (detail — данные формы):
// сюда подключается отправка на сервер.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function getError(input) {
  const value = input.value.trim();

  if (input.required && !value) {
    return input.type === 'checkbox' ? 'Необходимо согласие' : 'Заполните поле';
  }
  if (input.type === 'checkbox') return input.required && !input.checked ? 'Необходимо согласие' : '';
  if (!value) return '';

  if (input.minLength > 0 && value.length < input.minLength) {
    return `Минимум ${input.minLength} символов`;
  }
  if (input.type === 'email' && !EMAIL_RE.test(value)) return 'Введите корректный email';
  if (input.type === 'tel' && value.replace(/\D/g, '').length < 10) return 'Введите корректный номер телефона';

  return '';
}

function showError(input, message) {
  const field = input.closest('.field');
  const box = field?.querySelector('.field__error');
  input.classList.toggle('is-invalid', Boolean(message));
  input.setAttribute('aria-invalid', String(Boolean(message)));
  if (box) {
    box.textContent = message;
    box.hidden = !message;
  }
}

function validateInput(input) {
  const message = getError(input);
  showError(input, message);
  return !message;
}

function initForm(form) {
  const inputs = [...form.querySelectorAll('input, textarea')].filter((el) => el.type !== 'submit' && el.type !== 'hidden');
  const success = form.querySelector('.field__success');

  // после первой ошибки перепроверяем на лету, пока пользователь исправляет
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (success) success.hidden = true;
      if (input.classList.contains('is-invalid')) validateInput(input);
    });
    input.addEventListener('blur', () => {
      if (input.value.trim()) validateInput(input);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const invalid = inputs.filter((input) => !validateInput(input));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    form.dispatchEvent(new CustomEvent('form:valid', { bubbles: true, detail: Object.fromEntries(new FormData(form)) }));
    form.reset();
    if (success) success.hidden = false;
  });
}

export function initFormValidation() {
  document.querySelectorAll('form[data-validate]').forEach(initForm);
}
