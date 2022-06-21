import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeProduct,
  increaseQuantity,
  reduceQuantity,
} from "../redux/cartRedux";
import Layout from "../Components/Layout";
import styles from "./cart.module.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch(); // used to dispatch redux actions
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/checkout");
  };

  return (
    <Layout>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Cart</h1>
        <button
          className={styles.button}
          onClick={(e) => {
            navigate("/products/all");
          }}
        >
          Back to Shopping
        </button>

        <div className={styles.bottom}>
          <div className={styles.CartItemsContainer}>
            {cart.products.length === 0 ? (
              <h1 className={styles.cartMessage}>Your cart is empty</h1>
            ) : (
              cart.products.map((product, index) => (
                <div className={styles.CartItemContainer} key={index}>
                  <div className={styles.itemWrapper}>
                    <div className={styles.CartItem}>
                      <img className={styles.image} src={product.img} />
                      <div className={styles.details}>
                        <h4 className={styles.vendorName}>{product.vendor}</h4>
                        <h1 className={styles.productName}>{product.name}</h1>
                      </div>
                      <div className={styles.addContainer}>
                        <IconButton
                          sx={{ cursor: "pointer", m: "2px" }}
                          onClick={() => dispatch(removeProduct(product))}
                        >
                          <DeleteForeverIcon />
                        </IconButton>

                        <div className={styles.amountContainer}>
                          <IconButton
                            sx={{ cursor: "pointer", mr: "2px" }}
                            onClick={() => dispatch(reduceQuantity(product))}
                            disabled={product.quantity > 1 ? false : true}
                          >
                            <RemoveIcon />
                          </IconButton>

                          <span className={styles.amount}>
                            {product.quantity}
                          </span>

                          <IconButton
                            sx={{ cursor: "pointer", ml: "2px" }}
                            onClick={() => dispatch(increaseQuantity(product))}
                          >
                            <AddIcon />
                          </IconButton>
                        </div>
                      </div>
                      <h5 className={styles.price}>
                        &#8358;{product.price * product.quantity}
                      </h5>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.summaryDetails}>
            <h3 className={styles.total}>Total: </h3>
            <h2 className={styles.summaryTitle}>&#8358;</h2>
            <h5 className={styles.subTotal}>{cart.total}</h5>
          </div>

          {user ? (
            <button className={styles.button} onClick={handleClick}>
              Proceed to Checkout
            </button>
          ) : (
            <h2 styles={styles.summaryTitle}>Log in to proceed</h2>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
