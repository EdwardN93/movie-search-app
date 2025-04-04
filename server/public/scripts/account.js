function getLoggedInUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const [, payload] = token.split(".");
  const decoded = JSON.parse(atob(payload));
  return decoded;
}

async function fetchUserDetails() {
  const loggedInUser = getLoggedInUser();
  const token = localStorage.getItem("token");

  if (!loggedInUser) return;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  };

  try {
    const response = await fetch(
      `http://192.168.1.137:3000/users/${loggedInUser.sub}`,
      options
    );
    const getMovies = await fetch(`http://192.168.1.137:3000/movies/`, options);

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const userData = await response.json();
    const moviesJSON = await getMovies.json();
    const filteredMovies = moviesJSON.filter((movie) =>
      userData.favorites.includes(movie.id)
    );

    const userNameDisplay = document.querySelector(".profile-name");
    const favoriteMovies = document.querySelector(".favorites");
    const watchlist = document.querySelector(".watchlist");
    const itemsWrapper = document.querySelector(".items-wrapper");

    filteredMovies.forEach((movie) => {
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
                <li class="add-to-watchlist">Watchlist</li>
                <li class="remove-from-favorites" data-id="${movie.id}">Remove</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      `;

      itemsWrapper.insertAdjacentHTML("beforeend", htmlTemplate);
    });

    document.querySelectorAll(".remove-from-favorites").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const movieId = Number(e.target.dataset.id);
        await removeFromFavorites(movieId);
      });
    });

    document.querySelector(".circle").textContent = String(
      userData.name.slice(0, 1).toUpperCase()
    );

    userNameDisplay.textContent = userData.name || "No Name Found";

    favoriteMovies.textContent =
      `Movies favorited: ${userData.favorites?.length}` ||
      "No favorites to show";
    watchlist.textContent =
      `Movies in watchlist: ${userData.watchlist?.length}` ||
      "Nothing in watchlist";
  } catch (error) {
    console.error("Failed to fetch user details:", error);
  }
}

async function removeFromFavorites(movieId) {
  const loggedInUser = getLoggedInUser();
  const token = localStorage.getItem("token");
  if (!loggedInUser) return;

  try {
    const res = await fetch(
      `http://192.168.1.137:3000/users/${loggedInUser.sub}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }
    );

    const user = await res.json();

    const updatedFavorites = user.favorites.filter((id) => id !== movieId);

    await fetch(`http://192.168.1.137:3000/users/${loggedInUser.sub}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify({ favorites: updatedFavorites }),
    });

    const card = document.getElementById(`card-${movieId}`);
    if (card) card.remove();
    window.location.reload();
  } catch (error) {
    console.error("Failed to remove from favorites:", error);
  }
}

fetchUserDetails();
