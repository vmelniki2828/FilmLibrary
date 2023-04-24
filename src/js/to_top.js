const goTopBtn = document.querySelector('.to_top');

goTopBtn.addEventListener('click', goTop);
window.addEventListener('scroll', trackScroll);

function trackScroll() {
  const offset = window.pageYOffset;
  const coords = document.documentElement.clientHeight;
  if (offset < coords) {
    goTopBtn.classList.remove('go_top_show');
  } else {
    goTopBtn.classList.add('go_top_show');
  }
}

function goTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -75);
    setTimeout(goTop, 0);
  }
}
