function renderFooter() {
  const footer = document.querySelector(".footer");
  if (!footer) return;

  const sections = [
    {
      title: "THE BASICS",
      items: ["About Movis", "Contact Us", "Support", "Status"],
    },
    {
      title: "GET INVOLVED",
      items: ["Contribution", "Add New Movie", "Add New Tv Show"],
    },
    {
      title: "COMMUNITY",
      items: ["Guidelines", "Discussion"],
    },
    {
      title: "LEGAL",
      items: ["Term of Use", "Privacy Policy"],
    },
  ];

  const footerNav = sections
    .map((section) => createFooterSection(section.title, section.items))
    .join("");

  const template = `
    <nav class="footer-nav">
      ${footerNav}
    </nav>
    <div class="copy">
      <span class="copy-text">&copy;Edwart</span>
      <span class="copy-text"> - Powered by TMDB - </span>
    </div>
  `;

  footer.insertAdjacentHTML("beforeend", template);
}

function createFooterSection(title, links) {
  return `
    <div class="${title.toLowerCase().replace(/\s+/g, "-")}">
      <h3>${title}</h3>
      <ul>
        ${links.map((link) => `<li><a href="#">${link}</a></li>`).join("")}
      </ul>
    </div>
  `;
}

renderFooter();
