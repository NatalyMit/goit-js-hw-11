import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery-images a', {
  captionDelay: 250,
});
const formEl = document.querySelector('.form-search');
const galleryEl = document.querySelector('.gallery-images');
const loaderEl = document.querySelector('.loader');

formEl.addEventListener('submit', handleSearch);

loaderEl.style.display = 'none';

function checkResponse(res) {
  if (!res.ok) {
    throw new Error(res.status);
  }
  return res.json();
}

function fetchGallery(value) {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '41909271-8b5dab2225a1cd5a9757159a5';
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = `${BASE_URL}/?${urlParams}`;
  return fetch(url).then(checkResponse);
}

function handleSearch(event) {
  event.preventDefault();

  loaderEl.style.display = 'inline-block';

  galleryEl.innerHTML = '';

  const form = event.currentTarget;
  const inputValue = form.elements.query.value.trim();
  if (!inputValue) {
    iziToast.show({
      title: '❌',
      messageColor: 'white',
      message: 'Sorry, You have not entered any word.Please try again!',
      position: 'topRight',
      color: 'red',
    });
    loaderEl.style.display = 'none';
    return;
  }

  fetchGallery(inputValue)
    .then(data => {
      const hits = data.hits;

      if (!data.total) {
        iziToast.show({
          title: '❌',
          messageColor: 'white',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          color: 'red',
        });
        return;
      }

      galleryEl.innerHTML = createGallery(hits);
      lightbox.refresh();
    })
    .catch(error => console.log(error))
    .finally(() => {
      form.reset();
      loaderEl.style.display = 'none';
    });
}

function createGallery(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class = "list-item">
    <a href="${largeImageURL}" ><img class="search-image" src = "${webformatURL}" alt = "${tags}" ><div class="options">
    <p class="options-item"> likes:<span class="options-item-span">${likes}</span></p>
    <p class="options-item"> views:<span class="options-item-span">${views}</span></p>
    <p class="options-item"> comments:<span class="options-item-span">${comments}</span></p>
    <p class="options-item"> downloads:<span class="options-item-span">${downloads}</span></p></div>
  
    </a>
    
    </li>`
    )
    .join('');
}
