var popupMenu = document.querySelector(".main-nav");
var popupMenuToggle = document.querySelector(".main-nav__toggle");

popupMenu.classList.remove("main-nav--nojs");


popupMenuToggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (popupMenu.classList.contains("main-nav--close")) {
    popupMenu.classList.add("main-nav--open");
    popupMenu.classList.remove("main-nav--close");
  } else {
    popupMenu.classList.add("main-nav--close");
    popupMenu.classList.remove("main-nav--open");
  }
});
