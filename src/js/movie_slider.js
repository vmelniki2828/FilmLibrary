import Glide from '@glidejs/glide';

const KEY = '7b497d31082fcfae4cc74000cae47751';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const sliderMovies = `${BASE_URL}/discover/movie?api_key=${KEY}`;

const MovieEl = document.querySelector('.glide__slides');

console.log(MovieEl);

function getSliderMovies(data) {
  fetch(data)
    .then(res => res.json())
    .then(res => {
      getSliderOn(res.results);
    });
}

getSliderMovies(sliderMovies);

function getSliderOn(element) {
  element.map(movie => {
    const { poster_path, title } = movie;
    const slideEl = document.createElement('li');
    slideEl.classList.add('glide__slide');
    slideEl.innerHTML = `
        <img class="slider__img" src="${
          IMG_URL + poster_path
        }" alt="${title}" width="175px">`;

    MovieEl.appendChild(slideEl);
  });
}

// const glide = new Glide('.glide', {
//   type: 'slider',
//   startAt: 0,
//   perView: 10,
//   autoplay: 3000,
//   breakpoints: {
//     1280: {
//       perView: 8,
//     },
//     768: {
//       perView: 4,
//     },
//     320: {
//       perView: 1,
//     },
//   },
// });

// glide.mount();


