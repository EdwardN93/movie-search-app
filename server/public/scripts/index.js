const relativeItem = document.querySelectorAll(".relative");
const itemHover = document.querySelectorAll(".item_hover");

const copyText = document.querySelector(".copy-text");

relativeItem.forEach((element) => {
  element.addEventListener("mouseover", (e) => {
    element.querySelector("div").classList.remove("hidden");
  });
  element.addEventListener("mouseout", () => {
    element.querySelector("div").classList.add("hidden");
  });
});

document.querySelector(".hamburger").addEventListener("click", function () {
  document.querySelector(".navbar-list").classList.toggle("show");
});

copyText.textContent += new Date().getFullYear();
