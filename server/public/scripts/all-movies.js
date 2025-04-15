function getLoggedInUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const [, payload] = token.split(".");
  return JSON.parse(atob(payload));
}

function getToken() {
  return JSON.parse(localStorage.getItem("token"));
}

async function fetchJSON(url, method = "GET", body = null) {
  const token = getToken();
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  const data = await response.json();
  return data;
}

function createMovieCard(movie) {
  return `
      <div id="card-${movie.id}" class="item-card">
        <div class="card-image">
          <a href="movie.html?id=${movie.id}">
            <img src="${movie.img}" alt="img" />
          </a>
        </div>
        <div class="card-details">
          <div class="details-wrapper">
            <div class="movie-title">
              <h2><a href="movie.html?id=${movie.id}">${movie.title}</a></h2>
              <span>${movie.released}</span>
            </div>
            <div class="movie-description">
              <p>${movie.overview}</p>
            </div>
          </div>
        </div>
      </div>`;
}
async function appendMovies() {
  const moviesWrapper = document.querySelector("#all-movies");
  moviesWrapper.innerHTML = "";

  const movies = await fetchJSON(`http://192.168.1.137:3000/movies/`);
  console.log(movies);

  //   const sortedM = movies.sort((a, b) => b.title - a.title);

  movies.forEach((movie) => {
    const eachMovie = createMovieCard(movie);
    moviesWrapper.insertAdjacentHTML("beforeend", eachMovie);
  });
}

getToken();
appendMovies();
