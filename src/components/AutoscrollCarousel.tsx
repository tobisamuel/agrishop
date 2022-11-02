import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import vendor from "../assets/vendor.jpg";
import fruits from "../assets/fruits.jpg";
import grains from "../assets/grains.jpg";
import vegetables from "../assets/vegetables.jpg";

const categories = [
  { image: vendor, name: "Become a Vendor", href: "/vendors" },
  { image: fruits, name: "Shop for fruits", href: "/" },
  { image: vegetables, name: "Shop for Vegetables", href: "/" },
  { image: grains, name: "Shop for Grains", href: "/" },
];

const items = Array.from(Array(6).keys());

const AutoscrollCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  //   const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const moveNext = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  useEffect(() => {
    if (carousel.current !== null) {
      // Set scrollLeft when index changes
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  return (
    <div className="main-container relative group">
      <div
        className="carousel-container w-full flex gap-2 overflow-x-auto scroll-smooth snap-x touch-pan-x scrollbar-hide"
        ref={carousel}
      >
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.href}
            className="shrink-0 carousel-item w-4/5 snap-center md:w-full"
          >
            <div className="relative w-full h-48 md:h-96">
              <img
                src={category.image}
                className="h-full w-full object-cover object-center"
                alt=""
              />
              <h3 className="absolute top-0 h-full w-full bg-black/50 flex justify-center items-center text-xl text-white md:text-7xl">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <button
        type="button"
        className="hidden absolute top-0 left-0 z-30 h-full px-4 cursor-pointer group group-hover:md:flex items-center justify-center focus:outline-none"
        onClick={movePrev}
      >
        <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-500 rounded-full group-hover:bg-gray-500/80 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <span className="bg-gray-100 sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="hidden absolute top-0 right-0 z-30 group-hover:md:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={moveNext}
      >
        <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-500 rounded-full group-hover:bg-gray-500/80 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          <span className="bg-gray-100 sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default AutoscrollCarousel;
