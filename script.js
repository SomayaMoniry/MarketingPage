'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

/////////////// Modal Show /////////////
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////// Button Scrolling /////////////

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////// Page Navigation /////////////

// document.querySelectorAll('.nav__link').forEach(el =>
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const h1 = this.getAttribute('href');
//     document.querySelector(h1).scrollIntoView({ behavior: 'smooth' });
//   })
// );

// Event Delegation for Page Navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // guard clause
  if (!clicked) return;
  // remove tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // remove content
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // active tab
  clicked.classList.add('operations__tab--active');

  // active content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// passing "argument " into event handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

///////////////// sticky navigation////////////////
// one way
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// another way (best way)
const header = document.querySelector('.header');

const headerHeight = nav.getBoundingClientRect().height;

const callBack = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(callBack, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});
headerObserver.observe(header);
