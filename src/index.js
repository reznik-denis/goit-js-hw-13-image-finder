import './styles.css';
import debounce from 'lodash.debounce';



// import listTpl from './templates/list.hbs';
import listImagesTpl from './templates/listImages.hbs';
import ImageApiService from './js/apiService.js';
// import { noticeManyMatces, noticeValidMatces } from './js/notise.js';

const imageApiService = new ImageApiService();

const refs = {
    inputForm: document.querySelector('.form-control'),
    galeryImages: document.querySelector('.gallery'),
}

refs.inputForm.addEventListener('input', debounce(onInputSerch, 1000));


function onInputSerch() {

  imageApiService.query = refs.inputForm.value;
  // clearCountysContainer();
  return fetchImages();
}

// function dataLengthIf(data) {
//   if (data.length >= 2 && data.length <= 10) {
//       clearValueInput();
//       return appendListMarkup(data);
//     } else if (data.length > 10) {
//       clearValueInput();
//       return noticeManyMatces();
//     }
//     else if (data.status === 404) {
//       clearValueInput();
//       return noticeValidMatces();
//     }
//     else {
//       clearValueInput();
//       return appendCountryMarkup(data);
//     };
    
// }

function appendImagesMarkup(listImages) {
  refs.galeryImages.insertAdjacentHTML('beforeend', listImagesTpl(listImages));
}

function fetchImageslist() {
  imageApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
  });
};
  


// function appendListMarkup(countrys) {
//   refs.countyConteiner.insertAdjacentHTML('beforeend', listTpl(countrys));
// }

// function clearCountysContainer() {
//   refs.countyConteiner.innerHTML = '';
// }

// function clearValueInput() {
//   refs.inputForm.value = '';
// }