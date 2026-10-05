import Swiper from 'swiper';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './product.scss';

// простая карусель с плавной сменой кадров (fade)
new Swiper('.product__slider', {
  modules: [EffectFade, Pagination, Autoplay],
  effect: 'fade',
  fadeEffect: { crossFade: true },
  speed: 600,
  loop: true,
  autoplay: { delay: 5000, disableOnInteraction: true },
  pagination: { el: '.product__dots', clickable: true },
});
