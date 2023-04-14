import axios from 'axios';
import { Notify } from 'notiflix';



const KEY = 'a860cfd897e99827a5ea5e5210690a78';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const movies = document.querySelector('.movies');

function getPopularMovies() {
  axios.get(`${BASE_URL}/movie/popular?api_key=${KEY}&page=1`).then(res => {
    showMovies(res.data.results);
    console.table(res.data.results.vote_average);
  });
}

getPopularMovies()

function showMovies(data){
    movies.innerHTML = '';



    data.map(movie => {
        const {title, poster_path, vote_average} = movie;
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <img class="movie__img" src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span>${vote_average}</span>
        </div>
        `

        movies.appendChild(movieEl)
    })
}
