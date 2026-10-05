import './header.scss';

export function initHeader() {
  const header = document.querySelector('.header');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // текущая страница в меню — по имени файла (путь может содержать /репо/); body[data-nav] — раздел для вложенных страниц
  const pageName = (path) => path.split('/').pop().replace(/\.html$/, '') || 'index';
  const current = pageName(document.body.dataset.nav || location.pathname);
  document.querySelectorAll('.menu__link').forEach((link) => {
    const active = pageName(new URL(link.href).pathname) === current;
    link.classList.toggle('menu__link--active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  const menu = document.getElementById('menu');
  const openBtn = document.querySelector('[data-menu-open]');
  if (!menu || !openBtn) return;

  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    openBtn.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('is-locked', open);
    (open ? menu.querySelector('.menu__close') : openBtn).focus();
  };

  openBtn.addEventListener('click', () => setOpen(true));
  menu.querySelectorAll('[data-menu-close], a').forEach((el) => el.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
  });
}
