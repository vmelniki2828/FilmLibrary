const refs = {
  btnWatched: document.querySelector('.btn_watched'),
  btnQueue: document.querySelector('.btn_queue'),
};

refs.btnQueue.addEventListener('click', () => {
    refs.btnWatched.classList.remove('is_active_btn');
    refs.btnQueue.classList.add('is_active_btn');
})

refs.btnWatched.addEventListener('click', () => {
  refs.btnQueue.classList.remove('is_active_btn');
  refs.btnWatched.classList.add('is_active_btn');
});

