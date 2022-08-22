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

// search box
function processSearch() {
  const input = document.querySelector('#search');
  const filter = input.value.toLowerCase();
  const listInfo = document.querySelectorAll('.list-info');

  for (i in listInfo) {
    const keyword = document.querySelectorAll('.keyword')[i];
    if (keyword.innerHTML.toLowerCase().indexOf(filter) > -1) {
      listInfo[i].style.display = '';
    } else {
      listInfo[i].style.display = 'none';
    }
  }
}

const input = document.querySelector('#search');
const searchBox = document.querySelector('#search-box');
input.addEventListener('focus', function () {
  searchBox.classList.add('bx-burst');
  input.placeholder = 'Cari berita berdasarkan judul';
});
input.addEventListener('blur', function () {
  searchBox.classList.remove('bx-burst');
  input.placeholder = 'Cari ...';
});
