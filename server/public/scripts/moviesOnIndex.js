async function getMoviesAndDisplay() {
  const moviesList = document.querySelector(".movies-list");
  const mainContainer = document.querySelectorAll(".main-container");

  if (!moviesList) {
    console.log("Error: .movies-list not found in DOM");
  }
  moviesList.innerHTML = "<p>Loading movies...</p>";

  try {
    if (getToken()) {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const url = "http://192.168.1.137:3000/movies";
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      const data = await response.json();

      moviesList.innerHTML = "";

      data.forEach((movie) => {
        moviesList.insertAdjacentHTML("beforeend", getMovies(movie));
      });
      console.log(data);
    } else {
      mainContainer.forEach((el) => {
        el.innerHTML = "";
      });
      mainContainer.textContent = "Need to log in";
      document.querySelector("#container-pop").textContent =
        "Need to log in to show movies";
    }
  } catch (error) {
    console.log(error);
  }
}

async function getTopRated() {
  const topRatedList = document.querySelector(".top-rated");

  if (!topRatedList) {
    console.log("Error: .movies-list not found in DOM");
    return;
  }
  // moviesList.innerHTML = "<p>Loading movies...</p>";

  try {
    if (getToken()) {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const url = "http://192.168.1.137:3000/movies?_sort=rating&_order=desc";
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      const data = await response.json();

      topRatedList.innerHTML = "";

      data.forEach((movie) => {
        topRatedList.insertAdjacentHTML("beforeend", getMovies(movie));
      });
      console.log(data);
    } else {
      topRatedList.innerHTML = "";
    }
  } catch (error) {
    console.log(error);
  }
}

getMoviesAndDisplay();
getTopRated();

function getMovies(movie) {
  return `
<div class="movie-card">
    <div>
        <a href="#">
            <img src="${movie.img}" alt="${movie.title}" />
        </a>
    </div>
    <div class="movie-info">
        <a href="#">${movie.title}</a>
            <p>${movie.released}</p>
            <p>Rating: ${movie.rating}</p>
    </div>
</div>
`;
}

function getToken() {
  const token = localStorage.getItem("token");
  if (token) return JSON.parse(token);
  else return 0;
}
getToken();
