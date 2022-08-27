window.onscroll = function () {
  const header = document.querySelector('nav');
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add('navbar-fixed');
  } else {
    header.classList.remove('navbar-fixed');
  }
};

const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('hamburger-active');
  navMenu.classList.toggle('nav-display');
});

const swiper = new Swiper('.swiper', {
  speed: 400,
  autoplay: {
    delay: 3000,
  },

  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const checkPassword = () => {
  const password = document.querySelector("input[name='password']");
  const confirmPassword = document.querySelector("input[name='confirmPassword']");
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords Don't Match");
  } else {
    confirmPassword.setCustomValidity('');
  }
};

const dropdown = document.querySelector('#dropdown');

const showButton = () => {
  dropdown.classList.toggle('show');
};

// list layanan
const listLayanan = document.querySelectorAll('.list-layanan');
for (const item of listLayanan) {
  item.addEventListener('click', function () {
    box = this.querySelector('div:last-child');
    button = this.querySelector('div > button > i');

    box.classList.toggle('scale-y-0');
    box.classList.toggle('scale-y-100');
    button.classList.toggle('fa-plus');
    button.classList.toggle('fa-minus');
    box.classList.toggle('hidden');
  });
}
