import { useAppDispatch } from "@/store/Hooks";
import { product } from "@/types/interfaces";
import { addToCart } from "@/store/features/cart/cartSlice";
import { toggleToWishlistData } from "@/store/features/wishlist/wishlistSlice";
import { memo, useState } from "react";

import WishlistIcon from "../common/wishlistIcon";
import AddToCartSuccess from "../feedBack/addToCartSuccess";
import Dialog from "../common/dialog";

const Product = memo((prop: product) => {
  const { title, price, id, max = 0, quantity = 0, isLiked, isUser } = prop;
  const dispatch = useAppDispatch();
  const [disapled, setDisapled] = useState(false);
  const [pulse, setPulse] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const fill = isLiked ? "fill" : "";
  function addCartHandler() {
    if (quantity === max) {
      return;
    }
    dispatch(addToCart(id));
    setDisapled(true);
    setTimeout(() => setDisapled(false), 2000);
  }
  const upgradeWishlist = () => {
    setPulse("pulse");
    setIsloading(true);
    setTimeout(() => setPulse(""), 800);
    dispatch(toggleToWishlistData(id))
      .unwrap()
      .then(() => setIsloading(false))
      .catch(() => setIsloading(false));
  };
  return (
    <>
      <div className="relative flex w-fit flex-col gap-3 rounded-lg">
        <div className="relative mx-auto h-48 w-48 object-contain">
          {disapled && (
            <div className="absolute flex h-full w-full items-center justify-center bg-black bg-opacity-30">
              <AddToCartSuccess />
            </div>
          )}

          <img
            src={prop.img ? prop.img : "https://placehold.co/192x192"}
            alt={title}
            className="h-full w-full rounded-lg object-cover"
          ></img>
          <div className="absolute right-1 top-1 cursor-pointer">
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin text-main"></i>
            ) : (
              <>
                {!isUser ? (
                  <Dialog
                    NavTo="login"
                    item="Sorry you can't add items to wishlist"
                    desc="you should login to add items to your wishlist"
                  >
                    <WishlistIcon />
                  </Dialog>
                ) : (
                  <button
                    className={`${pulse} `}
                    onClick={() => upgradeWishlist()}
                  >
                    <WishlistIcon Icon={fill} />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="ml-3">
          <h1 className="mt-3 w-full text-lg font-semibold transition duration-200">
            {title}
          </h1>
          <h1>
            Price:<span className="ml-2 font-bold">{Number(price)} EGP</span>
          </h1>
          <h1 className="font-semibold text-red-500">
            Available Pieces: {max - quantity}
          </h1>
          {isUser ? (
            <button
              disabled={quantity === max || disapled}
              onClick={() => addCartHandler()}
              className="mt-3 w-full rounded-full bg-main px-4 py-1 font-bold text-white hover:bg-[var(--main-color-hover)] disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-[var(--main-dark-color-hover)]"
            >
              {disapled ? (
                <p>
                  <span>
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  </span>
                  <span>Loading</span>
                </p>
              ) : quantity === max ? (
                <p className="text-red-600">Not Available </p>
              ) : (
                <p>Add To Cart</p>
              )}
            </button>
          ) : (
            <Dialog
              NavTo="login"
              item="Sorry you can't add items to cart"
              desc="you should login to add items to your Cart"
            >
              <p className="mt-3 w-full rounded-full bg-main px-4 py-1 font-bold text-white hover:bg-[var(--main-color-hover)] disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-[var(--main-dark-color-hover)]">
                Add to Cart
              </p>
            </Dialog>
          )}
        </div>
      </div>
    </>
  );
});

export default Product;
