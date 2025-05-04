import Product from "@/components/e-commerce/product";
import { getProducts } from "@/store/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/store/Hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { productsAction } from "@/store/features/products/productSlice";
import Loading from "@/components/common/loading";
import GridList from "@/components/common/gridList";

const Products = () => {
  const { prefix } = useParams();
  const dispatch = useAppDispatch();
  const { item } = useAppSelector((store) => store.cart);
  const { items } = useAppSelector((store) => store.wishList);
  const { records, loading, error } = useAppSelector((store) => store.products);
  const user = useAppSelector((store) => store.auth.user);
  const newRecords = records.map((product) => ({
    ...product,
    quantity: item[product.id] || 0,
    isLiked: items.includes(product.id),
    isUser: user !== null,
  }));
  useEffect(() => {
    const promise = dispatch(getProducts(prefix as string));

    return () => {
      promise.abort();
      dispatch(productsAction.clearProducts());
    };
  }, [dispatch, prefix]);

  return (
    <>
      <Loading status={loading} error={error} type="product">
        <h1 className="mb-7 ml-3 text-xl font-bold">
          <span className="font-semibold capitalize">{prefix}</span> Products
        </h1>
        <GridList
          array={newRecords}
          title="Products"
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Products;
