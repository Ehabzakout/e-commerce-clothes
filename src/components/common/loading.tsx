import { loadingProps } from "@/types/interfaces";
import CategorySkeleton from "../feedBack/skeleton/skeletonPages/categorySkeleton";
import ProductSkeleton from "../feedBack/skeleton/skeletonPages/productSkeleton";
import DefualtLoading from "../feedBack/defaultLoading";

const skeletonType = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  default: () => <DefualtLoading />,
};
const Loading = ({
  status,
  children,
  error,
  type = "default",
}: loadingProps) => {
  const Component = skeletonType[type];

  if (status === "pending")
    return (
      <div>
        <Component />
      </div>
    );
  if (status === "failed")
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <h1>Somthing went wrong </h1>
        {error && <h1>{error}</h1>}
      </div>
    );
  return <>{children}</>;
};

export default Loading;
