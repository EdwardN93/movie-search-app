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

function displayFavoriteMovies() {
  const itemsWrapper = document.querySelector(".items-wrapper");
  itemsWrapper.innerHTML = ""; // clear existing

  const favoriteMovies = allMovies.filter((movie) =>
    currentUser.favorites.includes(movie.id)
  );

  favoriteMovies.forEach((movie) => {
    const htmlTemplate = `
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
                <li class="add-to-watchlist" data-id="${movie.id}">Watchlist</li>
                <li class="remove-from-favorites" data-id="${movie.id}">Remove</li>
              </ul>
            </div>
          </div>
        </div>
      </div>`;
    itemsWrapper.insertAdjacentHTML("beforeend", htmlTemplate);
  });
}

// ------------------- Events -------------------

function attachEventListeners() {
  document.querySelectorAll(".remove-from-favorites").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const movieId = Number(e.target.dataset.id);
      await removeFromFavorites(movieId);
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

    document.getElementById(`card-${movieId}`)?.remove();
    displayUserInfo();
  } catch (err) {
    console.error("Error removing favorite:", err);
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
