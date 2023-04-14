const refs = {
  blockSlider: document.querySelector('.header__switch'),
  slider: document.querySelector('.slider'),
};

refs.blockSlider.addEventListener('click', onChangeColor);

function onChangeColor() {
    if (getComputedStyle(document.documentElement).backgroundColor ==='rgb(35, 41, 47)') {
      document.documentElement.style.backgroundColor = '#ffffff';
      refs.slider.style.transform = 'translateX(0)';
      localStorage.setItem('darkMode', false)
    } else {
      document.documentElement.style.backgroundColor = '#23292f';
      refs.slider.style.transform = 'translateX(26px)';
      localStorage.setItem('darkMode', true)
    }
}


window.onload = function(){
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if(isDarkMode){
        document.documentElement.style.backgroundColor = '#23292f';
        refs.slider.style.transform = 'translateX(26px)'; 
    }else{
        document.documentElement.style.backgroundColor = '#ffffff';
        refs.slider.style.transform = 'translateX(0)';
    }

}