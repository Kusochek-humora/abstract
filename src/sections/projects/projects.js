import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import './projects.scss';

new Swiper('.projects__slider', {
  modules: [Navigation],
  slidesPerView: 'auto', // ширина слайда задаётся в CSS
  spaceBetween: 10,
  navigation: {
    prevEl: '.projects .slider-arrow--prev',
    nextEl: '.projects .slider-arrow--next',
  },
});
