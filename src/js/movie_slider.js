import Glide from '@glidejs/glide';

const refs = {
  movieEl: document.querySelectorAll('.glide__slide'),
};


const KEY = '7b497d31082fcfae4cc74000cae47751';
const URL = 'https://api.themoviedb.org/3';
const API_URL = `${URL}/discover/movie?api_key=${KEY}`;
const IMG = 'https://image.tmdb.org/t/p/w500';

async function getSliderMovies() {
  await fetch(API_URL)
    .then(res => res.json())
    .then(res => {
      getSliderOn(res.results);
    });
}
getSliderMovies ();

async function getSliderOn(element) {
  element.forEach((movie, i) => {
    const { poster_path, title, id } = movie;
    if (!poster_path) {
      refs.movieEl[i].innerHTML = `<img class='slider-js__img' src="./image/card.jpg" alt="${title}" id='${id}'/>`;
      return;
    }
    refs.movieEl[i].innerHTML = `<img class='slider-js__img' src="${IMG}${poster_path}" alt="${title}" id='${id}'/>`;
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

