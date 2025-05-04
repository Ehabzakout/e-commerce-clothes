import Loading from "@/components/common/loading";
import { getWishlistProducts } from "@/store/features/wishlist/thnk";
import { clearWishlistItems } from "@/store/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/store/Hooks";
import { useEffect } from "react";

import GridList from "@/components/common/gridList";
import Product from "@/components/e-commerce/product";

export default function WishList() {
  const dispatch = useAppDispatch();

  const { wishlistItems, items, loading, error } = useAppSelector(
    (store) => store.wishList,
  );
  const { item } = useAppSelector((store) => store.cart);
  useEffect(() => {
    const promise = dispatch(getWishlistProducts("products"));
    return () => {
      promise.abort();
      dispatch(clearWishlistItems());
    };
  }, [dispatch]);

  const newRecords = wishlistItems.map((product) => ({
    ...product,
    quantity: item[product.id] || 0,
    isLiked: items.includes(product.id),
    isUser: true,
  }));

  return (
    <div>
      <Loading status={loading} error={error}>
        <h1 className="mb-7 ml-3 text-xl font-bold">Your WishList:</h1>
        <GridList
          array={newRecords}
          title="Products"
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </div>
  );
}
