import "./orders.css";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { vendorRequest } from "../../../api/index";
import { format } from "timeago.js";
import Link from "@mui/material/Link";

const Products = () => {
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.vendor.currentVendor);
  const businessName = vendor.businessName;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await vendorRequest.get("orders/");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  });

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <React.Fragment>
      <h1>Orders</h1>
      <div className="widgetSm">
        <table className="widgetLgTable">
          <thead>
            <tr className="widgetLgTr">
              <th className="widgetLgTh">ID</th>
              <th className="widgetLgTh">Date</th>
              <th className="widgetLgTh">Amount</th>
              <th className="widgetLgTh">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr className="widgetLgTr" key={order._id}>
                <td className="widgetLgUser">
                  <span className="widgetLgName">
                    <Link color="inherit" href={`orders/${order._id}`}>
                      {order._id}
                    </Link>
                  </span>
                </td>
                <td className="widgetLgDate">{format(order.createdAt)}</td>
                <td className="widgetLgAmount">&#8358;{order.amount}</td>
                <td className="widgetLgStatus">
                  <Button type={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Products;

//ffhfgfgfg
