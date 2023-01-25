// "https://www.omdbapi.com/?apikey=59334251&s=fast"
// https://www.omdbapi.com/?i=tt3896198&apikey=59334251
// `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=59334251`

const movieSearchBox = document.getElementById("movie-search-box");
const movieListEl = document.querySelector(".movie-list");
const searchResultEl = document.querySelector(".searchResult");
const id = localStorage.getItem("id");

async function filterFilms(id) {
  const movies = await fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=59334251&s=${id}`
  );
  const movieData = await movies.json();
  console.log(movieData);
  movieListEl.innerHTML = movieData.Search.map((film) => filmHTML(film)).join(
    ""
  );
}

function sortFilms(filter) {
  let filteredMovies;
  if (filter === "LOW_TO_HIGH") {
    filteredMovies = movieData.sort(
      (a, b) => (a.Year || a.Year) - (b.Year || b.Year)
    );
  } else if (filter === "HIGH_TO_LOW") {
    filteredMovies = movieData.sort(
      (a, b) => (b.Year || b.Year) - (a.Year || a.Year)
    );
  } else {
    filteredMovies = movieData;
  }
  movieListEl.innerHTML = filteredMovies.map((film) => filmHTML(film)).join("");
}

async function findMovies(event) {
  const id = event.target.value;
  filterFilms(id);
}

search_button = document.querySelector(".search__btn");

search_button.onclick = function () {
  this.innerHTML =
    "<div class='overlay button__overlay--loading'> <i class='fas fa-spinner'></i></div>";
  setTimeout(() => {
    this.innerHTML = "T";
    this.style = "background #f1f5f4; color:#333; pointer-events:none";
  }, 2000);
};

function filter(event) {
  filterFilms(event.target.value);
}

function filmHTML(film) {
  return `<div class="movie">
    <div class="movie-card">
      <div class="movie-card__container">
      <figure class="poster__wrapper">
      <img
      src="${film.Poster}"
      alt=""
      class="poster"
    />
    </figure>
    <div class="title__wrapper">
         <h3>${film.Title}</h3>
         <p><b>Year:</b> ${film.Year}</p>
         <p><b>Type:</b> ${film.Type}</p>
          </div>
      </div>
    </div>
  </div>`;
}

filterFilms();
