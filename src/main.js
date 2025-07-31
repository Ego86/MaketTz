import Swiper from "swiper";
const tabs = document.querySelectorAll(".header__tab");
const cards = document.querySelectorAll(".card");
const cardsOverlay = document.querySelectorAll(".card-overlay");
const swiperContainer = document.querySelector(".swiper-container");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const cardsTitle = document.querySelectorAll(".card-overlay-title");

const paginationCards = (tab) => {
  const filterText = tab.textContent.toLowerCase();

  cards.forEach((card) => {
    const cardText = card.textContent.toLowerCase();

    const shouldShow = filterText === "all" || cardText.includes(filterText);

    card.classList.toggle("card--delete", !shouldShow);
  });
};

const handleClickTabs = () => {
  const classActive = "header__tab--active";
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      tabs.forEach((tab) => tab.classList.remove(classActive));
      e.target.classList.add(classActive);
      paginationCards(e.target);
    });
  });
};

const handleCardHover = () => {
  const classActive = "card-overlay--active";
  cards.forEach((card, index) => {
    card.addEventListener("mousemove", () => {
      cardsOverlay[index].classList.add(classActive);
    });
    card.addEventListener("mouseout", () => {
      cardsOverlay[index].classList.remove(classActive);
    });
  });
};

const swiper = new Swiper(swiperContainer, {
  slidesPerView: "auto",
  conteredSlides: false,
  freeMode: true,
  loop: true,
});

let swiperInitialized = false;

function updateSwiper() {
  if (window.innerWidth < 800) {
    if (!swiperInitialized) {
      swiper.init();
      swiperInitialized = true;
    }

    if (swiperWrapper.scrollWidth <= swiperContainer.clientWidth) {
      swiper.disable();
    } else {
      swiper.enable();
    }
  } else {
    swiper.disable();
    if (swiperInitialized) {
      swiper.destroy();
      swiperInitialized = false;
    }
  }
}
if (window.innerWidth > 800) {
  window.addEventListener("load", updateSwiper);
  window.addEventListener("resize", updateSwiper);
}
handleCardHover();
handleClickTabs();
paginationCards(tabs[0]);
