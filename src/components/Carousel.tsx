import { useState, useRef, useEffect, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Carousel = ({ children }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const scrollWidth = useRef(0);

  const moveNext = () => {
    if (
      carousel.current !== null &&
      scrollWidth.current >= carousel.current.offsetWidth * 0.75 * currentIndex
    ) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const isDisabled = (direction: string) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * 0.75 * currentIndex >=
        scrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel.current !== null) {
      // Set remaining scrollWidth
      scrollWidth.current =
        carousel.current.scrollWidth - carousel.current.offsetWidth;

      // Set scrollLeft when index changes
      carousel.current.scrollLeft =
        carousel.current.offsetWidth * 0.75 * currentIndex;
    }
  }, [currentIndex]);

  return (
    <div className="main-container relative group">
      <div
        className="carousel-container w-full flex gap-2 overflow-x-auto scroll-smooth snap-x touch-pan-x scrollbar-hide"
        ref={carousel}
      >
        {children}
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

export default Carousel;
