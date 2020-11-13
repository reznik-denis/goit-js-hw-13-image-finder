import './styles.css';
import debounce from 'lodash.debounce';

import onOpenModal from './js/open-modal.js';
import listImagesTpl from './templates/listImages.hbs';
import ImageApiService from './js/apiService.js';
import { noticeEmptyQuery, noticeNoImages } from './js/notise.js';

const imageApiService = new ImageApiService();

const refs = {
  inputForm: document.querySelector('.form-control'),
  galeryImages: document.querySelector('.gallery'),
  sentinel: document.querySelector('#sentinel'),
  card: document.querySelector('.photo-card'),
};

refs.inputForm.addEventListener('input', debounce(onInputSerch, 1000));
refs.galeryImages.addEventListener('click', onOpenModal);
window.addEventListener('keydown', onKeydownEnter);

function onInputSerch() {
  if (imageApiService.page === 2) {
    return
  } else {
    onSerch();
  };
};

async function onSerch() {
  try {
    imageApiService.query = refs.inputForm.value;
    imageApiService.restPage();
    clearCountysContainer();
    fetchImageslist();
    imageApiService.incrementPage();
  } catch (error) {
    console.log(error);
    console.log('Ваш запит не виконано. Помилка');
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
      // if (images.hits.length < 12) {
      //   loadMoreBtn.hide();
      // } else {
      //   loadMoreBtn.show();
      // }
    });
  } catch (error) {
    console.log(error)
  }
};
  
function clearCountysContainer() {
  refs.galeryImages.innerHTML = '';
};

function noticeOnSearchInput(images) {
  if (imageApiService.query === '') {
      clearCountysContainer();
      // loadMoreBtn.hide();
      return noticeEmptyQuery();
  } else if (images.hits.length === 0) {
    return noticeNoImages();
    }
}

function onKeydownEnter(evt) {
    if (evt.code !== 'Enter') {
        return
    } else {
      evt.preventDefault();
      onSerch();
  };   
};

function onEntry(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && imageApiService.query !== '') {
        imageApiService.fetchImages().then(images => {
          appendImagesMarkup(images);
        });
        imageApiService.incrementPage();
      }
    });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.sentinel);

// код кнопки Load More

// import LoadMoreBtn from './js/load-more-images.js';
// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });

// let targetCoord = 0;

// loadMoreBtn.refs.button.addEventListener('click', loadMoreImages);

// function fetchImagesOnClickLoadMore() {
//   imageApiService.fetchImages().then(images => {
//       noticeOnSearchInput(images)
//       appendImagesMarkup(images);
//       // loadMoreBtn.enable();
//       //   window.scrollTo({
//       //         top: targetCoord,
//       //         left: 0,
//       //         behavior: 'smooth',
//       //       });
//     });
// }

// async function loadMoreImages() {
//   targetCoord = refs.galeryImages.offsetHeight;
//   try {
//     imageApiService.incrementPage();
//     // loadMoreBtn.show();
//     // loadMoreBtn.disable();
//     fetchImagesOnClickLoadMore()
//   } catch (error) {
//     console.log(error);
//   }
  
// };