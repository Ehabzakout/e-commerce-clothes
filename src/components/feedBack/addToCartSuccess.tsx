import Lottie from "lottie-react";
import addToCart from "../../assets/addToCart.json";
export default function AddToCartSuccess() {
  return (
    <div>
      <Lottie
        animationData={addToCart}
        className="mx-auto w-[80px] text-center text-main"
      />
    </div>
  );
}
