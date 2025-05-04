import Skeleton from "../skeleton";

const products = Array(4).fill(0);
const ProductSkeleton = () => {
  return (
    <>
      <h1 className="mb-7 ml-3 w-full text-xl font-bold">Products</h1>
      <div className="grid grid-cols-12 justify-items-center gap-6 gap-y-12">
        {products.map((_, index) => (
          <div
            className="xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
            key={index}
          >
            <Skeleton className="h-[192px] w-[192px]" />
            <div className="ml-3 mt-8 flex flex-col gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="mt-1 h-8 w-full rounded-full px-4 py-1" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ProductSkeleton;
