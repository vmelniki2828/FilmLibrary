const refs = {
  blockSlider: document.querySelector('.header__switch'),
  slider: document.querySelector('.slider'),
  movieTitleColor: document.querySelector('.movies'),
  movieFooterColor: document.querySelector('.footer'),
};

refs.blockSlider.addEventListener('click', onChangeColor);

function onChangeColor() {
  document.documentElement.style.transition = 'background-color 0.6s ease, color 0.6s ease';
  refs.movieTitleColor.style.transition = 'color 0.6s ease';
  refs.slider.style.transition = 'transform 0.6s ease';
  refs.movieFooterColor.style.transition = 'color 0.6s ease';

  if (
    getComputedStyle(document.documentElement).backgroundColor ===
    'rgb(40, 47, 53)'
  ) {
    document.documentElement.style.backgroundColor = '#ffffff';
    refs.movieTitleColor.style.color = '#000';
    refs.slider.style.transform = 'translateX(0)';
    refs.movieFooterColor.style.backgroundColor = '#f7f7f7'
    refs.movieFooterColor.style.color = '#545454'
    localStorage.setItem('darkMode', false);
  } else {
    document.documentElement.style.backgroundColor = '#282f35';
    refs.movieTitleColor.style.color = '#fff';
    refs.slider.style.transform = 'translateX(26px)';
    refs.movieFooterColor.style.backgroundColor = '#20272e'
    refs.movieFooterColor.style.color = '#fff'
    localStorage.setItem('darkMode', true);
  }
}

window.onload = function () {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  refs.slider.style.transition = 'transform 0.6s ease';

  if (isDarkMode) {
    document.documentElement.style.backgroundColor = '#282f35';
    refs.movieTitleColor.style.color = '#fff';
    refs.slider.style.transform = 'translateX(26px)';
    refs.movieFooterColor.style.backgroundColor = '#20272e'
    refs.movieFooterColor.style.color = '#fff'
  } else {
    document.documentElement.style.backgroundColor = '#ffffff';
    refs.movieTitleColor.style.color = '#000';
    refs.slider.style.transform = 'translateX(0)';
    refs.movieFooterColor.style.backgroundColor = '#f7f7f7'
    refs.movieFooterColor.style.color = '#545454'
  }
};
