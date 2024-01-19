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
      console.log(markup);
      galleryEl.innerHTML = markup;
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
    <a href="${webformatURL}"><img src = "${largeImageURL}" alt = "${tags}" ></a>
    <div>${likes}</div>
    <div>${views}</div>
    <div>${comments}</div>
    <div>${downloads}</div>
    </li>`;
}
//   const makeGallery = images
//     .map(
//       ({ url, alt }) =>
//         `<li class = "list-item"><a href=""
//         <img src = "${url}" alt = "${alt}" width = "300" ></a></li>`
//     )
//     .join('');
//   console.log(makeGallery);
//   const markup = ``;
//   galleryEl.insertAdjacentHTML('beforeend', makeGallery);
// }

function onFetchError(error) {
  alert('Упс, щось пішло не так і ми не знайшли ваше зображення');
  console.error(error);
}
