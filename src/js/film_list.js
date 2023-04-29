import axios from 'axios';
import noImg from '../images/no_img.png';
import sorry from '../images/sorry.png';
import Handlebars from 'handlebars';
import svg from '../images/symbol-defs.svg';
import {addWatched, addQueue, removeQueue, removeWatched, checkQueueValue, checkWatchedValue} from '../js/localStorageFilms'

const KEY = 'a860cfd897e99827a5ea5e5210690a78';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original/';

const popularMovies = `${BASE_URL}/discover/movie?api_key=${KEY}`;
const searchUrl = `${BASE_URL}/search/movie?api_key=${KEY}&query=`;
const ganreUrl = `${BASE_URL}/discover/movie?api_key=${KEY}&with_genres=`;

const movies = document.querySelector('.movies');
const form = document.querySelector('.form');
const search = document.querySelector('.form>input');
const select = document.querySelector('.form>select');

const prev = document.querySelector('.icon-arrow-left');
const next = document.querySelector('.icon-arrow-right');
const current = document.querySelector('.current');

const pagin = document.querySelector('.pagination');



const pages = {
  currentPage: 1,
  nextPage: 2,
  prevPage: 3,
  lastUrl: '',
  totalPages: 100,
};

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

export default function idToGenre(id) {
  let ar = [];
  genres.map(el => {
    if (ar.length >= 3) {
      ar = [ar[0], ar[1], 'other'];
      return;
    }
    if (id.includes(el.id)) ar.push(el.name);
  });
  return ar;
}

function getMovies(url) {
  pages.lastUrl = url;
  fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.results.length != 0) {
        showMovies(res.results);
        pages.currentPage = res.page;
        pages.nextPage = pages.currentPage + 1;
        pages.prevPage = pages.currentPage - 1;
        pages.totalPages = res.total_pages;
        current.innerText = pages.currentPage;

        if(pages.totalPages === 1) {
          pagin.classList.add('is_hidden');
        }
        else if (pages.currentPage <= 1) {
          prev.classList.add('disabled');
          next.classList.remove('disabled');
        } else if (pages.currentPage < pages.totalPages) {
          prev.classList.remove('disabled');
          next.classList.remove('disabled');
        } else {
          next.classList.add('disabled');
          prev.classList.remove('disabled');
        }
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      } else {
        movies.innerHTML = `<div>
        <img class="sorry" src="${sorry}">
        <h1 class="sorry_text mt-30 mb-30">Sorry, film not found(((</h1>
        </div>`;

        pagin.classList.add('is_hidden');
      }
    });
}

getMovies(popularMovies);

function showGanresList(arr) {
  select.innerHTML = '';
  const selectAll = document.createElement('option');
  selectAll.setAttribute('value', '0');
  selectAll.setAttribute('selected', '');
  selectAll.innerHTML = 'All ganres:';
  select.appendChild(selectAll);

  arr.map(item => {
    const selectEl = document.createElement(`option`);
    selectEl.setAttribute(`value`, item.id);
    selectEl.innerHTML = `${item.name}`;

    select.appendChild(selectEl);
  });
}

showGanresList(genres);

function showMovies(data) {

  movies.innerHTML = '';
  data.map(movie => {
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
    const movieEl = document.createElement('li');
    movieEl.classList.add('movie_card');
    movieEl.innerHTML = `
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
    movies.appendChild(movieEl);

    movieEl.addEventListener('click', () => {
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

      const modalBtn = document.querySelectorAll('.btn-item')

      modalBtn[0].addEventListener('click', () =>{
        if (modalBtn[0].textContent === 'ADD TO WATCHED') {
          addWatched(movie);
          modalBtn[0].textContent = 'REMOVE';
        }else{
          removeWatched(movie);
          modalBtn[0].textContent = 'ADD TO WATCHED';
        }
      })

      modalBtn[1].addEventListener('click', () =>{
        if (modalBtn[1].textContent === 'ADD TO QUEUE') {
          addQueue(movie);
          modalBtn[1].textContent = 'REMOVE';
        }else{
          removeQueue(movie);
          modalBtn[1].textContent = 'ADD TO QUEUE';
        }
      })

      const modal = document.getElementById(`${title}`);
      modal.classList.remove("is_hidden")
      modal.style.backgroundImage = `url('${IMG_URL + backdrop_path}')`;

      const btn = document.getElementById(`${poster_path}`);

      btn.addEventListener('click', () =>{
        modal.classList.add("is_hidden")
        document.body.style.overflow = '';
        modalHTML.innerHTML='';
      })

      modal.addEventListener('click', (e) => {
        if(e.target === modal){
          modal.classList.add('is_hidden');
          document.body.style.overflow = '';
          modalHTML.innerHTML='';
        }
      })

    });
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchValue = search.value;

  if (searchValue) {
    getMovies(`${searchUrl + searchValue}`);
  }

  select.value = 0;
});

select.addEventListener('change', e => {
  if (e.target.value == 0) {
    getMovies(popularMovies);
  } else {
    getMovies(ganreUrl + e.target.value);
  }

  search.value = '';
});

prev.addEventListener('click', () => {
  if (pages.prevPage > 0) {
    pageCall(pages.prevPage);
  }
});

next.addEventListener('click', () => {
  if (pages.nextPage <= pages.totalPages) {
    pageCall(pages.nextPage);
  }
});

function pageCall(page) {
  let urlSplit = pages.lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length - 1].split('=');
  if (key[0] != 'page') {
    let url = pages.lastUrl + '&page=' + page;
    getMovies(url);
  } else {
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] + '?' + b;
    getMovies(url);
  }
}
