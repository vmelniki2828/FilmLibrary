import axios from 'axios';

const KEY = 'a860cfd897e99827a5ea5e5210690a78';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const popularMovies = `${BASE_URL}/movie/popular?api_key=${KEY}&page=1`;
const searchUrl = `${BASE_URL}/search/movie?api_key=${KEY}&query=`

const movies = document.querySelector('.movies');
const form = document.querySelector('.form');
const search = document.querySelector('.form>input');

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
  fetch(url).then(res => res.json()).then(res => {
    showMovies(res.results);
  });
}

getMovies(popularMovies)

function showMovies(data) {
  movies.innerHTML = '';

  data.map(movie => {
    const { title, poster_path, vote_average, genre_ids, release_date } = movie;
    const movieEl = document.createElement('li');
    movieEl.classList.add('movie_card');
    movieEl.innerHTML = `
        <img class="movie__img" src="${IMG_URL + poster_path}" alt="${title}">
        <h3 class="movie_title">${title}</h3>
        <div class="movie_info">
            <span class="movie_genre">${
              idToGenre(genre_ids) + ' | ' + release_date.slice(0, 4)
            }</span>

            <span class="movie_vote">${vote_average}</span>

        </div>
        `;

    movies.appendChild(movieEl);
  });
}

form.addEventListener('submit', e => {

  e.preventDefault();

  const searchValue = search.value;
  console.log(searchUrl+searchValue);
  

  if (searchValue) {
    getMovies(`${searchUrl+searchValue}`);
  }
});
