const bgPopUp = document.querySelector('#popup');
const popUp = document.querySelector('#popup div');
const forgotPassword = document.querySelector('#forgot-password');
const closeButton = document.querySelector('#close-btn');

forgotPassword.addEventListener('click', function () {
  bgPopUp.classList.remove('animate__fadeOut', 'hidden');
  popUp.classList.remove('animate__flipOutY');
  bgPopUp.classList.add('flex');
});

closeButton.addEventListener('click', function () {
  bgPopUp.classList.add('animate__fadeOut', 'animate__slow');
  popUp.classList.add('animate__flipOutY');

  setTimeout(() => {
    bgPopUp.classList.add('hidden');
    bgPopUp.classList.remove('flex');
  }, 700);
});
