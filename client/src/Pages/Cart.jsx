import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeProduct,
  increaseQuantity,
  reduceQuantity,
} from "../redux/cartRedux";
import Layout from "../Components/Layout";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch(); // used to dispatch redux actions
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="mb-8">
        <div className="grid grid-cols-3 gap-4 mx-5">
          <div className="col-span-2 h-auto bg-gray-100">
            <h1 className="text-2xl px-6 py-2 font">Cart</h1>
            {cart.products.length === 0 ? (
              <h1 className="mx-6 text-lg">Your cart is empty</h1>
            ) : (
              cart.products.map((product, index) => (
                <div
                  className="flex justify-between items-center py-5 my-2 mx-6"
                  key={index}
                >
                  <div className="flex">
                    <img className="w-40 h-full" src={product.img} />
                    <div className="ml-2">
                      <Link to={`/product/${product._id}`}>
                        <h1 className="text-lg">{product.name}</h1>
                      </Link>
                      <h4 className="">{product.vendor}</h4>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex justify-center items-center">
                      <IconButton
                        sx={{ cursor: "pointer", mr: "2px" }}
                        onClick={() => dispatch(reduceQuantity(product))}
                        disabled={product.quantity > 1 ? false : true}
                      >
                        <RemoveIcon />
                      </IconButton>

                      <span className="text-lg">{product.quantity}</span>

                      <IconButton
                        sx={{ cursor: "pointer", ml: "2px" }}
                        onClick={() => dispatch(increaseQuantity(product))}
                      >
                        <AddIcon />
                      </IconButton>
                    </div>

                    <h5 className="text-2xl">
                      &#8358;{product.price * product.quantity}
                    </h5>

                    <IconButton
                      sx={{ cursor: "pointer", m: "2px" }}
                      onClick={() => dispatch(removeProduct(product))}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div className="bg-gray-100 h-72 px-4 py-2">
            <h1 className="text-2xl">Summary</h1>
            <div className="text-xl">
              <span>Subtotal: </span>
              <span className="font-semibold">&#8358;{cart.total}</span>
            </div>

            {user ? (
              <Link to="/checkout">
                <button className="p-2 mt-2 bg-teal-700 text-white rounded-md">
                  Proceed to Checkout
                </button>
              </Link>
            ) : (
              <h2>Log in to proceed</h2>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
