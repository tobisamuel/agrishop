import AutoscrollCarousel from "../components/AutoscrollCarousel";
import Layout from "../components/layout";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import fruits from "../assets/fruits.jpg";
import grains from "../assets/grains.jpg";
import vegetables from "../assets/vegetables.jpg";
import useFetchProducts from "../hooks/useFetchProducts";
import useAuth from "../hooks/useAuth";

const items = Array.from(Array(12).keys());

const categories = [
  { image: fruits, name: "Fruits" },
  { image: vegetables, name: "Vegetables" },
  { image: grains, name: "Grains" },
];

export const Store = () => {
  const { data: products, isLoading } = useFetchProducts();

  return (
    <Layout>
      <div className="bg-gray-200">
        <div className="pt-2 space-y-2 md:px-2 md:container md:mx-auto md:min-w-[1000px]">
          <div className="p-2 bg-white md:p-0">
            <AutoscrollCarousel />
          </div>

          <section className="p-2 bg-white">
            <h3 className="pb-2 text-lg font-semibold">Top Deals</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4">
              {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>

          <section className="bg-white overflow-hidden md:rounded">
            <h3 className="py-2 bg-gray-400 text-md text-center font-semibold">
              Featured Categories
            </h3>
            <div className="p-2 grid grid-cols-3 gap-2">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="relative w-full aspect-square md:h-52 md:aspect-auto"
                >
                  <img
                    src={category.image}
                    className="h-full w-full object-cover object-center"
                    alt={category.name}
                  />

                  <div className="absolute top-0 h-full w-full flex justify-center items-center bg-black/50 text-lg text-white md:text-2xl">
                    <span>{category.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white overflow-hidden md:rounded">
            <h3 className="p-2 bg-gray-400 text-md font-semibold">
              Popular Items
            </h3>

            <div className="p-2 bg-white">
              <Carousel>
                {items.map((index: number) => (
                  <div
                    key={index}
                    className="shrink-0 carousel-item relative w-[40%] h-48 bg-white flex justify-center items-center snap-start md:w-1/4 xl:w-1/5"
                  >
                    <img
                      src={grains}
                      className="h-full w-full object-cover object-center"
                      alt=""
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};
