const home_library = document.querySelectorAll('.nav__item')
console.log(home_library);

const refs = {
    slider: document.querySelector('.glide'),
    form: document.querySelector('.form')
} 

home_library[0].addEventListener('click', ()=>{
    home_library[0].classList.add('active');
    home_library[1].classList.remove('active');

    refs.slider.classList.remove('is_hidden');
    refs.form.classList.remove('is_hidden')
})

home_library[1].addEventListener('click', ()=>{
    home_library[1].classList.add('active');
    home_library[0].classList.remove('active');

    refs.slider.classList.add('is_hidden');
    refs.form.classList.add('is_hidden')
})