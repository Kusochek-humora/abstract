// Общее для всех страниц: базовые стили, компоненты, шапка, футер, форма заявки
import 'normalize.css';
import './styles/main.scss';
import './components/button/button.scss';
import './components/form/form.scss';
import './components/breadcrumbs/breadcrumbs.scss';
import { initLightbox } from './components/lightbox/lightbox';
import { initFormValidation } from './utils/form-validation';

import { initHeader } from './sections/header/header';
import './sections/page-hero/page-hero';
import './sections/cta/cta';
import './sections/footer/footer';

initHeader();
initFormValidation();
initLightbox();
