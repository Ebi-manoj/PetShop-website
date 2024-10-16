'use strict';
///////////////////////////////////////////////////

const modalBtn = document.querySelectorAll('.btn-open-modal');
const modalWindow = document.querySelector('.window');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn-close-modal');
const nav = document.querySelector('.navbar');

////////////////////////////////////////////////////

// modal window.......

const openModal = function () {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

modalBtn.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden'))
    closeModal();
});

// creating sticky navbar

const header = document.querySelector('#header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const sticky = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// reveal section slowly

const allSections = document.querySelectorAll('.section');

const reveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section-hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.18,
});

allSections.forEach(function (sec) {
  sectionObserver.observe(sec);
  sec.classList.add('section-hidden');
});

// lazy image loading....

const images = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  });
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `${200}px`,
});

images.forEach(img => imageObserver.observe(img));

// slider creating...

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const sliderContainer = document.querySelector('#slides');
const slides = document.querySelectorAll('.slide');
let slideWidth = slides[0].getBoundingClientRect().width;
let visibleSlide = window.innerWidth <= 768 ? 1 : 5;
let maxSlide = slides.length - visibleSlide;

let curSlide = 0;

const updateSlider = function () {
  slideWidth = slides[0].getBoundingClientRect().width;
  visibleSlide = window.innerWidth <= 768 ? 1 : 5;
  maxSlide = slides.length - visibleSlide;
  goToSlide(curSlide);
};

const goToSlide = function (slideNo) {
  const translateXValue = slideNo * slideWidth;
  slides.forEach(s => {
    s.style.transform = `translateX(-${translateXValue}px)`;
  });
};

const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

window.addEventListener('resize', updateSlider);

// setting arrow key functionality
let isVisible = false;

document.addEventListener('keydown', function (e) {
  if (!isVisible) return;
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
});

const slideVisible = function (entries) {
  const [entry] = entries;
  isVisible = entry.isIntersecting;
};

const sliderObserver = new IntersectionObserver(slideVisible, {
  root: null,
  threshold: 0.1,
});

sliderObserver.observe(sliderContainer);
