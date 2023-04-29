import Glide from '@glidejs/glide';
import idToGenre from './film_list';
import svg from '../images/symbol-defs.svg';
import {
  addWatched,
  addQueue,
  removeQueue,
  removeWatched,
  checkQueueValue,
  checkWatchedValue,
} from '../js/localStorageFilms';

const refs = {
  movieEl: document.querySelectorAll('.glide__slide'),
  modalSlider: document.querySelector('.glide__slide'),
};

const arr = [];
const KEY = '7b497d31082fcfae4cc74000cae47751';
const URL = 'https://api.themoviedb.org/3';
const API_URL = `${URL}/discover/movie?api_key=${KEY}`;
const IMG = 'https://image.tmdb.org/t/p/original/';

async function getSliderMovies() {
  await fetch(API_URL)
    .then(res => res.json())
    .then(res => {
      getSliderOn(res.results);
    });
}
getSliderMovies();

async function getSliderOn(element) {
  element.map((movie, i) => {
    const {
      title,
      poster_path,
      vote_average,
      vote_count,
      popularity,
      original_title,
      genre_ids,
      release_date = '',
      backdrop_path,
      overview,
      id,
    } = movie;
    if (!poster_path) {
      refs.movieEl[
        i
      ].innerHTML = `<img class='slider-js__img' src="./image/card.jpg" alt="${title}" id='${id}'/>`;
      return;
    }
    refs.movieEl[
      i
    ].innerHTML = `<img class='slider-js__img' src="${IMG}${poster_path}" alt="${title}" id='${id}'/>`;

    refs.movieEl[i].addEventListener('click', () => {
      document.body.style.overflow = 'hidden';
      const modalHTML = document.createElement('div');
      modalHTML.innerHTML = `<div class="modal is_hidden" id="${title}">
      <div class="modal__content">
        <div class="img__block">
            <img class="modal__img" src="${
              IMG + poster_path
            }" width="240px" height="357px" alt="${title}">
        </div>
        <div class="info__modal">
            <h3 class="modal__film-titel">${title}</h3>
          <div class="list__modal">
              <ul class="list__titel">
                  <li class="list__item">Vote / Votes</li>
                  <li class="list__item">Popularity</li>
                  <li class="list__item">Original Title</li>
                  <li class="list__item">Genre</li>
              </ul>
              <ul class="list__value">
                  <li class="list__item"><span class="list__value-item">${vote_average}</span> / ${vote_count}</li>
                  <li class="list__item">${popularity}</li>
                  <li class="list__item">${original_title}</li>
                  <li class="list__item">${idToGenre(genre_ids)}</li>
              </ul>
          </div>
          <p class="modal__text-title">ABOUT</p>
          <p class="modal__text">${overview}<p>
          <div class="modal__btn">
              <button class="btn-item">${checkWatchedValue(movie) ? 'ADD TO WATCHED' : 'REMOVE'}</button>
              <button class="btn-item">${checkQueueValue(movie) ? 'ADD TO QUEUE' : 'REMOVE'}</button>
          </div>
        </div>
        
          <button class="btn-close" id="${poster_path}">
            <svg width="20px" height="20px" class="icon-close" >
              <use href="${svg}#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>`;
      document.body.appendChild(modalHTML);

      console.log(checkQueueValue(movie));

      const modalBtn = document.querySelectorAll('.btn-item');

      modalBtn[0].addEventListener('click', () => {
        if (modalBtn[0].textContent === 'ADD TO WATCHED') {
          addWatched(movie);
          modalBtn[0].textContent = 'REMOVE';
        }else{
          removeWatched(movie);
          modalBtn[0].textContent = 'ADD TO WATCHED';
        }
      });

      modalBtn[1].addEventListener('click', () => {
        if (modalBtn[1].textContent === 'ADD TO QUEUE') {
          addQueue(movie);
          modalBtn[1].textContent = 'REMOVE';
        }else{
          removeQueue(movie);
          modalBtn[1].textContent = 'ADD TO QUEUE';
        }
      });

      const modal = document.getElementById(`${title}`);
      modal.classList.remove('is_hidden');
      modal.style.backgroundImage = `url('${IMG + backdrop_path}')`;

      const btn = document.getElementById(`${poster_path}`);

      btn.addEventListener('click', () => {
        modal.classList.add('is_hidden');
        document.body.style.overflow = '';
        modalHTML.innerHTML = '';
      });

      modal.addEventListener('click', e => {
        if (e.target === modal) {
          modal.classList.add('is_hidden');
          document.body.style.overflow = '';
          modalHTML.innerHTML = '';
        }
      });
    });
  });
}

const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 10,
  autoplay: 2000,
  bound: true,
  breakpoints: {
    1280: {
      perView: 7,
    },
    768: {
      perView: 4,
    },
    480: {
      perView: 2,
    },
  },
});
glide.mount();
