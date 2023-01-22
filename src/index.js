import './css/styles.css';
import Notiflix from 'notiflix';
import PhotoApi from './photo-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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

      if (photoApi.page > pages) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        disableLoadMoreBtn();
        return;
      }

      createPhotoMarkup(data.hits);
      let gallery = new SimpleLightbox('.gallery a');
      gallery.refresh();
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
      }) => `<div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}">
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
        </a>
      </div>`
    );
    refs.gallery.insertAdjacentHTML('beforeend', photoMarkup.join(''));

    let gallery = new SimpleLightbox('.gallery a');
    gallery.on('show.simplelightbox');
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
