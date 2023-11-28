let currentIndex = 0;
let items;
let intervalId; 

const carousel = document.getElementById("carousel");
const carouselContainer = document.querySelector(".carousel-container");
const buttons = document.querySelectorAll(".button");
var firstProduct = null;

document.addEventListener("DOMContentLoaded", async function () {
  const indicatorsContainer = document.getElementById("indicators");
  
  const jsonData = [
    { src: "./assets/image1.webp", alt: "Product 1" },
    { src: "./assets/image2.jpg", alt: "Product 2" },
    { src: "./assets/image3.jpg", alt: "Product 3" },
    { src: "./assets/image4.jpg", alt: "Product 4" },
  ];

  let result = "";
  for (let i = 0; i < 9; i++) {
    result += `<div class="product-card" draggable="false">
    <img class="product-img" src="/assets/image${i%3+2}.jpg" alt="Product Image">
    <div class="product-info">
      <div class="product-name"> ${i+1}</div>
      <div class="product-price">$19.99</div>
      <div class="product-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </div>
    </div>`;
  }
   productCards.innerHTML=result
   firstProduct = await document.querySelector('.product-cards .product-card')
   buttons.forEach(icon => {
    icon.addEventListener("click", () => {
        
      let firstProductWidth = firstProduct.clientWidth + 10;

      // if clicked icon is left, reduce width value from the productCards scroll left else add to it
      productCards.scrollLeft += icon.id == "left-button" ? -firstProductWidth : firstProductWidth;
    });
  });
  console.log(firstProduct)
  function createCarouselItem(item, index) {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");

    const img = document.createElement("img");
    img.classList.add("carousel-img");
    img.src = item.src;
    img.alt = item.alt;

    carouselItem.appendChild(img);

    return carouselItem;
  }

  function createIndicator(index) {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    indicator.addEventListener("click", () => showSlide(index));

    return indicator;
  }

  function initializeCarousel() {
    jsonData.forEach((item, index) => {
      const carouselItem = createCarouselItem(item, index);
      const indicator = createIndicator(index);
      carousel.appendChild(carouselItem);
      indicatorsContainer.appendChild(indicator);
    });
    items = document.querySelectorAll(".carousel-item");
    updateIndicators();
  }

  initializeCarousel();
});
carouselContainer.addEventListener("mouseenter", pauseInterval);
carouselContainer.addEventListener("mouseleave", resumeInterval);
function pauseInterval() {
  clearInterval(intervalId);
}

function resumeInterval() {
  intervalId = setInterval(() => {
    nextSlide();
  }, 2000);
}

intervalId = setInterval(() => {
  nextSlide();
}, 2000);
function showSlide(index) {
  if (index < 0) 
    currentIndex = items.length - 1; // pressing back button from first
  else if (index >= items.length) 
    currentIndex = 0; // setInterval on last slide or pressing next button from last
  else 
    currentIndex = index;

  const newTransformValue = -currentIndex * 100 + "%";
  document.querySelector(".carousel").style.transform = `translateX(${newTransformValue})`;
  updateIndicators();
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function updateIndicators() {
  const indicators = document.querySelectorAll(".indicator");
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}





const productCards = document.querySelector(".product-cards")

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;


const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = productCards.scrollLeft;
}

const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    productCards.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    productCards.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
    isDragStart = false;
    productCards.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
}

productCards.addEventListener("mousedown", dragStart);
productCards.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
productCards.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
productCards.addEventListener("touchend", dragStop);