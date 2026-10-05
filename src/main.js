import 'normalize.css';
import './styles/main.scss';
import './components/button/button.scss';
import './components/form/form.scss';
import './components/project-card/project-card.scss';
import './components/slider-nav/slider-nav.scss';
import { initLightbox } from './components/lightbox/lightbox';
import { initFormValidation } from './utils/form-validation';

import { initHeader } from './sections/header/header';
import './sections/hero/hero';
import './sections/about/about';
import './sections/products/products';
import './sections/advantages/advantages';
import './sections/projects/projects';
import './sections/partners/partners';
import './sections/certificates/certificates';
import './sections/cta/cta';
import './sections/footer/footer';

initHeader();
initFormValidation();
initLightbox();
