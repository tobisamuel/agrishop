import "./orders.css";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/apiCalls";
import { format } from "timeago.js";
import Link from "@mui/material/Link";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <React.Fragment>
      <h1>Orders</h1>

      <div className="widgetLg">
        <h3 className="widgetLgTitle">Latest transactions</h3>
        <table className="widgetLgTable">
          <thead>
            <tr className="widgetLgTr">
              <th className="widgetLgTh">Id</th>
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

export default Orders;
