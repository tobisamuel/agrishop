import React from "react";
import Announcements from "../Components/Announcements";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import Categories from "../Components/Categories";
import VendorAd from "../Components/VendorAd";
import NewProducts from "../Components/NewProducts";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import { store } from "../redux/store";

const Home = () => {
  return (
    <div>
      <Announcements />
      <Navbar />
      <Slider />
      <Categories />
      <VendorAd />
      <NewProducts />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
