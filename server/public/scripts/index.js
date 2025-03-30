console.log("Movies working");

const relativeItem = document.querySelectorAll(".relative");
const itemHover = document.querySelectorAll(".item_hover");
const moviesList = document.querySelector(".movies-list");

const copyText = document.querySelector(".copy-text"); // for footer span

relativeItem.forEach((element) => {
  element.addEventListener("mouseover", (e) => {
    element.querySelector("div").classList.remove("hidden");
  });
  element.addEventListener("mouseout", () => {
    element.querySelector("div").classList.add("hidden");
  });
});

copyText.textContent += new Date().getFullYear();

async function getMoviesAndDisplay() {
  try {
    const url = "http://localhost:3000/movies";
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();

    data.forEach((movie) => {
      const li = document.createElement("li");
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getMoviesAndDisplay();
