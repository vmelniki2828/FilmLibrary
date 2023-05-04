const home_library = document.querySelectorAll('.nav__item')

const refs = {
  slider: document.querySelector('.glide'),
  form: document.querySelector('.form'),
  mainMovie: document.querySelector('.main_movies'),
  mainMovieLibrary: document.querySelector('.main_movies_library'),
  mainMovieQueue: document.querySelector('.main_movies_queue'),
  btn: document.querySelector('.head_librery'),
  headSection: document.querySelector('.header__section'),
  btnWatched: document.querySelector('.btn_watched'),
  btnQueue: document.querySelector('.btn_queue'),
  mainFilmLibrary: document.querySelector('.main_movies_queue'),
  mainFilmQueue: document.querySelector('.main_movies_library'),
}; 


home_library[0].addEventListener('click', ()=>{
    home_library[0].classList.add('active');
    home_library[1].classList.remove('active');

     localStorage.setItem('page', 'home');

    refs.slider.classList.remove('is_hidden');
    refs.form.classList.remove('is_hidden');
    refs.mainMovie.classList.remove('is_hidden');
    refs.mainMovieLibrary.classList.add('is_hidden');
    refs.mainMovieQueue.classList.add('is_hidden');
    refs.btn.classList.add('is_hidden');
    refs.headSection.classList.add('header__section');
    refs.headSection.classList.remove('header_bg-section');
})

home_library[1].addEventListener('click', ()=>{
    home_library[1].classList.add('active');
    home_library[0].classList.remove('active');

    localStorage.setItem('page', 'library');

    refs.slider.classList.add('is_hidden');
    refs.form.classList.add('is_hidden')
    refs.mainMovie.classList.add('is_hidden');
    refs.mainMovieLibrary.classList.add('is_hidden');
    refs.mainMovieQueue.classList.add('is_hidden');
    refs.btn.classList.remove('is_hidden');
    refs.headSection.classList.remove('header__section');
    refs.headSection.classList.add('header_bg-section');

    const activeButton = localStorage.getItem('activeButton');

  if (activeButton === 'queue') {
    refs.btnWatched.classList.remove('is_active_btn');
    refs.btnQueue.classList.add('is_active_btn');
    refs.mainFilmLibrary.classList.remove('is_hidden');
    refs.mainFilmQueue.classList.add('is_hidden');
  } else if (activeButton === 'watched') {
    refs.btnQueue.classList.remove('is_active_btn');
    refs.btnWatched.classList.add('is_active_btn');
    refs.mainFilmQueue.classList.remove('is_hidden');
    refs.mainFilmLibrary.classList.add('is_hidden');
  }
})

window.onload = function () {
  const activePage = localStorage.getItem('page'); 

  if (activePage === 'library') {
      home_library[1].classList.add('active');
      home_library[0].classList.remove('active');

      refs.slider.classList.add('is_hidden');
      refs.form.classList.add('is_hidden');
      refs.mainMovie.classList.add('is_hidden');
      refs.mainMovieLibrary.classList.remove('is_hidden');
      refs.mainMovieQueue.classList.add('is_hidden');
      refs.btn.classList.remove('is_hidden');
      refs.headSection.classList.remove('header__section');
      refs.headSection.classList.add('header_bg-section');
  }else{
    home_library[0].classList.add('active');
    home_library[1].classList.remove('active');

    refs.slider.classList.remove('is_hidden');
    refs.form.classList.remove('is_hidden');
    refs.mainMovie.classList.remove('is_hidden');
    refs.mainMovieLibrary.classList.add('is_hidden');
    refs.mainMovieQueue.classList.add('is_hidden');
    refs.btn.classList.add('is_hidden');
    refs.headSection.classList.add('header__section');
    refs.headSection.classList.remove('header_bg-section');
  }
}