const IMG_URL = 'https://image.tmdb.org/t/p/original/';
import idToGenre from './film_list';
import {
  addWatched,
  addQueue,
  removeQueue,
  removeWatched,
  checkQueueValue,
  checkWatchedValue,
} from '../js/localStorageFilms';
import svg from '../images/symbol-defs.svg';

const refs = {
  btnWatched: document.querySelector('.btn_watched'),
  btnQueue: document.querySelector('.btn_queue'),
  filmLibrary: document.querySelector('.movies_librery'),
  filmQueue: document.querySelector('.movies_queue'),
  mainFilmLibrary: document.querySelector('.main_movies_queue'),
  mainFilmQueue: document.querySelector('.main_movies_library'),
};

refs.btnQueue.addEventListener('click', renderBtnQueue);

function renderBtnQueue() {
  refs.btnWatched.classList.remove('is_active_btn');
  refs.btnQueue.classList.add('is_active_btn');
  refs.mainFilmLibrary.classList.remove('is_hidden');
  refs.mainFilmQueue.classList.add('is_hidden');

  localStorage.setItem('activeButton', 'queue');
  refs.filmQueue.innerHTML = '';

  const movieList = localStorage.getItem('queue');
  const parseMovieList = JSON.parse(movieList);
  parseMovieList.map(movie => {
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
    } = movie;

    const newMovieEl = document.createElement('li');
    newMovieEl.classList.add('movie_card');
    newMovieEl.classList.add('movie-mrg');
    newMovieEl.dataset.id = movie.id;
    newMovieEl.innerHTML = `
    <div class="image-container">
        <img class="movie__img" src="${
          poster_path === null ? noImg : IMG_URL + poster_path
        }" alt="${title}">
    </div>
    <h3 class="movie_title">${title}</h3>
    <div class="movie_info">
        <span class="movie_genre">${
          idToGenre(genre_ids) + ' | ' + release_date.slice(0, 4)
        }</span>

        <span class="movie_vote">${vote_average}</span>

    </div>
  `;
    refs.filmQueue.appendChild(newMovieEl);

    newMovieEl.addEventListener('click', () => {
      document.body.style.overflow = 'hidden';
      const modalHTML = document.createElement('div');
      modalHTML.innerHTML = `<div class="modal is_hidden" id="${title}">
      <div class="modal__content">
        <div class="img__block">
            <img class="modal__img" src="${
              IMG_URL + poster_path
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
          <button class="btn-item">${
            checkWatchedValue(movie) ? 'REMOVE' : 'ADD TO WATCHED'
          }</button>
              <button class="btn-item">${
                checkQueueValue(movie) ? 'REMOVE' : 'ADD TO QUEUE'
              }</button>
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

      const modalBtn = document.querySelectorAll('.btn-item');

      modalBtn[0].addEventListener('click', () => {
        if (modalBtn[0].textContent === 'ADD TO WATCHED') {
          addWatched(movie);
          modalBtn[0].textContent = 'REMOVE';
        } else {
          removeWatched(movie);
          modalBtn[0].textContent = 'ADD TO WATCHED';
        }
      });

      modalBtn[1].addEventListener('click', () => {
        if (modalBtn[1].textContent === 'ADD TO QUEUE') {
          addQueue(movie);
          modalBtn[1].textContent = 'REMOVE';
        } else {
          removeQueue(movie);
          modalBtn[1].textContent = 'ADD TO QUEUE';
        }
      });

      const modal = document.getElementById(`${title}`);
      modal.classList.remove('is_hidden');
      modal.style.backgroundImage = `url('${IMG_URL + backdrop_path}')`;

      const btn = document.getElementById(`${poster_path}`);

      btn.addEventListener('click', () => {
        modal.classList.add('is_hidden');
        document.body.style.overflow = '';
        modalHTML.innerHTML = '';
        refs.filmQueue.innerHTML = '';
        renderBtnQueue()
      });

      modal.addEventListener('click', e => {
        if (e.target === modal) {
          modal.classList.add('is_hidden');
          document.body.style.overflow = '';
          modalHTML.innerHTML = '';
          refs.filmQueue.innerHTML = '';
          renderBtnQueue()
        }
      });
    });
  });
}


refs.btnWatched.addEventListener('click', renderBtnWatched);

function renderBtnWatched() {
  refs.btnQueue.classList.remove('is_active_btn');
  refs.btnWatched.classList.add('is_active_btn');
  refs.mainFilmQueue.classList.remove('is_hidden');
  refs.mainFilmLibrary.classList.add('is_hidden');

  localStorage.setItem('activeButton', 'watched');
  refs.filmLibrary.innerHTML = '';

  const movieList = localStorage.getItem('watched');
  const parseMovieList = JSON.parse(movieList);
  parseMovieList.map(movie => {
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
    } = movie;

    const newMovieEl = document.createElement('li');
    newMovieEl.classList.add('movie_card');
    newMovieEl.classList.add('movie-mrg');
    newMovieEl.dataset.id = movie.id;
    newMovieEl.innerHTML = `
    <div class="image-container">
        <img class="movie__img" src="${
          poster_path === null ? noImg : IMG_URL + poster_path
        }" alt="${title}">
    </div>
    <h3 class="movie_title">${title}</h3>
    <div class="movie_info">
        <span class="movie_genre">${
          idToGenre(genre_ids) + ' | ' + release_date.slice(0, 4)
        }</span>

        <span class="movie_vote">${vote_average}</span>

    </div>
  `;
    refs.filmLibrary.appendChild(newMovieEl);

    newMovieEl.addEventListener('click', () => {
      const modalHTML = document.createElement('div');
      modalHTML.innerHTML = `<div class="modal is_hidden" id="${title}">
      <div class="modal__content">
        <div class="img__block">
            <img class="modal__img" src="${
              IMG_URL + poster_path
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
          <button class="btn-item">${
            checkWatchedValue(movie) ? 'REMOVE' : 'ADD TO WATCHED'
          }</button>
              <button class="btn-item">${
                checkQueueValue(movie) ? 'REMOVE' : 'ADD TO QUEUE'
              }</button>
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

      const modalBtn = document.querySelectorAll('.btn-item');

      modalBtn[0].addEventListener('click', () => {
        if (modalBtn[0].textContent === 'ADD TO WATCHED') {
          addWatched(movie);
          modalBtn[0].textContent = 'REMOVE';
        } else {
          removeWatched(movie);
          modalBtn[0].textContent = 'ADD TO WATCHED';
        }
      });

      modalBtn[1].addEventListener('click', () => {
        if (modalBtn[1].textContent === 'ADD TO QUEUE') {
          addQueue(movie);
          modalBtn[1].textContent = 'REMOVE';
        } else {
          removeQueue(movie);
          modalBtn[1].textContent = 'ADD TO QUEUE';
        }
      });

      const modal = document.getElementById(`${title}`);
      modal.classList.remove('is_hidden');
      modal.style.backgroundImage = `url('${IMG_URL + backdrop_path}')`;

      const btn = document.getElementById(`${poster_path}`);

      btn.addEventListener('click', () => {
        modal.classList.add('is_hidden');
        document.body.style.overflow = '';
        modalHTML.innerHTML = '';
        refs.filmLibrary.innerHTML = '';
        renderBtnWatched()
      });

      modal.addEventListener('click', e => {
        if (e.target === modal) {
          modal.classList.add('is_hidden');
          document.body.style.overflow = '';
          modalHTML.innerHTML = '';
          refs.filmLibrary.innerHTML = '';
          renderBtnWatched()
        }
      });
    });
  });
}

window.addEventListener('load', () => {
  const activeButton = localStorage.getItem('activeButton');

  if (activeButton === 'queue') {
    refs.btnWatched.classList.remove('is_active_btn');
    refs.btnQueue.classList.add('is_active_btn');
    refs.mainFilmLibrary.classList.remove('is_hidden');
    refs.mainFilmQueue.classList.add('is_hidden');
    renderBtnQueue()
  } else if (activeButton === 'watched') {
    refs.btnQueue.classList.remove('is_active_btn');
    refs.btnWatched.classList.add('is_active_btn');
    refs.mainFilmQueue.classList.remove('is_hidden');
    refs.mainFilmLibrary.classList.add('is_hidden');
    renderBtnWatched()
  }
});
