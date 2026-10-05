import './header.scss';

export function initHeader() {
  const header = document.querySelector('.header');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

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
