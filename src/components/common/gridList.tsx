import { TGridList } from "@/types/interfaces";
import { useNavigate } from "react-router-dom";
import EmptyItems from "../feedBack/empty";

const GridList = <T extends { id?: number }>({
  array,
  renderItem,
  title,
}: TGridList<T>) => {
  const Nav = useNavigate();
  return (
    <>
      <div className="grid grid-cols-12 justify-items-center gap-6 gap-y-12">
        {array && array.length > 0 ? (
          array.map((record) => {
            return (
              <div
                key={record.id}
                className="xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
              >
                {renderItem(record)}
              </div>
            );
          })
        ) : (
          <div className="col-span-12 flex w-full flex-col items-center justify-center text-xl font-bold">
            <div className="dark:hidden">
              <EmptyItems />
            </div>
            <h1>There are no {title}</h1>
            <button
              className="btn mt-7 text-lg xs:w-full sm:w-1/2"
              onClick={() => {
                Nav("/");
              }}
            >
              Go to Home page
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default GridList;
