import PopUp from "./popup";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { TOrder } from "@/types/interfaces";

const OrdersTable = ({ orders }: { orders: TOrder[] }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your Orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length !== 0
            ? orders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    #Order {order.id}
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>
                    <PopUp products={order.products} />
                  </TableCell>
                  <TableCell className="text-right">
                    {order.subTotal} EGP
                  </TableCell>
                </TableRow>
              ))
            : ""}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
