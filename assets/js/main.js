document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector(".navbar");

    function updateStyles() {
        var scrollPosition = window.pageXOffset || document.documentElement.scrollTop;
        var isWideScreen = (window.innerWidth || document.documentElement.clientWidth) > 768;
        var scrollThreshold = 100;

        header.classList.toggle("fixed", isWideScreen && scrollPosition > scrollThreshold);

        document.querySelectorAll(".menu-bar ul li a").forEach(item => {
            item.style.color = isWideScreen && scrollPosition > scrollThreshold ? "#154171" : "";
            item.style.fontWeight = isWideScreen && scrollPosition > scrollThreshold ? "500" : "";
        });

        document.querySelectorAll(".fa-solid.fa-caret-down").forEach(icon => {
            icon.style.color = isWideScreen && scrollPosition > scrollThreshold ? "#154171" : "";
        });

        document.querySelectorAll(".fa-solid.fa-magnifying-glass").forEach(icon => {
            icon.style.color = isWideScreen && scrollPosition > scrollThreshold ? "#fff" : "";
        });

        var logo = document.querySelector(".logo");
        if (logo) {
            logo.style.cssText = isWideScreen && scrollPosition > scrollThreshold ? "background: #154171; padding: 5px 10px; border-radius: 50px 0px 50px 50px;" : "";
        }
    }

    function handleDropdownHover() {
        document.querySelectorAll(".dropdown-menu ul li a").forEach(item => {
            item.addEventListener("mouseover", () => item.style.color = "#fff");
            item.addEventListener("mouseout", () => item.style.color = "");
        });
    }    

    updateStyles();
    window.addEventListener("resize", updateStyles);
    window.addEventListener("scroll", updateStyles);
    handleDropdownHover();
});



// Mobile Menu
console.clear();

const navExpand = document.querySelectorAll('.nav-expand');
const backLink = `<li class="nav-item"><a class="nav-link nav-back-link" href="javascript:;"><i class="fa-solid fa-caret-left"></i></a></li>`;

navExpand.forEach(item => {
  item.querySelector('.nav-expand-content').insertAdjacentHTML('afterbegin', backLink);
  item.querySelector('.nav-link').addEventListener('click', () => item.classList.toggle('active'));
  item.querySelector('.nav-back-link').addEventListener('click', () => item.classList.remove('active'));
});

document.getElementById('ham').addEventListener('click', () => document.body.classList.toggle('nav-is-toggled'));




"use strict";

    // Select all slides
    const slides = document.querySelectorAll(".slide");
    const slider = document.querySelector(".slider");

    // Clone the first and last slides
    const firstSlide = slides[0].cloneNode(true);
    const lastSlide = slides[slides.length - 1].cloneNode(true);

    // Append the first slide to the end and prepend the last slide to the beginning
    slider.appendChild(firstSlide);
    slider.insertBefore(lastSlide, slides[0]);

    // Select all slides again including the cloned ones
    const allSlides = document.querySelectorAll(".slide");

    // Initialize current slide counter and max slide count
    let curSlide = 1;
    const maxSlide = slides.length;

    // Set the initial translateX for each slide including the cloned ones
    allSlides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${(indx - curSlide) * 100}%)`;
    });

    // Select next and previous slide buttons
    const nextSlide = document.querySelector(".slide-btn-next");
    const prevSlide = document.querySelector(".slide-btn-prev");

    // Function to update slide positions
    const updateSlides = () => {
      allSlides.forEach((slide, indx) => {
        slide.style.transition = 'transform 0.5s';
        slide.style.transform = `translateX(${(indx - curSlide) * 100}%)`;
      });
    };

    // Function to go to the next slide
    const goToNextSlide = () => {
      if (curSlide >= maxSlide) {
        curSlide++;
        updateSlides();
        setTimeout(() => {
          allSlides.forEach((slide, indx) => {
            slide.style.transition = 'none';
            slide.style.transform = `translateX(${(indx - 1) * 100}%)`;
          });
          curSlide = 1;
        }, 500);
      } else {
        curSlide++;
        updateSlides();
      }
    };

    // Function to go to the previous slide
    const goToPrevSlide = () => {
      if (curSlide <= 0) {
        curSlide--;
        updateSlides();
        setTimeout(() => {
          allSlides.forEach((slide, indx) => {
            slide.style.transition = 'none';
            slide.style.transform = `translateX(${(indx - maxSlide) * 100}%)`;
          });
          curSlide = maxSlide;
        }, 500);
      } else {
        curSlide--;
        updateSlides();
      }
    };

    // Event listeners for next and previous slide buttons
    nextSlide.addEventListener("click", goToNextSlide);
    prevSlide.addEventListener("click", goToPrevSlide);

    // Auto-slide functionality
    setInterval(goToNextSlide, 5000);
