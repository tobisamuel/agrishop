import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { publicRequest } from "../api";
import { addProduct } from "../redux/cartRedux";
import Layout from "../Components/Layout";

const ProductPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch(); // used to dispatch redux actions

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("products/" + id);
        setProduct(res.data);
      } catch (error) {}
    };
    getProduct();
  });

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    const cart_id = new Date().getTime(); // create unique cart id and pass to action payload
    dispatch(addProduct({ ...product, quantity, cart_id })); // wrap action with dispatch
  };

  return (
    <Layout>
      <div className="grid grid-cols-8">
        <div className="col-span-4 flex justify-end">
          <img className="mr-10 w-3/4" src={product.img} />
        </div>
        <div className="col-span-4">
          <div className="bg-black p-1 inline-block">
            <h5 className="m-1 font-medium text-white">{product.vendor}</h5>
          </div>
          <h1 className="mb-2">{product.name}</h1>
          <p className="">{product.description}</p>
          <h4 className="my-4 text-3xl">&#8358;{product.price}</h4>
          <div className="flex items-center">
            <RemoveIcon
              onClick={() => handleQuantity("dec")}
              sx={{ cursor: "pointer" }}
            />
            <span className="mx-2 text-2xl">{quantity}</span>
            <AddIcon
              onClick={() => handleQuantity("inc")}
              sx={{ cursor: "pointer" }}
            />
          </div>
          <button
            className="px-6 py-4 mt-3 border-0 text-sm bg-teal-700 text-white rounded-lg"
            onClick={handleClick}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
