const home_library = document.querySelectorAll('.nav__item')


const refs = {
  slider: document.querySelector('.glide'),
  form: document.querySelector('.form'),
  mainMovie: document.querySelector('.main_movies'),
  mainMovieLibrary: document.querySelector('.main_movies_library'),
  btn: document.querySelector('.head_librery'),
  headSection: document.querySelector('.header__section'),
}; 


home_library[0].addEventListener('click', ()=>{
    home_library[0].classList.add('active');
    home_library[1].classList.remove('active');

    refs.slider.classList.remove('is_hidden');
    refs.form.classList.remove('is_hidden')
    refs.mainMovie.classList.remove('is_hidden')
    refs.mainMovieLibrary.classList.add('is_hidden');
    refs.btn.classList.add('is_hidden');
    refs.headSection.classList.add('header__section');
    refs.headSection.classList.remove('header_bg-section');
})

home_library[1].addEventListener('click', ()=>{
    home_library[1].classList.add('active');
    home_library[0].classList.remove('active');

    refs.slider.classList.add('is_hidden');
    refs.form.classList.add('is_hidden')
    refs.mainMovie.classList.add('is_hidden');
    refs.mainMovieLibrary.classList.remove('is_hidden');
    refs.btn.classList.remove('is_hidden');
    refs.headSection.classList.remove('header__section');
    refs.headSection.classList.add('header_bg-section');
})
