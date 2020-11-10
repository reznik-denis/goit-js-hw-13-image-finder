import './styles.css';
import debounce from 'lodash.debounce';


import onOpenModal from './js/open-modal.js';
import LoadMoreBtn from './js/load-more-images.js';
import listImagesTpl from './templates/listImages.hbs';
import ImageApiService from './js/apiService.js';
import { noticeEmptyQuery, noticeNoImages } from './js/notise.js';

const imageApiService = new ImageApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

let targetCoord = 0;

const refs = {
  inputForm: document.querySelector('.form-control'),
  galeryImages: document.querySelector('.gallery'),
};

refs.inputForm.addEventListener('input', debounce(onInputSerch, 1000));
loadMoreBtn.refs.button.addEventListener('click', loadMoreImages);
refs.galeryImages.addEventListener('click', onOpenModal);

async function onInputSerch(e) {
  e.preventDefault();
  try {
    imageApiService.query = refs.inputForm.value;
    imageApiService.restPage();
    clearCountysContainer();
    fetchImageslist();
    loadMoreBtn.show();
  } catch (error) {
    console.log(error);
    console.log('Ваш запит не виконано. Помилка');
  }
};



async function loadMoreImages() {
  targetCoord = refs.galeryImages.offsetHeight;
  try {
    imageApiService.incrementPage();
    loadMoreBtn.show();
    loadMoreBtn.disable();
    fetchImagesOnClickLoadMore()
  } catch (error) {
    console.log(error);
  }
  
};

function appendImagesMarkup(listImages) {
  refs.galeryImages.insertAdjacentHTML('beforeend', listImagesTpl(listImages));
};

async function fetchImageslist() {
  try {
    imageApiService.fetchImages().then(images => {
    noticeOnSearchInput(images);
    appendImagesMarkup(images);
  });
  } catch (error) {
    console.log(error)
  }
};

function fetchImagesOnClickLoadMore() {
  imageApiService.fetchImages().then(images => {
      noticeOnSearchInput(images)
      appendImagesMarkup(images);
      loadMoreBtn.enable();
        window.scrollTo({
              top: targetCoord,
              left: 0,
              behavior: 'smooth',
            });
    });
}
  
function clearCountysContainer() {
  refs.galeryImages.innerHTML = '';
};

function noticeOnSearchInput(images) {
  if (imageApiService.query === '') {
      clearCountysContainer();
      loadMoreBtn.hide();
      return noticeEmptyQuery();
  } else if (images.hits.length === 0) {
    return noticeNoImages();
    }
}

