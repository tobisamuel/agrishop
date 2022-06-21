import Layout from "../Components/Layout";
import Slider from "../Components/Slider";
import Categories from "../Components/Categories";
import VendorAd from "../Components/VendorAd";
import NewProducts from "../Components/NewProducts";
import Newsletter from "../Components/Newsletter";

const Home = () => {
  return (
    <Layout>
      <Slider />
      <Categories />
      <VendorAd />
      <NewProducts />
      <Newsletter />
    </Layout>
  );
};

export default Home;
