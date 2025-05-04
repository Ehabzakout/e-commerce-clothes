import Lottie from "lottie-react";
import emptyItems from "../../assets/emptyItems.json";
export default function EmptyItems() {
  return (
    <div>
      <Lottie
        animationData={emptyItems}
        className="mx-auto w-[350px] text-center text-main"
      />
    </div>
  );
}
