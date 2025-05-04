export interface category {
  id?: number;
  title: string;
  prefix: string;
  img: string;
}

export interface categories {
  records: category[];
  loading: "idle" | "pending" | "success" | "failed";
  error: string | null;
}

export interface product {
  id: number;
  title: string;
  price: string;
  cat_prefix: string;
  img: string;
  quantity?: number;
  max?: number;
  isLiked: boolean;
  isUser?: boolean;
}

export interface products {
  records: product[];
  loading: "idle" | "pending" | "success" | "failed";
  error: string | null;
}

export interface loadingProps {
  status: "idle" | "pending" | "success" | "failed";
  error: string | null;
  children: React.ReactNode;
  type?: "category" | "product" | "default";
}

export type TGridList<T> = {
  array: T[];
  renderItem: (record: T) => React.JSX.Element;
  title: string;
};

export interface ICart {
  item: { [key: number]: number };
  cartProducts: product[];
  loading: "idle" | "failed" | "success" | "pending";
  error: null | string;
}
export interface IWishlistItem {
  id: number;
  userId: number;
  itemId: number;
}

export interface IWishlist {
  items: number[];
  wishlistItems: product[];
  loading: "idle" | "failed" | "success" | "pending";
  error: null | string;
}

export type TSkeleton = {
  className?: string;
};
export type TOrder = {
  id: number;
  products: product[];
  subTotal: number;
  userId: number;
};
export type TOrders = {
  orders: TOrder[];
  loading: "idle" | "pending" | "success" | "failed";
  error: null | string;
};
