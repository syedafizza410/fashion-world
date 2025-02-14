"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import img1 from "../pic/image/carsol1.jpg"
import img2 from "../pic/image/carsol4.jpg"
import img3 from "../pic/image/carsol5.jpg"
import img4 from "../pic/image/carsol6.jpg"

const Carousel = () => {
  const totalSlides = 4;
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Function to set slide based on hash
  const setSlideFromHash = () => {
    const hash = window.location.hash;
    if (hash.startsWith("#slide")) {
      const slideNumber = parseInt(hash.replace("#slide", ""), 10);
      if (!isNaN(slideNumber) && slideNumber >= 1 && slideNumber <= totalSlides) {
        setCurrentSlide(slideNumber);
      }
    }
  };

  useEffect(() => {
    // Initial slide setup based on hash
    setSlideFromHash();

    // Function to handle hash changes
    const handleHashChange = () => {
      setSlideFromHash();
    };

    // Function to handle scroll
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsAutoplay(true);
      } else {
        setIsAutoplay(false);
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    // Add hash change listener
    window.addEventListener("hashchange", handleHashChange);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    let interval = null;

    if (isAutoplay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => {
          const nextSlide = prev % totalSlides + 1;
          window.location.hash = `slide${nextSlide}`;
          return nextSlide;
        });
      }, 5000); // 5 seconds interval
    } else if (!isAutoplay && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoplay]);

  return (
    <div className="carousel w-full">
      {/* Slide #1 */}
    
      <div
        id="slide1"
        className={`carousel-item relative w-full ${currentSlide === 1 ? "block" : "hidden"}`}
      >
        <Image alt="img1" src={img1} className="w-full" width={400} height={150} />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle" aria-label="Previous Slide">❮</a>
          <a href="#slide2" className="btn btn-circle" aria-label="Next Slide">❯</a>
        </div>
      </div>

      {/* Slide #2 */}
      <div
        id="slide2"
        className={`carousel-item relative w-full ${currentSlide === 2 ? "block" : "hidden"}`}
      >
        <Image alt="img2" src={img2} className="w-full"  width={400} height={150}/>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle" aria-label="Previous Slide">❮</a>
          <a href="#slide3" className="btn btn-circle" aria-label="Next Slide">❯</a>
        </div>
      </div>

      {/* Slide #3 */}
      <div
        id="slide3"
        className={`carousel-item relative w-full ${currentSlide === 3 ? "block" : "hidden"}`}
      >
        <Image alt="img3" src={img3} className="w-full"  width={400} height={150} />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle" aria-label="Previous Slide">❮</a>
          <a href="#slide4" className="btn btn-circle" aria-label="Next Slide">❯</a>
        </div>
      </div>

      {/* Slide #4 */}
      <div
        id="slide4"
        className={`carousel-item relative w-full ${currentSlide === 4 ? "block" : "hidden"}`}
      >
        <Image alt="img4" src={img4} className="w-full"  width={400} height={150} />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle" aria-label="Previous Slide">❮</a>
          <a href="#slide1" className="btn btn-circle" aria-label="Next Slide">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
