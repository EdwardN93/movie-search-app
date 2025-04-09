const footer = document.querySelector(".footer");
function footerTemplate() {
  const div = `<nav class="footer-nav">
          <div class="basics">
            <h3>THE BASICS</h3>
            <ul>
              <li><a href="#">About Movis</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
          <div class="involved">
            <h3>GET INVOLVED</h3>
            <ul>
              <li><a href="#">Contribution</a></li>
              <li><a href="#">Add New Movie</a></li>
              <li><a href="#">Add New Tv Show</a></li>
            </ul>
          </div>
          <div class="community">
            <h3>COMMUNITY</h3>
            <ul>
              <li><a href="#">Guidelines</a></li>
              <li><a href="#">Discussion</a></li>
            </ul>
          </div>
          <div class="legal">
            <h3>LEGAL</h3>
            <ul>
              <li><a href="#">Term of Use</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </nav>
        <div class="copy">
          <span class="copy-text">&copy;Edwart </span>
          <span class="copy-text"> - Powered by TMDB - </span>
        </div>`;

  footer.insertAdjacentHTML("beforeend", div);
}

footerTemplate();
