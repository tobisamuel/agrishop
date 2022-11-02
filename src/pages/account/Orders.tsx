import { useState } from "react";
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import useFetchOrders from "../../hooks/useFetchOrders";
import Spinner from "../../components/spinner";

export const OrdersPage = () => {
  const [active, setActive] = useState("pending");
  const { data, isLoading } = useFetchOrders({ status: active });

  if (isLoading) return <Spinner />;

  return (
    <div className="px-2 py-4">
      <div>
        <h1 className="text-2xl">Orders</h1>
      </div>

      <div className="mt-2 flex items-center space-x-5 font-medium border-b-[0.5px]">
        <button
          className={`px-2 py-4 ${
            active === "pending" ? "border-b-2 border-slate-700" : ""
          }`}
          onClick={() => setActive("pending")}
        >
          Pending Orders
        </button>

        <button
          className={`px-2 py-4 ${
            active === "completed" ? "border-b-2 border-slate-700" : ""
          }`}
          onClick={() => setActive("completed")}
        >
          Completed Orders
        </button>
      </div>

      <div className="mt-5 min-h-[300px] rounded">
        {data ? (
          <div className="overflow-x-auto relative  shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-black border">
              <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-200 dark:text-black">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Order ID
                  </th>

                  <th scope="col" className="py-3 px-6">
                    Status
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((order) => (
                  <tr key={order._id} className="bg-white border-b ">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {order._id}
                    </th>
                    <td className="py-4 px-6">{order.status}</td>
                    <td className="py-4 px-6">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="pt-24 flex flex-col justify-center items-center">
            <span className="text-5xl text-slate-400">
              <FaClipboardList />
            </span>
            <span>You don&#39;t have any orders yet.</span>
            <Link to="/" className="text-red-500 underline">
              Continue Shopping
            </Link>
          </div>
        )}

        <div></div>
      </div>
    </div>
  );
};
