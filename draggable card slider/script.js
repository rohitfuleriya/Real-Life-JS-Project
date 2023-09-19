const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
  StartX,
  startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// insert copies of the last fer cas to beginning of carousel  for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// insert copies of the last fer card to end of carousel  for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft +=
      btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const draggStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor position of the carousel
  StartX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (isDragging) return; // if isDragging is true, return from here
  carousel.scrollLeft = startScrollLeft - (e.pageX - StartX);
};

const draggStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const autoPlay = () =>{
    if(window.innerWidth < 800) return // return if window is smaller then 800
    // AutoPlay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

const infiniteScroll = () => {
  // if the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollLeft - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
    // if the carousel is at the end, scroll to the beginning
} else if (
    Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
// Clear exiting timeout & start auotplay if mouse is not havering over carou   sel
  clearTimeout(timeoutId);
  if(!wrapper.matches(":hover")) autoPlay();
};

carousel.addEventListener("mousedown", draggStart);
// Comment out the mousemove event listener to disable automatic scrolling
// carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", draggStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () =>clearTimeout(timeoutId));
carousel.addEventListener("mouseleave", autoPlay);
