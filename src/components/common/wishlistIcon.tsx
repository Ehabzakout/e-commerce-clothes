import { useAppSelector } from "@/store/Hooks";
import { NavLink } from "react-router-dom";

const WishlistIcon = ({ Icon }: { Icon?: string }) => {
  const { items } = useAppSelector((store) => store.wishList);
  const quantity = items.length;
  return (
    <>
      <div>
        {Icon === "header" ? (
          <NavLink to="/wishlist">
            <div className="group relative mr-3 h-fit cursor-pointer">
              <div
                className={`absolute bottom-[18px] left-3 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-main text-white`}
              >
                {quantity}
              </div>
              <i className="fa-solid fa-heart group-hover:text-main"></i>
            </div>
          </NavLink>
        ) : (
          <div>
            {Icon === "fill" ? (
              <i className="fa-solid fa-heart text-red-600 group-hover:text-main"></i>
            ) : (
              <i className="fa-regular fa-heart text-red-600"></i>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistIcon;
