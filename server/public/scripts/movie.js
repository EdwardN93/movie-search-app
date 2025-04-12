const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const btnAddToFavorites = document.querySelector(".btn-add-to-favorites");
const btnAddToWatchlist = document.querySelector(".btn-add-to-watchlist");
const btnAddToDislikes = document.querySelector(".btn-add-to-dislikes");

async function fetchMovieDetails() {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    };
    const response = await fetch(
      `http://192.168.1.137:3000/movies/${movieId}`,
      options
    );
    if (!response.ok) throw new Error("Movie not found");
    const movie = await response.json();

    document.querySelector(".movie-title").textContent = movie.title;
    document.querySelector(".movie-img").src = movie.img;
    document.querySelector(".movie-release").textContent = movie.released;
    document.querySelector(
      ".movie-rating"
    ).textContent = `Rating: ${movie.rating}`;
    document.querySelector(".movie-description").textContent = movie.overview;
  } catch (error) {
    console.error("Error loading movie:", error);
  }
}
function getToken() {
  const token = localStorage.getItem("token");
  if (token) return JSON.parse(token);
  else return 0;
}
getToken();
fetchMovieDetails();

async function addToFavorites() {
  const token = getToken();
  if (!token) return;

  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) return;

  const userId = loggedInUser.sub;

  const userRes = await fetch(`http://192.168.1.137:3000/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!userRes.ok) throw new Error("Failed to fetch user");

  const user = await userRes.json();

  if (!user.favorites.includes(Number(movieId))) {
    user.favorites.push(Number(movieId));

    await fetch(`http://192.168.1.137:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ favorites: user.favorites }),
    });

    alert("Added to favorites!");
  } else {
    alert("Already in favorites.");
  }
}

async function addToWatchlist() {
  const token = getToken();
  if (!token) return;

  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) return;

  const userId = loggedInUser.sub;

  const userRes = await fetch(`http://192.168.1.137:3000/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!userRes.ok) throw new Error("Failed to fetch user");

  const user = await userRes.json();

  if (!user.watchlist.includes(Number(movieId))) {
    user.watchlist.push(Number(movieId));

    await fetch(`http://192.168.1.137:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ watchlist: user.watchlist }),
    });

    alert("Added to Watchlist!");
  } else {
    alert("Already in Watchlist.");
  }
}

function getLoggedInUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const [, payload] = JSON.parse(token).split(".");
  return JSON.parse(atob(payload));
}

btnAddToFavorites.addEventListener("click", addToFavorites);
btnAddToWatchlist.addEventListener("click", addToWatchlist);
