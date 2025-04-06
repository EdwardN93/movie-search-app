let currentUser = null;
let allMovies = [];

// ------------------- Helper Functions -------------------

function getToken() {
  return JSON.parse(localStorage.getItem("token"));
}

function getLoggedInUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const [, payload] = token.split(".");
  return JSON.parse(atob(payload));
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
  return response.json();
}

async function patchUserData(data) {
  if (!currentUser) return;
  const updatedUser = await fetchJSON(
    `http://192.168.1.137:3000/users/${currentUser.id}`,
    "PATCH",
    data
  );
  currentUser = updatedUser;
}

// ------------------- Main Fetching -------------------

async function fetchUserDetails() {
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) return;

  try {
    const [user, movies] = await Promise.all([
      fetchJSON(`http://192.168.1.137:3000/users/${loggedInUser.sub}`),
      fetchJSON(`http://192.168.1.137:3000/movies/`),
    ]);

    currentUser = user;
    allMovies = movies;

    displayUserInfo();
    displayFavoriteMovies();
    attachEventListeners();
  } catch (error) {
    console.error("Failed to fetch user details:", error);
  }
}

// ------------------- DOM Functions -------------------

function displayUserInfo() {
  const userNameDisplay = document.querySelector(".profile-name");
  const circle = document.querySelector(".circle");
  const favoriteMovies = document.querySelector(".favorites");
  const watchlist = document.querySelector(".watchlist");

  circle.textContent = currentUser.name?.charAt(0).toUpperCase() || "?";
  userNameDisplay.textContent = currentUser.name || "No Name Found";
  favoriteMovies.textContent = `Movies favorited: ${
    currentUser.favorites?.length || 0
  }`;
  watchlist.textContent = `Movies in watchlist: ${
    currentUser.watchlist?.length || 0
  }`;
}

function createMovieCard(movie, isFavorite = false) {
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
          <div class="action-bar">
            <ul class="action-bar-list">
              ${
                isFavorite
                  ? `<li class="add-to-watchlist" data-id="${movie.id}">Watchlist</li>
                     <li class="remove-from-favorites" data-id="${movie.id}">Remove</li>`
                  : `<li class="remove-from-watchlist" data-id="${movie.id}">Remove</li>`
              }
            </ul>
          </div>
        </div>
      </div>
    </div>`;
}

function displayFavoriteMovies() {
  const favoritesWrapper = document.querySelector(".favorites-section");
  favoritesWrapper.innerHTML = "";

  const favorites = allMovies.filter((movie) =>
    currentUser.favorites.includes(movie.id)
  );

  if (favorites.length === 0) {
    favoritesWrapper.textContent = "No movies favorited";
    return;
  }

  favorites.forEach((movie) => {
    const card = createMovieCard(movie, true);
    favoritesWrapper.insertAdjacentHTML("beforeend", card);
  });

  attachEventListeners(); // Attach again since DOM was reset
}

function displayWatchlist() {
  const watchlistWrapper = document.querySelector(".watchlist-section");
  watchlistWrapper.innerHTML = "";

  const watchlistMovies = allMovies.filter((movie) =>
    currentUser.watchlist.includes(movie.id)
  );

  if (watchlistMovies.length === 0) {
    watchlistWrapper.textContent = "No movies in watchlist";
    return;
  }

  watchlistMovies.forEach((movie) => {
    const card = createMovieCard(movie, false);
    watchlistWrapper.insertAdjacentHTML("beforeend", card);
  });

  attachEventListeners(); // Attach again since DOM was reset
}

// ------------------- Toggle Display -------------------

function showFavoritesOnly() {
  const movieInfoText = document.querySelector(".movie-list-info");
  document.querySelector(".favorites-section").style.display = "block";
  document.querySelector(".watchlist-section").style.display = "none";
  document.querySelector(".movie-list-type").textContent = "Favorite Movies";
  movieInfoText.style.display = "block";
  displayFavoriteMovies();
}

function showWatchlistOnly() {
  const movieInfoText = document.querySelector(".movie-list-info");

  document.querySelector(".favorites-section").style.display = "none";
  document.querySelector(".watchlist-section").style.display = "block";
  document.querySelector(".movie-list-info").style.display = "block";
  document.querySelector(".movie-list-type").textContent = "Watchlist";
  movieInfoText.style.display = "block";
  displayWatchlist();
}

const allInfoBtn = document.querySelectorAll(".btn-info");
console.log(allInfoBtn);
allInfoBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    allInfoBtn.forEach((sBtn) => {
      sBtn.classList.remove("btn-bg-col");
    });
    e.target.classList.add("btn-bg-col");
  });
});

document
  .querySelector(".display-favorites")
  .addEventListener("click", showFavoritesOnly);
document
  .querySelector(".display-watchlist")
  .addEventListener("click", showWatchlistOnly);

// ------------------- Event Listeners -------------------

function attachEventListeners() {
  document.querySelectorAll(".remove-from-favorites").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const movieId = Number(e.target.dataset.id);
      await removeFromFavorites(movieId);
    });
  });

  document.querySelectorAll(".remove-from-watchlist").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const movieId = Number(e.target.dataset.id);
      await removeFromWatchlist(movieId);
    });
  });

  document.querySelectorAll(".add-to-watchlist").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const movieId = Number(e.target.dataset.id);
      await addToWatchList(movieId);
    });
  });
}

// ------------------- Favorite / Watchlist Actions -------------------

async function removeFromFavorites(movieId) {
  try {
    const updatedFavorites = currentUser.favorites.filter(
      (id) => id !== movieId
    );
    await patchUserData({ favorites: updatedFavorites });
    displayUserInfo();
    displayFavoriteMovies();
  } catch (err) {
    console.error("Error removing favorite:", err);
  }
}

async function removeFromWatchlist(movieId) {
  try {
    const updatedWatchlist = currentUser.watchlist.filter(
      (id) => id !== movieId
    );
    await patchUserData({ watchlist: updatedWatchlist });
    displayUserInfo();
    displayWatchlist();
  } catch (err) {
    console.error("Error removing from watchlist:", err);
  }
}

async function addToWatchList(movieId) {
  try {
    if (currentUser.watchlist.includes(movieId)) {
      alert("Already in watchlist");
      return;
    }

    const updatedWatchlist = [...currentUser.watchlist, movieId];
    await patchUserData({ watchlist: updatedWatchlist });
    alert("Added to watchlist!");
    displayUserInfo();
  } catch (err) {
    console.error("Error adding to watchlist:", err);
  }
}

// ------------------- Init -------------------

fetchUserDetails();
