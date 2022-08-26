// popup update penduduk

const bgPopUp = document.querySelector('#popup');
const popUp = document.querySelector('#popup div');
const updated = document.querySelector('#update-penduduk');
const closeButton = document.querySelector('#close-btn');

updated.addEventListener('click', function () {
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


// popup update agama
const bgPopUpAgama = document.querySelector('#popup-agama');
const popUpAgama = document.querySelector('#popup-agama div');
const updatedAgama = document.querySelector('#update-agama');
const closeButtonAgama = document.querySelector('#close-btnag');

updatedAgama.addEventListener('click', function () {
  bgPopUpAgama.classList.remove('animate__fadeOut', 'hidden');
  popUpAgama.classList.remove('animate__flipOutY');
  bgPopUpAgama.classList.add('flex');
});

closeButtonAgama.addEventListener('click', function () {
  bgPopUpAgama.classList.add('animate__fadeOut', 'animate__slow');
  popUpAgama.classList.add('animate__flipOutY');

  setTimeout(() => {
    bgPopUpAgama.classList.add('hidden');
    bgPopUpAgama.classList.remove('flex');
  }, 700);
});

// popup update etnis
const bgPopUpEtnis = document.querySelector('#popup-etnis');
const popUpEtnis = document.querySelector('#popup-etnis div');
const updatedEtnis = document.querySelector('#update-etnis');
const closeButtonEtnis = document.querySelector('#close-btnet');

updatedEtnis.addEventListener('click', function () {
  bgPopUpEtnis.classList.remove('animate__fadeOut', 'hidden');
  popUpEtnis.classList.remove('animate__flipOutY');
  bgPopUpEtnis.classList.add('flex');
});

closeButtonEtnis.addEventListener('click', function () {
  bgPopUpEtnis.classList.add('animate__fadeOut', 'animate__slow');
  popUpEtnis.classList.add('animate__flipOutY');

  setTimeout(() => {
    bgPopUpEtnis.classList.add('hidden');
    bgPopUpEtnis.classList.remove('flex');
  }, 700);
});


