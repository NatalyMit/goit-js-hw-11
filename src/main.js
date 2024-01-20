import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.form-seach');
const galleryEl = document.querySelector('.gallery-images');

const API_KEY = '41909271-8b5dab2225a1cd5a9757159a5';

function checkResponse(res) {
  if (!res.ok) {
    throw new Error(res.status);
  }
  return res.json();
}

function fetchGallery(images) {
  return fetch(
    'https://pixabay.com/api/?key=' +
      API_KEY +
      '&q=' +
      images +
      '&image_type=photo&orientation=horizontal&safesearch=true'
  ).then(checkResponse);
}
formEl.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const inputValue = form.elements.query.value;
  if (!inputValue) {
    iziToast.show({
      title: 'error',
      messageColor: 'white',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topCenter',
      color: 'red',
    });
    return;
  }

  console.log(inputValue);

  fetchGallery(inputValue)
    .then(data => {
      //   console.log(data);
      const hits = data.hits;
      //   console.log(hits);

      let markup = '';
      for (const hit of hits) {
        // console.log(hit);
        markup += createGallery(hit);
      }

      galleryEl.innerHTML = markup;

      console.log(markup);
    })
    .catch(onFetchError)
    .finally(() => form.reset());
}

function createGallery({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class = "list-item">
    <a href="${largeImageURL}" ><img class="search-image" src = "${webformatURL}" alt = "${tags}" >
    <p class="options"> likes:${likes}</p>
    <p class="options"> views:${views}</p>
    <p class="options"> comments:${comments}</p>
    <p class="options"> downloads:${downloads}</p>
    </a>
    
    </li>`;
}

function onFetchError(error) {
  console.error();
  if (hits === []) {
    iziToast.show({
      title: 'error',
      messageColor: 'white',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topCenter',
      color: 'red',
    });
    return;
  }
}

const lightbox = new SimpleLightbox('.gallery-images a', {
  captionDelay: 250,
});
