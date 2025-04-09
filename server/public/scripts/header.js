const header = document.querySelector(".header");

function headerTemplate() {
  const div = `<div class="over-nav">
    <div class="nav_wrapper">
      <nav id="navbar" class="navbar">
        <div id="logo-container" class="logo-container">
          <h2><a href="index.html">LOGO</a></h2>
        </div>
        <button class="hamburger">☰</button>
        <div id="links" class="links">
          <ul class="navbar-list">
            <li class="relative">
              <p>Movies</p>
              <div class="item_hover hidden">
                <ul>
                  <li><a href="all-movies.html">Popular</a></li>
                  <li>Now Playing</li>
                  <li>Upcoming</li>
                  <li>Top Rated</li>
                </ul>
              </div>
            </li>
            <li class="relative">
              <p>TV Shows</p>
              <div class="item_hover hidden">
                <ul>
                  <li>Popular</li>
                  <li>Airing Today</li>
                  <li>On Tv</li>
                  <li>Top Rated</li>
                </ul>
              </div>
            </li>

            <li class="relative">
              <p>Actors</p>
              <div class="item_hover hidden">
                <ul>
                  <li>Popular Actors</li>
                </ul>
              </div>
            </li>
            <li class="relative">
              <p>More</p>
              <div class="item_hover hidden">
                <ul>
                  <li>Discussions</li>
                </ul>
              </div>
            </li>
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
  </div>`;
  header.insertAdjacentHTML("beforeend", div);
}

headerTemplate();
