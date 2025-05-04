import Lottie from "lottie-react";
import Loading from "../../assets/Loading.json";

const DefualtLoading = () => {
  return (
    <Lottie
      animationData={Loading}
      className="mx-auto mt-24 w-[300px] text-center text-main"
    />
  );
};

export default DefualtLoading;
