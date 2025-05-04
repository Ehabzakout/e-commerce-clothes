import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./../../store/Hooks";
import { placeOrder } from "@/store/features/orders/ordersSlice";
import { useState } from "react";
import { cleanUpCart } from "@/store/features/cart/cartSlice";
const Dialog = ({
  children,
  NavTo,
  item,
  desc,
  confirm = false,
  total,
}: {
  children: React.ReactNode;
  NavTo: string;
  item: string;
  desc: string;
  confirm?: boolean;
  total?: number;
}) => {
  const dispatch = useAppDispatch();
  const Nav = useNavigate();
  const [loading, setLoading] = useState(false);

  function placeOdereHandler() {
    if (confirm === true && total) {
      setLoading(true);
      dispatch(placeOrder(total))
        .unwrap()
        .then(() => {
          dispatch(cleanUpCart());
          setTimeout(() => {
            Nav(`/${NavTo}`);
          }, 2000);
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } else Nav(`/${NavTo}`);
    return;
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{item}</AlertDialogTitle>
            <AlertDialogDescription>{desc}.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              disabled={loading}
              onClick={() => {
                placeOdereHandler();
              }}
            >
              {confirm ? (
                loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>Loading...
                  </>
                ) : (
                  "Confirm"
                )
              ) : (
                `Go to ${NavTo} page`
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Dialog;
