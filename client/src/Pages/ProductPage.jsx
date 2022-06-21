import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { publicRequest } from "../api";
import { addProduct } from "../redux/cartRedux";
import Layout from "../Components/Layout";
import styles from "./productpage.module.css";

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
      <div className={styles.wrapper}>
        <div className={styles.imgContainer}>
          <img className={styles.image} src={product.img} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.vendorDiv}>
            <h5 className={styles.vendorName}>{product.vendor}</h5>
          </div>
          <h1>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          <h4 className={styles.price}>&#8358;{product.price}</h4>
          <div className={styles.addContainer}>
            <div className={styles.amountContainer}>
              <RemoveIcon
                onClick={() => handleQuantity("dec")}
                sx={{ cursor: "pointer" }}
              />
              <span className={styles.amount}>{quantity}</span>
              <AddIcon
                onClick={() => handleQuantity("inc")}
                sx={{ cursor: "pointer" }}
              />
            </div>
            <button className={styles.button} onClick={handleClick}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
