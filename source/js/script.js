// Открытие/Закрытие меню навигации

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

//---

// Открытие/Закрытие модального окна: Добавить в корзину

var modalAddToCart = document.querySelector(".modal-addtocart");
var modalAddToCartButtonOpen = document.querySelectorAll(".popular__order-button, .catalog__add-to-cart");
var modalAddToCartButtonClose = document.querySelector(".modal-addtocart__button-close");
var modalAddToCartChecked = document.querySelector(".modal-addtocart__radio[checked]");

  modalAddToCartButtonOpen.forEach.call(modalAddToCartButtonOpen, function(el) {
    el.addEventListener("click", function (evt) {
      evt.preventDefault();
      modalAddToCart.classList.add("modal-addtocart--show");
      setTimeout(modalAddToCartChecked.focus(), 1000);
    });
  });

  modalAddToCartButtonClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    modalAddToCart.classList.remove("modal-addtocart--show");

    window.addEventListener("keydown", function (esc) {
      if (esc.keyCode === 27) {
          esc.preventDefault();
          if (modalAddToCart.classList.contains("modal-addtocart--show")) {
            modalAddToCart.classList.remove("modal-addtocart--show");
          }
      }
    });
  });

//---
