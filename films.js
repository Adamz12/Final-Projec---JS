const Title = localStorage.getItem("Title");

async function films(Title) {
  const film = await fetch("https://www.omdbapi.com/?apikey=59334251&s=fast");
  const filmsData = await film.json();
  const filmsListEl = document.querySelector(".movie-list");
  console.log(filmsData);
  filmsListEl.innerHTML = filmsData.Search.map(
    (movie) => `<div class="movie">
  <div class="movie-card">
    <div class="movie-card__container">
    <figure class="poster__wrapper">
    <img
    src="${movie.Poster}"
    alt=""
    class="poster"
  />
  </figure>
  <div class="title__wrapper">
       <h3>${movie.Title}</h3>
       <p><b>Year:</b> ${movie.Year}</p>
       <p><b>Type:</b> ${movie.Type}</p>
        </div>
    </div>
  </div>
</div>`
  ).join("");
}

async function onSearchChange(event) {
  const Title = event.target.value;
  films(Title);
}

films();
