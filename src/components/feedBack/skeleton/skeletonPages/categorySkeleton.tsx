import Skeleton from "../skeleton";

const categoryItems = Array(4).fill(0);
const CategorySkeleton = () => {
  return (
    <>
      <h1 className="mb-7 ml-3 w-full text-xl font-bold">Categories</h1>
      <div className="grid grid-cols-12 justify-items-center gap-6 gap-y-12">
        {categoryItems.map((_, index) => (
          <div
            key={index}
            className="xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
          >
            <Skeleton className="h-44 w-44 rounded-full" />
            <Skeleton className="mx-auto mt-3 h-4 w-16" />
          </div>
        ))}
      </div>
    </>
  );
};

export default CategorySkeleton;
