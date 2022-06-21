import { Link } from "react-router-dom";
import { categories } from "../data";

const Categories = () => {
  return (
    <div className="flex flex-col justify-center mt-5 h-1/2">
      <div className="flex justify-center">
        <h1 className="my-5 text-3xl text-teal-600 font-semibold">
          Top Categories
        </h1>
      </div>

      <div className="flex justify-evenly mt-0 mb-8 mx-3 pb-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex-1 m-3 h-40 rounder-md border-4 border-teal-600 relative"
          >
            <Link to={`/products/${category.cat}`}>
              <img
                className="w-full h-full object-cover opacity-40"
                src={category.img}
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                <h1 className="mb-3 text-4xl text-teal-800">
                  {category.title}
                </h1>
                <button className="p-3 bg-teal-600 text-white cursor-pointer">
                  SHOP NOW
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
