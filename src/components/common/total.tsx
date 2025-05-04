import { product } from "@/types/interfaces";

export default function Total({ product }: { product: product[] }) {
  const totalPrice =
    product &&
    product?.reduce((acc, cur) => {
      return acc + Number(cur.price) * Number(cur.quantity);
    }, 0);

  return <div className="text-black dark:text-white">{totalPrice} EPG</div>;
}
