// URLS
const API_KEY = '268a404def4cbb6b8f4232ee7f25b8f9';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

// Quering The Dom
const main = document.getElementById('main');
const form = document.getElementById('form');

// Get Data Function
async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    updataUI(data.results);
}
getData(API_URL);

// Updata The UI Function
function updataUI(data) {
    main.innerHTML = '';
    data.forEach(item => {
        const {poster_path, title, overview, vote_average} = item;
        let html = `
        <div class="movie">
            <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="info">
                <h3>${title}</h3>
                <span class="${changeClass(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>${overview}</p>
            </div>
        </div>`;
        main.innerHTML += html;
    });
}

// Change Vote Average Color
function changeClass(vote) {
    if (vote < 5) {
        return 'red';
    } else if (vote <= 8) {
        return 'orange'
    } else if (vote <= 10) {
        return 'green'
    }
}

// Search Function
form.addEventListener('submit', e => {
    e.preventDefault();
    searchFunc();
});

function searchFunc() {
    const val = form.search.value.trim();
    if (val) {
        getData(SEARCH_URL + val);
    }
}