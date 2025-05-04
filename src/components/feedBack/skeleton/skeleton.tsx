import { TSkeleton } from "@/types/interfaces";

const Skeleton = ({ className = "" }: TSkeleton) => {
  return (
    <>
      <div
        className={`skeleton block ${className} relative overflow-hidden bg-zinc-200`}
      >
        <div className="animate-skeleton absolute left-[-50%] top-[-50%] block h-[300%] w-3/4 skew-x-[10deg] skew-y-[10deg] bg-zinc-100 opacity-70 shadow-xl"></div>
      </div>
    </>
  );
};

export default Skeleton;
