import { Link } from "react-router-dom";
import backGroundImg from "../assets/clothes-shelf-rack-beige-pastel-background-social-media-store-3d-render_576429-49.avif";
import { useAppDispatch, useAppSelector } from "@/store/Hooks";
import { getCategories } from "@/store/features/categories/categorySlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const { records } = useAppSelector((store) => store.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <div className="relative">
        <img
          src={backGroundImg}
          className="w-full object-fill md:h-[80vh]"
        ></img>
        <div className="felx absolute top-1/2 -translate-y-1/2 xs:left-5 md:left-24">
          <h1 className="font-semibold xs:text-[9px] md:text-xs">
            Spring/Summer Collection
          </h1>
          <h1 className="my-3 w-2/3 font-bold xs:text-sm md:text-3xl">
            Get up to 30% Off New Arrivals
          </h1>
          <Link to={"/category"}>
            <button className="btn mt-3 bg-red-600 hover:bg-red-500 xs:text-sm md:text-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
      <div className="flex xs:flex-wrap md:flex-nowrap">
        {records.map((cat) => (
          <div
            key={cat.id}
            className="group mt-5 cursor-pointer text-center xs:w-1/3 md:w-1/4"
          >
            <Link to={`/category/products/${cat.title}`}>
              <img src={cat.img} className="w-full object-cover"></img>
              <h1 className="my-3 font-semibold group-hover:text-main">
                {cat.title}
              </h1>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
