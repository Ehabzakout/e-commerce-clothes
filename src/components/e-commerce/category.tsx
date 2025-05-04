import { Link } from "react-router-dom";
import { category } from "./../../types/interfaces";

export const Category = ({ title, prefix, img }: category) => {
  return (
    <>
      <div className="group flex w-fit flex-col items-center gap-3 rounded-lg">
        <Link to={`products/${prefix}`}>
          <img
            className="h-44 w-44 rounded-full object-contain"
            src={img}
          ></img>
          <h1 className="mt-3 text-center text-lg font-semibold transition duration-200 group-hover:text-main dark:group-hover:text-darkHover">
            {title}
          </h1>
        </Link>
      </div>
    </>
  );
};
