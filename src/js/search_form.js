import axios from 'axios';


const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = 'a860cfd897e99827a5ea5e5210690a78';
const searchFormEl = document.querySelector('.form')

function getMovies() {
    axios.get(`${BASE_URL}/movie/popular?api_key=${KEY}&page=1`).then(res => {
        console.log(res.data)
    });
}

getMovies()


