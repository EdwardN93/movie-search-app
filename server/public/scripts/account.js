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

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const userData = await response.json();

    const userNameDisplay = document.querySelector(".profile-name");
    const favoriteMovies = document.querySelector(".favorites");
    const watchlist = document.querySelector(".watchlist");

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

const addToFavs = async () => {
  const loggedInUser = getLoggedInUser();
  const token = localStorage.getItem("token");

  if (!loggedInUser) return;

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
    body: JSON.stringify({ favorites: [505, 606, 707] }),
  };

  try {
    const response = await fetch(
      `http://192.168.1.137:3000/users/${loggedInUser.sub}`,
      options
    );

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const userData = await response.json();
    console.log(userData);

    userData.favorites.push(101, 202, 303);
  } catch (error) {
    console.error("Failed to fetch user details:", error);
  }
};

const addFavoritesToList = async () => {
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

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const userData = await response.json();
    console.log(userData);

    userData.favorites.forEach((element) => {
      const html = `
            <div id="card" class="item-card">
              <div class="card-image">
                <a href="#">
                  <img src="imgs/interstellar.jpg" alt="img" />
                </a>
              </div>
              <div class="card-details">
                <div class="details-wrapper">
                  <div class="movie-title">
                    <h2><a href="#">Movie Name</a></h2>
                    <span>21 oct 2020</span>
                  </div>
                  <div class="movie-description">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Architecto placeat itaque quibusdam nisi dolorum obcaecati
                      dignissimos? Assumenda, saepe vero? Nulla provident, in
                      voluptas at harum sed maxime tempora accusantium quasi.
                    </p>
                  </div>
                  <div class="action-bar">
                    <ul class="action-bar-list">
                      <li>Favorite</li>
                      <li>Watchlist</li>
                      <li>Remove</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
`;
    });

    userData.favorites.push(101, 202, 303);
  } catch (error) {
    console.error("Failed to fetch user details:", error);
  }
};

// addToFavs();

fetchUserDetails();
