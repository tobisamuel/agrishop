import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDirect } from "../redux/cartRedux";

const Product = ({ product }) => {
  const dispatch = useDispatch(); // used to dispatch redux actions

  const handleCartClick = () => {
    const cart_id = new Date().getTime();
    const quantity = 1;
    dispatch(addDirect({ ...product, quantity, cart_id }));
  };

  return (
    <div className="">
      <div className="w-full h-60 bg-gray-200 rounded-md">
        <img
          src={product.img}
          alt={product.alt}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="flex justify-between p-2 bg-slate-100">
        <div>
          <h3 className="text-md text-gray-700">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h3>
          <p className="text-sm font-medium text-gray-900">
            &#8358;{product.price}
          </p>
        </div>
        <IconButton onClick={handleCartClick}>
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Product;
