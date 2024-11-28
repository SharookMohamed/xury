var slides = document.querySelectorAll(".slider__image-div");
var paginationDiv = document.querySelector(".pagination__slide-div");
let currentSlide = 0;
let timer;
let isUserInteracting = false;

// Function to handle manual navigation and reset the timer
var manualNav = function (manual) {
  // Remove active class from all slides and buttons
  slides.forEach((slide) => slide.classList.remove("active__slider-div"));
  btns.forEach((btn) => btn.classList.remove("active__slider-div"));

  // Add active class to the selected slide and button
  slides[manual].classList.add("active__slider-div");
  btns[manual].classList.add("active__slider-div");

  currentSlide = manual; // Update the current slide index
  startAutoPlay(); // Restart autoplay
};

// Dynamically create pagination buttons
slides.forEach((_, index) => {
  let btn = document.createElement("button");
  btn.classList.add("bttn__pagination");
  if (index === 0) btn.classList.add("active__slider-div"); // Initialize first button as active
  paginationDiv.appendChild(btn);
});

var btns = document.querySelectorAll(".bttn__pagination");

// Add event listeners to pagination buttons
btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
  });
});

// Auto-play function with resettable timer
var startAutoPlay = function () {
  clearTimeout(timer); // Clear the existing timer

  timer = setTimeout(function () {
    // Remove active class from all slides and buttons
    slides.forEach((slide) => slide.classList.remove("active__slider-div"));
    btns.forEach((btn) => btn.classList.remove("active__slider-div"));

    // Increment currentSlide and reset if it exceeds the number of slides
    currentSlide = (currentSlide + 1) % slides.length;

    // Add active class to the current slide and button
    slides[currentSlide].classList.add("active__slider-div");
    btns[currentSlide].classList.add("active__slider-div");

    startAutoPlay(); // Continue the cycle
  }, 2000);
};

startAutoPlay(); // Start autoplay

// Variables to store touch start and end positions
let touchStartX = 0;
let touchEndX = 0;

// Function to handle swipe gestures
function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left (Next Slide)
    currentSlide = (currentSlide + 1) % slides.length;
  } else if (touchEndX > touchStartX + 50) {
    // Swipe right (Previous Slide)
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  }
  manualNav(currentSlide); // Update the slide
  startAutoPlay(); // Restart the timer
}

// Add touch event listeners for swipe functionality
slides.forEach((slide) => {
  slide.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    isUserInteracting = true;
    clearTimeout(timer); // Pause autoplay during interaction
  });
  slide.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    isUserInteracting = false;
  });

  // Prevent unintended timer reset during slight thumb scrolls
  slide.addEventListener("touchmove", (e) => {
    const touchMoveX = e.changedTouches[0].screenX;
    if (Math.abs(touchMoveX - touchStartX) > 10) {
      isUserInteracting = true;
      clearTimeout(timer); // Pause autoplay during significant scrolling
    }
  });
});

// Reset autoplay timer only when the user interaction ends
document.addEventListener("touchend", () => {
  if (!isUserInteracting) {
    startAutoPlay();
  }
});

// Variables
const bannerContainer = document.querySelector(".latest--pagination");
const bannerItems = document.querySelectorAll(".latest--work-div");
const paginationContainer = document.querySelector(".pagination-indicators");
let currentPageIndex = 0;
let autoScrollTimer; // Timer for auto-scroll

// Create Pagination Dots
bannerItems.forEach((_, index) => {
  const paginationDot = document.createElement("span");
  paginationDot.classList.add("indicator-dot");
  if (index === 0) paginationDot.classList.add("active");
  paginationDot.addEventListener("click", () => changePage(index));
  paginationContainer.appendChild(paginationDot);
});

// Update Pagination Dots
const updatePagination = () => {
  const dots = document.querySelectorAll(".indicator-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentPageIndex);
  });
};

// Change Page Function
const changePage = (index) => {
  currentPageIndex = index;

  // Hide all items
  bannerItems.forEach((item) => (item.style.display = "none"));

  // Show only the current item
  bannerItems[currentPageIndex].style.display = "block";

  // Update pagination dots
  updatePagination();

  // Restart auto-scroll timer
  startAutoScroll();
};

// Initialize Pagination
const initializePagination = () => {
  // Show the first item initially
  bannerItems.forEach((item, index) => {
    item.style.display = index === 0 ? "block" : "none";
  });

  // Start auto-scroll
  startAutoScroll();
};

// Auto-Scroll Function
const startAutoScroll = () => {
  clearTimeout(autoScrollTimer); // Clear any existing timer
  autoScrollTimer = setTimeout(() => {
    // Increment the page index
    currentPageIndex = (currentPageIndex + 1) % bannerItems.length;

    // Change to the next page
    changePage(currentPageIndex);
  }, 3000); // Change page every 3 seconds
};

// Call Initialization
initializePagination();
