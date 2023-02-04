// "https://www.omdbapi.com/?apikey=59334251&s=fast"
// https://www.omdbapi.com/?i=tt3896198&apikey=59334251
// `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=59334251`
// `https://www.omdbapi.com/?&apikey=59334251&s=${id}`

let movieSearchBox = document.getElementById("movie-search-box");
let movieListEl = document.querySelector(".movie-list");
let movieCard = document.querySelector(".movie-card");
const searchResultEl = document.querySelector(".searchResult");
const id = localStorage.getItem("id");

let movie__loading;
let movies;
let movieData = {};

// USE MOVIEDATA AS A GLOBAL VARIABLE SO IT CAN BE ACCSESSED IN VARIOUS FUNCTIONS

movieCard.classList.add("movie__loading");
movieListEl.classList.add("movie__loading"); // Adds class to remove movie list

function openMenu() {
  document.body.classList += "menu--open";
}
function closeMenu() {
  document.body.classList.remove("menu--open");
}

async function filterFilms(id) {
  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=59334251&s=${id}`
  );
  movieData = await movies.json();
  console.log(movieData);
  movieListEl.innerHTML = movieData.Search.map((film) => filmHTML(film)).join(
    ""
  );
}

function sortFilms(filter) {
  if (filter === "OLDEST") {
    movieData.Search.sort((a, b) => a.Year - b.Year);
    movieListEl.innerHTML = movieData.Search.map((film) => filmHTML(film)).join(
      ""
    );
  } else if (filter === "HIGH_TO_LOW") {
    movieData.Search.sort((a, b) => b.Year - a.Year);
    movieListEl.innerHTML = movieData.Search.map((film) => filmHTML(film)).join(
      ""
    );
  }
  //   USE THE INNER HTML SO WHEN PEOPLE SORT IT THE DATA SHOWS AS HTML
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function findMovies(event) {
  const id = event.target.value;
  await timeout(1000);
  filterFilms(id);
  movieListEl.classList.remove("movie__loading"); //   Movies only displayed when seach is activivated
}

//   THIS ALLOWS US TO SEARCH THE FILMS THROUGH THE SEARCH BAR BY PASSING THROUGH THE FILTERFilms with id

search_button = document.querySelector(".search__btn");

search_button.onclick = function () {
  this.innerHTML =
    "<div class='overlay button__overlay--loading'> <i class='fas fa-spinner'></i></div>";
  setTimeout(() => {
    this.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>';
    this.style = "background #f1f5f4; color:#ffff; pointer-events:pointer";
  }, 1000);
  movieListEl.classList.remove("movie__loading");
};

function filter(event) {
  sortFilms(event.target.value);
  //   IN ORDER TO MAKE THE SORT SECTION WORK WE NEED TO TARGET THE SORT CODE AND USE EVENT.TARGET.VALUE
}

function filmHTML(film) {
  return `<div class="movie">
    <div class="movie-card">
      <div class="movie-card__container">
      <figure class="poster__wrapper">
      <img
      src="${film.Poster}"
      alt=""
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
  movieWrapper.innerHTML = filmHTML(film);
}

filterFilms();
