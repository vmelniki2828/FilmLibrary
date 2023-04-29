const IMG_URL = 'https://image.tmdb.org/t/p/original/';
import idToGenre from './film_list';

const refs = {
  btnWatched: document.querySelector('.btn_watched'),
  btnQueue: document.querySelector('.btn_queue'),
  mainFilm: document.querySelector('.movies_librery')
};


refs.btnQueue.addEventListener('click', () => {
    refs.btnWatched.classList.remove('is_active_btn');
    refs.btnQueue.classList.add('is_active_btn');

})

refs.btnWatched.addEventListener('click', () => {
  refs.btnQueue.classList.remove('is_active_btn');
  refs.btnWatched.classList.add('is_active_btn');

  const movieList = localStorage.getItem('watched');
  const parseMovieList = JSON.parse(movieList);
  parseMovieList.map(movie => {
    const {
      title,
      poster_path,
      vote_average,
      genre_ids,
      release_date = '',
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
    refs.mainFilm.appendChild(movieEl);
  })
});

