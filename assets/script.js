const API_KEY = "api_key=71a4cfdfcb599ba1df129239a7cf9618";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = "/discover/movie?";
const API_URL2 = "&sort_by=popularity.desc&page=1";
const SEARCH_URL = "/search/movie?";
const API_FULL = BASE_URL + API_URL + API_KEY + API_URL2;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const Search_FULL = BASE_URL + SEARCH_URL + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_FULL);
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = ``;
  data.forEach((movie) => {
    const { title, poster_path, vote_average, release_date } = movie;
    const movieE1 = document.createElement("div");
    movieE1.classList.add("movie");
    movieE1.innerHTML = `
    <img src="${IMG_URL + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="date">
          <p>${release_date}</p>
        </div>`;
    main.appendChild(movieE1);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(Search_FULL + "&query=" + searchTerm);
  } else {
    getMovies(API_FULL);
  }
});
