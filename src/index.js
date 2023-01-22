import './css/styles.css';
import Notiflix from 'notiflix';
import PhotoApi from './photo-api';

const refs = {
  form: document.querySelector('.search-form'),
  loadMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

disableLoadMoreBtn();

const photoApi = new PhotoApi();

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

async function onSearch(evt) {
  evt.preventDefault();
  photoApi.query = evt.currentTarget.elements.searchQuery.value.trim();
  photoApi.resetPage();
  clearHTML();
  disableLoadMoreBtn();

  try {
    await photoApi.fetchPhoto().then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      createPhotoMarkup(data.hits);
      enableLoadMoreBtn();
      console.log(data);
    });
  } catch (err) {
    console.log(err);
  }
}

async function onLoadMore() {
  try {
    await photoApi.fetchPhoto().then(data => {
      const pages = Math.round(data.totalHits / photoApi.perPage);
      const page = photoApi.page - 1;
      if (page === pages) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        disableLoadMoreBtn();
        return;
      }

      createPhotoMarkup(data.hits);
    });
  } catch (err) {
    console.log(err);
  }
}

async function createPhotoMarkup(photos) {
  try {
    const photoMarkup = await photos.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
         <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo" />
         <div class="info">
           <p class="info-item">
             <b>Likes</b>
             <span>${likes}</span> 
           </p>
           <p class="info-item">
             <b>Views</b>
             <span>${views}</span>
           </p>
           <p class="info-item">
             <b>Comments</b>
             <span> ${comments}</span> 
           </p>
           <p class="info-item">
             <b>Downloads</b>
             <span>${downloads}</span> 
           </p>
         </div>
      </div>`
    );
    refs.gallery.insertAdjacentHTML('beforeend', photoMarkup.join(''));
  } catch (err) {
    console.log(err);
  }
}

function clearHTML() {
  refs.gallery.innerHTML = '';
}

function disableLoadMoreBtn() {
  refs.loadMore.hidden = true;
}

function enableLoadMoreBtn() {
  refs.loadMore.hidden = false;
}
