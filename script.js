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
