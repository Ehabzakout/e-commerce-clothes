import { useEffect } from "react";
import OrdersTable from "./../components/common/table";
import { useAppDispatch, useAppSelector } from "@/store/Hooks";
import {
  clearOrders,
  getUserOrders,
} from "@/store/features/orders/ordersSlice";

const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((store) => store.orders);

  useEffect(() => {
    dispatch(getUserOrders());
    return () => {
      dispatch(clearOrders());
    };
  }, [dispatch]);

  return (
    <>
      {orders.length !== 0 ? (
        Array.isArray(orders) && (
          <div className="w-full">
            <OrdersTable orders={orders} />
          </div>
        )
      ) : (
        <p className="text-center font-semibold">
          You didn't make any order Yet
        </p>
      )}
    </>
  );
};

export default Orders;
