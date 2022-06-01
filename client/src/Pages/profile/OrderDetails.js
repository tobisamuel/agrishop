import "./orders.css";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/apiCalls";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const order = orders.find((product) => product._id === id);
  const orderProducts = order.products;

  return (
    <React.Fragment>
      <h1>Orders</h1>

      <div className="widgetLg">
        <h3 className="widgetLgTitle">Order Details</h3>
        <table className="widgetLgTable">
          <thead>
            <tr className="widgetLgTr">
              <th className="widgetLgTh">Name</th>
              <th className="widgetLgTh">Quantity</th>
              <th className="widgetLgTh">Price</th>
            </tr>
          </thead>

          <tbody>
            {orderProducts.map((product) => (
              <tr className="widgetLgTr" key={product.id}>
                <td className="widgetLgUser">
                  <span className="widgetLgName">
                    <Link color="inherit" href={`/product/${product.id}`}>
                      {product.name}
                    </Link>
                  </span>
                </td>
                <td className="widgetLgAmount">{product.quantity}</td>
                <td className="widgetLgAmount">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default OrderDetails;
