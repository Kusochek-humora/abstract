import './accordion.scss';

// Аккордеон: <div class="accordion" data-accordion> с .accordion__item > .accordion__trigger + .accordion__panel.
// Открыт один пункт за раз; data-accordion="multiple" разрешает несколько.
export function initAccordion() {
  document.querySelectorAll('[data-accordion]').forEach((root) => {
    const multiple = root.dataset.accordion === 'multiple';
    const items = [...root.querySelectorAll('.accordion__item')];

    const setOpen = (item, open) => {
      item.classList.toggle('is-open', open);
      item.querySelector('.accordion__trigger').setAttribute('aria-expanded', String(open));
    };

    items.forEach((item) => {
      item.querySelector('.accordion__trigger').addEventListener('click', () => {
        const willOpen = !item.classList.contains('is-open');
        if (willOpen && !multiple) items.forEach((other) => other !== item && setOpen(other, false));
        setOpen(item, willOpen);
      });
    });
  });
}
