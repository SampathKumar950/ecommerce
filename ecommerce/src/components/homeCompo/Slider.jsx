// src/components/ImageSlider.js
import React, { useState, useEffect } from 'react';

const images = [
  'https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/54f94d29aa080c9c.jpg?q=20',
  'https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/272970cd025f101d.jpeg?q=20',
  'https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/f902d93baa1d9de5.jpg?q=20',
  'https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/54f94d29aa080c9c.jpg?q=20',
  'https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/272970cd025f101d.jpeg?q=20',
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto slide and progress logic
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 2;
        else {
          moveSlide(1);
          return 0;
        }
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [currentIndex]);

  // Move to next/prev slide
  const moveSlide = (direction) => {
    setProgress(0);
    setCurrentIndex((prevIndex) => (prevIndex + direction + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-[800px] mx-auto overflow-hidden">
      {/* Slider container with images */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full h-[500px] bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
        <button
          className="text-white text-4xl bg-black bg-opacity-50 rounded-full p-2"
          onClick={() => moveSlide(-1)}
        >
          &#10094;
        </button>
        <button
          className="text-white text-4xl bg-black bg-opacity-50 rounded-full p-2"
          onClick={() => moveSlide(1)}
        >
          &#10095;
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-gray-300 rounded-full">
        <div
          className="h-full bg-black rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ImageSlider;
