import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { product } from "@/types/interfaces";

const PopUp = ({ products }: { products: product[] }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger className="font-semibold underline">
          Order Items
        </PopoverTrigger>
        <PopoverContent>
          {products &&
            products?.map((product) => (
              <div className="flex items-center gap-3 text-xs" key={product.id}>
                <div className="mt-3 h-16 w-16">
                  <img
                    src={product.img}
                    className="size-16 rounded-sm object-cover"
                  ></img>
                </div>
                <div>
                  <h1>{product.title}</h1>
                  <h1>price: {Number(product.price)} EGP</h1>
                  <h1>quantity: {product.quantity}</h1>
                </div>
              </div>
            ))}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PopUp;
