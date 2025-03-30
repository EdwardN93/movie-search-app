async function getMoviesAndDisplay() {
  const moviesList = document.querySelector(".movies-list");

  try {
    const url = "http://192.168.1.137:3000/movies";
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();

    data.forEach((movie) => {
      moviesList.insertAdjacentHTML("beforeend", getMovies(movie));
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getMoviesAndDisplay();

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
    </div>
</div>
`;
}
