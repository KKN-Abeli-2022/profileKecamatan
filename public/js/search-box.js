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
