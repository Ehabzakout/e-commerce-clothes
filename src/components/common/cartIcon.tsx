import { getCartItems } from "@/store/features/cart/cartSlice";
import { useAppSelector } from "@/store/Hooks";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const CartIcon = () => {
  const quantity = useAppSelector(getCartItems);
  const [pulse, setPulse] = useState("");
  useEffect(() => {
    if (quantity === 0) {
      setPulse("pulse");
      setTimeout(() => setPulse(""), 800);
      return;
    }

    setPulse("pulse");
    const bounce = setTimeout(() => setPulse(""), 800);
    return () => clearTimeout(bounce);
  }, [quantity]);

  return (
    <>
      <NavLink to="/cart" className="cartIcon">
        <div className="group relative mr-3 h-fit cursor-pointer">
          <div
            className={`${pulse} absolute bottom-[18px] left-3 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-main text-white`}
          >
            {quantity}
          </div>
          <i className="fa-solid fa-cart-shopping transform transition duration-300 group-hover:rotate-12 group-hover:text-main"></i>
        </div>
      </NavLink>
    </>
  );
};
