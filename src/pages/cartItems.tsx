import { CartItem } from "@/components/e-commerce/cartItem";
import { getCartProducts } from "@/store/features/cart/cartSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/Hooks";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/common/loading";
import Total from "@/components/common/total";
import EmptyItems from "@/components/feedBack/empty";
import Dialog from "@/components/common/dialog";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { item, loading, error } = useAppSelector((store) => store.cart);
  const { cartProducts } = useAppSelector((store) => store.cart);
  useEffect(() => {
    const promise = dispatch(getCartProducts());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const Nav = useNavigate();
  const products = cartProducts.map((product) => ({
    ...product,
    quantity: item[product.id],
  }));
  const subTotal = products.reduce(
    (acc, cur) => acc + Number(cur.price) * cur.quantity,
    0,
  );
  return (
    <>
      <Loading status={loading} error={error}>
        <div className="ml-4">
          <div>
            {cartProducts.length > 0 ? (
              <div>
                <h1 className="mb-6 flex gap-5 font-bold text-main dark:text-white xs:text-lg md:text-xl">
                  Total Price for items is:
                  <Total product={products}></Total>
                </h1>
                {products.map((product) => (
                  <CartItem key={product.id} {...product} />
                ))}
                <div className="my-3 flex justify-between pb-3 pr-5 font-bold">
                  <h1>Total Price for Cart </h1>
                  {subTotal}
                </div>
                <div className="flex justify-between pb-3 pr-5 font-bold">
                  <h1>Discount </h1>
                  <h1>0</h1>
                </div>
                <div className="flex justify-between pb-3 pr-5 font-bold">
                  <h1>Total Price </h1>
                  {subTotal}
                </div>
                <div className="ms-auto w-fit">
                  <Dialog
                    NavTo="account/orders"
                    item="Confirm Order"
                    desc={`are you sure you want to place order with total price ${subTotal} EGP`}
                    confirm={true}
                    total={subTotal}
                  >
                    <h1 className="btn mt-4">Place Order</h1>
                  </Dialog>
                </div>
              </div>
            ) : (
              <div className="flex w-full flex-col items-center justify-center rounded-lg p-3 dark:bg-gray xs:h-44 md:h-[40vh]">
                <div className="mt-32 dark:hidden">
                  <EmptyItems />
                </div>
                <h1 className="mb-5 text-xl font-semibold">
                  Your Cart is Empty
                </h1>

                <button
                  className="btn xs:w-full sm:w-1/2"
                  onClick={() => {
                    Nav("/");
                  }}
                >
                  Go to Home page
                </button>
              </div>
            )}
          </div>
        </div>
      </Loading>
    </>
  );
};
export default Cart;
