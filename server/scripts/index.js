console.log("Movies working");

const relativeItem = document.querySelectorAll(".relative");
const itemHover = document.querySelectorAll(".item_hover");

relativeItem.forEach((element) => {
  element.addEventListener("mouseover", (e) => {
    element.querySelector("div").classList.remove("hidden");
  });
  element.addEventListener("mouseout", () => {
    element.querySelector("div").classList.add("hidden");
  });
});
