import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "../darkMode/mode-toggle";
import { CartIcon } from "./cartIcon";
import WishlistIcon from "./wishlistIcon";
import { useAppDispatch, useAppSelector } from "@/store/Hooks";
import DropDownMenu from "./dropDown";
import { getWishlistProducts } from "@/store/features/wishlist/thnk";
import { useEffect } from "react";

export const Header = () => {
  const { user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getWishlistProducts("productIDs"));
  }, [dispatch, user?.accessToken]);
  return (
    <>
      <div className="top:0 fixed left-0 right-0 z-50 bg-white px-5 pt-5 dark:bg-[#09090b]">
        <div className="mb-5 flex items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold">
              Our
              <span className="mx-2 rounded-md bg-[#2abef4] px-3 font-bold text-white">
                Ecom
              </span>
            </h1>
          </Link>
          <div>
            <ModeToggle />
          </div>
          {user && (
            <div className="ms-auto flex h-fit gap-6">
              <WishlistIcon Icon="header" />
              <CartIcon />
            </div>
          )}
        </div>
        <div className="flex h-12 items-center justify-between rounded-md bg-zinc-100 px-3 py-2 dark:bg-gray">
          <div className="header flex items-center gap-3 font-semibold">
            <NavLink to="/">
              <h1>Home</h1>
            </NavLink>
            <NavLink to="/category">
              <h1>Categories</h1>
            </NavLink>
          </div>
          {user ? (
            <DropDownMenu user={user.user.first_name} />
          ) : (
            <div className="header flex gap-3">
              <NavLink to="/login">
                <h1>Login</h1>
              </NavLink>
              <NavLink to="/register">
                <h1>Register</h1>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
