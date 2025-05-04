import GridList from "@/components/common/gridList";
import Loading from "@/components/common/loading";
import { Category } from "@/components/e-commerce/category";

import { useAppDispatch, useAppSelector } from "@/store/Hooks";
import {
  clearCategories,
  getCategories,
} from "@/store/features/categories/categorySlice";
import { useEffect } from "react";
const Categories = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (store) => store.categories,
  );
  useEffect(() => {
    dispatch(getCategories());
    return () => {
      dispatch(clearCategories());
    };
  }, [dispatch]);

  return (
    <>
      <Loading status={loading} error={error} type="category">
        <h1 className="mb-7 ml-3 w-full text-xl font-bold">Categories</h1>
        <GridList
          title="Categries"
          array={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </>
  );
};

export default Categories;
