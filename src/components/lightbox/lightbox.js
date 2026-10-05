import './lightbox.scss';

const CLOSE_ICON =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M4 4L20 20M20 4L4 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

// Просмотр картинки крупно: любой элемент с [data-lightbox] открывает в модалке своё вложенное <img>.
// Используется <dialog>: Esc, фокус и затемнение делает браузер.
export function initLightbox() {
  const triggers = document.querySelectorAll('[data-lightbox]');
  if (!triggers.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Просмотр изображения');
  dialog.innerHTML = `<button class="lightbox__close" type="button" aria-label="Закрыть">${CLOSE_ICON}</button><img class="lightbox__img" alt="" />`;
  document.body.append(dialog);

  const img = dialog.querySelector('.lightbox__img');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const source = trigger.querySelector('img');
      if (!source) return;
      img.src = source.currentSrc || source.src;
      img.alt = source.alt;
      document.documentElement.classList.add('is-locked');
      dialog.showModal();
    });
  });

  // клик по затемнению или крестику — закрыть
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || e.target.closest('.lightbox__close')) dialog.close();
  });
  dialog.addEventListener('close', () => document.documentElement.classList.remove('is-locked'));
}
