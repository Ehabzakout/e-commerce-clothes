import { product } from "@/types/interfaces";
import { useAppDispatch } from "@/store/Hooks";
import {
  addToCart,
  removeFromCart,
  clearFromCart,
} from "@/store/features/cart/cartSlice";

export const CartItem = (prop: product) => {
  const { title, price, cat_prefix, id, max, quantity } = prop;
  const dispatch = useAppDispatch();

  const deletItemFromCart = () => {
    if (quantity === 1) {
      dispatch(clearFromCart(id));
    } else dispatch(removeFromCart(id));
  };

  return (
    <div className="mr-5 mt-5 flex flex-wrap border-b-2 border-darkHover pb-5">
      <div className="xs:w-full md:w-fit">
        <img src="https://placehold.co/192x192" className="mx-auto" />
      </div>
      <div className="ml-3 flex flex-col gap-3 py-3 xs:w-1/2">
        <h1>{title}</h1>
        <h1 className="capitalize">
          <span className="font-bold">Category:</span> {cat_prefix}
        </h1>
        <h1 className="font-bold">Price: {Number(price)} EGP</h1>
        <button
          onClick={() => {
            dispatch(clearFromCart(id));
          }}
          className="btn mt-auto"
        >
          <i className="fa-solid fa-trash-can mr-2"></i> Remove
        </button>
      </div>
      <div className="ms-auto h-fit py-3 font-bold sm:w-fit">
        <h1 className="text-center">Quantity</h1>
        <div className="mt-5 flex justify-between gap-4">
          <h1
            onClick={() => {
              deletItemFromCart();
            }}
            className="cursor-pointer border-2 border-main px-3 text-xl hover:bg-[var(--main-color-hover)] hover:text-white dark:hover:bg-darkHover"
          >
            -
          </h1>
          <h1 className="">{quantity}</h1>
          <h1
            onClick={() => {
              if (quantity === max) return;
              dispatch(addToCart(id));
            }}
            className="flex cursor-pointer items-center border-2 border-main px-3 text-xl hover:bg-[var(--main-color-hover)] hover:text-white dark:hover:bg-darkHover"
          >
            +
          </h1>
        </div>
      </div>
      {quantity === max ? (
        <h1 className="ms-auto whitespace-pre-wrap break-words text-center font-semibold text-red-500">
          * You have reached the maximum quantity
        </h1>
      ) : (
        ""
      )}
    </div>
  );
};
