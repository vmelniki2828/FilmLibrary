import axios from 'axios';
import noImg from '../images/no_img.png';
import Handlebars from 'handlebars';

const KEY = 'a860cfd897e99827a5ea5e5210690a78';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const popularMovies = `${BASE_URL}/discover/movie?api_key=${KEY}`;
const searchUrl = `${BASE_URL}/search/movie?api_key=${KEY}&query=`;
const ganreUrl = `${BASE_URL}/discover/movie?api_key=${KEY}&with_genres=`;

const movies = document.querySelector('.movies');
const form = document.querySelector('.form');
const search = document.querySelector('.form>input');
const select = document.querySelector('.form>select');

const prev = document.querySelector('.pagePrev');
const next = document.querySelector('.pageNext');
const current = document.querySelector('.current');

console.log(prev);

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

function idToGenre(id) {
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
      console.log(res.results.length);
      if (res.results.length != 0) {
        showMovies(res.results);
        pages.currentPage = res.page;
        pages.nextPage = pages.currentPage + 1;
        pages.prevPage = pages.currentPage - 1;
        pages.totalPages = res.total_pages;

        current.innerText = pages.currentPage;

        if (pages.currentPage <= 1) {
          prev.classList.add('disabled');
          next.classList.remove('disabled');
        } else if (pages.currentPage <= pages.totalPages) {
          prev.classList.remove('disabled');
          next.classList.add('disabled');
        } else {
          prev.classList.remove('disabled');
          next.classList.remove('disabled');
        }

        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      } else {
        movies.innerHTML = '<h1>Error</h1>';
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
      genre_ids,
      release_date = '',
      backdrop_path,
    } = movie;
    const movieEl = document.createElement('li');
    movieEl.addEventListener('click', () => {
      const modal = document.getElementById(`${title}`);
      modal.classList.remove('is_hidden');
      modal.style.backgroundImage = `url('${IMG_URL + backdrop_path}')`
    });
    movieEl.classList.add('movie_card');
    console.log(movie)
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

        <div class="is_hidden modal" id="${title}">
            <div class="modal__content">${title}</div>
        </div>
        `;
    movies.appendChild(movieEl);
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
