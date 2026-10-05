import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import './certificates.scss';

new Swiper('.certs__slider', {
  modules: [Navigation, Pagination],
  slidesPerView: 'auto', // ширина слайда задаётся в CSS
  spaceBetween: 10,
  navigation: {
    prevEl: '.certs .slider-arrow--prev',
    nextEl: '.certs .slider-arrow--next',
  },
  pagination: {
    el: '.certs__dots',
    clickable: true,
  },
});
