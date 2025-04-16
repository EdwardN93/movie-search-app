function renderHeader() {
  const header = document.querySelector(".header");
  if (!header) return;

  const template = `
    <div class="over-nav">
      <div class="nav_wrapper">
        <nav id="navbar" class="navbar">
          <div id="logo-container" class="logo-container">
            <h2><a href="index.html">MIVIE</a></h2>
          </div>
          <button class="hamburger">☰</button>
          <div id="links" class="links">
            <ul class="navbar-list">
              ${createNavItem("Movies", [
                `<a href="all-movies.html">Popular</a>`,
                // "Now Playing",
                // "Upcoming",
                // "Top Rated",
              ])}
              ${createNavItem("TV Shows", [
                "Popular",
                "Airing Today",
                "On Tv",
                "Top Rated",
              ])}
              ${createNavItem("Actors", ["Popular Actors"])}
              ${createNavItem("More", ["Discussions"])}
            </ul>
          </div>
        </nav>
      </div>
      <div class="sub_media">
        <ul class="primary">
          <li id="refSign"><a href="sign-up.html">Sign Up</a></li>
          <li id="refLog"><a href="log-in.html">Login</a></li>
          <li>Join Movies</li>
          <li>Search</li>
        </ul>
      </div>
    </div>
  `;
  header.insertAdjacentHTML("beforeend", template);
}

function createNavItem(title, items) {
  return `
    <li class="relative">
      <p>${title}</p>
      <div class="item_hover hidden">
        <ul>
          ${items.map((i) => `<li>${i}</li>`).join("")}
        </ul>
      </div>
    </li>
  `;
}

renderHeader();
