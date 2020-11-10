import './styles.css';
import debounce from 'lodash.debounce';



// import listTpl from './templates/list.hbs';
import listImagesTpl from './templates/listImages.hbs';
import ImageApiService from './js/apiService.js';
// import { noticeManyMatces, noticeValidMatces } from './js/notise.js';

const imageApiService = new ImageApiService();

let targetCoord = 0;

const refs = {
  inputForm: document.querySelector('.form-control'),
  galeryImages: document.querySelector('.gallery'),
  btn: document.querySelector('.btn-load-more'),
};
// btnStatus(true);
refs.inputForm.addEventListener('input', debounce(onInputSerch, 1000));

function onInputSerch() {
  imageApiService.query = refs.inputForm.value;

  clearCountysContainer();
  // btnStatus(false);
  return fetchImageslist();
};

refs.btn.addEventListener('click', loadMoreImages);

function loadMoreImages() {
  targetCoord = refs.galeryImages.offsetHeight;
  console.log(targetCoord)
  imageApiService.incrementPage();
  window.scrollTo({
    top: targetCoord,
    left: 0,
    behavior: 'smooth',
  });
  return fetchImageslist();
};

function appendImagesMarkup(listImages) {
  refs.galeryImages.insertAdjacentHTML('beforeend', listImagesTpl(listImages));
};

function fetchImageslist() {
  imageApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
  });
};
  
function clearCountysContainer() {
  refs.galeryImages.innerHTML = '';
};

// function btnStatus(status) {
//   refs.btn.disabled = status;
// }
// function clearValueInput() {
//   refs.inputForm.value = '';
// }