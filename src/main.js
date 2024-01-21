import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.form-seach');
const galleryEl = document.querySelector('.gallery-images');
const loaderEl = document.querySelector('.loader');
const API_KEY = '41909271-8b5dab2225a1cd5a9757159a5';

loaderEl.style.display = 'none';

formEl.addEventListener('submit', handleSearch);

function checkResponse(res) {
  if (!res.ok) {
    throw new Error(res.status);
  }
  return res.json();
}

function fetchGallery(images) {
  loaderEl.style.display = 'inline-block';
  return fetch(
    'https://pixabay.com/api/?key=' +
      API_KEY +
      '&q=' +
      images +
      '&image_type=photo&orientation=horizontal&safesearch=true&per_page=9'
  ).then(checkResponse);
}

const lightbox = new SimpleLightbox('.gallery-images a', {
  captionDelay: 250,
});

function handleSearch(event) {
  event.preventDefault();

  loaderEl.style.display = 'block';

  galleryEl.innerHTML = '';

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
    loaderEl.style.display = 'none';
    return;
  }

  console.log(inputValue);

  fetchGallery(inputValue)
    .then(data => {
      const hits = data.hits;

      if (!data.total) {
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
      let markup = '';
      for (const hit of hits) {
        markup += createGallery(hit);
      }

      galleryEl.innerHTML = markup;
      lightbox.refresh();
      console.log(markup);
    })
    .catch(error => console.log(error))
    .finally(() => {
      form.reset();
      loaderEl.style.display = 'none';
    });
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
    <a href="${largeImageURL}" ><img class="search-image" src = "${webformatURL}" alt = "${tags}" ><div class="options">
    <p class="options-item"> likes:<span class="options-item-span">${likes}</span></p>
    <p class="options-item"> views:<span class="options-item-span">${views}</span></p>
    <p class="options-item"> comments:<span class="options-item-span">${comments}</span></p>
    <p class="options-item"> downloads:<span class="options-item-span">${downloads}</span></p></div>
  
    </a>
    
    </li>`;
}

// gallery.on('show.simplelightbox', fetchGallery);
