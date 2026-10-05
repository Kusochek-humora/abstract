import '../../components/pagination/pagination.scss';
import './catalog.scss';

const form = document.getElementById('filters');
const tagsBox = document.querySelector('.catalog__tags');
const toggle = document.querySelector('.catalog__filters-toggle');
const range = form?.querySelector('.filters__range');

// заливка слайдера до текущего значения
const paintRange = () => {
  if (!range) return;
  const percent = ((range.value - range.min) / (range.max - range.min)) * 100;
  range.style.setProperty('--p', `${percent}%`);
};

// выбранные фильтры → плашки-теги над сеткой
const renderTags = () => {
  if (!form || !tagsBox) return;
  tagsBox.replaceChildren();

  const addTag = (text, onRemove) => {
    const li = document.createElement('li');
    li.className = 'catalog__tag';
    li.append(text);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'catalog__tag-remove';
    btn.setAttribute('aria-label', `Убрать фильтр «${text}»`);
    btn.innerHTML =
      '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 2L10 10M10 2L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    btn.addEventListener('click', () => {
      onRemove();
      renderTags();
    });
    li.append(btn);
    tagsBox.append(li);
  };

  form.querySelectorAll('.check__input:checked').forEach((input) => {
    const text = input.closest('.check').querySelector('.check__text').textContent.trim();
    addTag(text, () => {
      input.checked = false;
    });
  });

  if (range && Number(range.value) > Number(range.min)) {
    addTag(`Размер: от ${range.value}`, () => {
      range.value = range.min;
      paintRange();
    });
  }
};

if (form) {
  paintRange();
  range?.addEventListener('input', paintRange);

  // «Удалить» в группе сбрасывает только её
  form.querySelectorAll('[data-reset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-group]');
      group.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((el) => {
        el.checked = false;
      });
      const groupRange = group.querySelector('input[type="range"]');
      if (groupRange) groupRange.value = groupRange.min;
      paintRange();
      renderTags();
    });
  });

  // «Удалить все»
  form.addEventListener('reset', () => {
    // состояние формы сбрасывается после события — ждём тик
    setTimeout(() => {
      paintRange();
      renderTags();
    });
  });

  // категории: одна активная
  form.querySelectorAll('.filters__cat').forEach((btn) => {
    btn.addEventListener('click', () => {
      form.querySelectorAll('.filters__cat').forEach((el) => el.classList.toggle('is-active', el === btn));
    });
  });

  // «Применить»: обновляет теги; сюда же подключается запрос/фильтрация товаров
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    renderTags();
    form.dispatchEvent(new CustomEvent('catalog:apply', { bubbles: true, detail: Object.fromEntries(new FormData(form)) }));
    form.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
}

// на мобильных фильтры сворачиваются
toggle?.addEventListener('click', () => {
  const open = form.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
});
