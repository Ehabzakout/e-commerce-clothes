import { NavLink, Outlet } from "react-router-dom";

const Account = () => {
  return (
    <>
      <h1 className="mb-3 w-full text-xl font-bold"> Your Account:</h1>
      <div className="flex xs:text-xs md:text-sm">
        <aside className="mr-3 flex h-[80vh] flex-col gap-3 rounded-lg bg-zinc-100 p-3 dark:bg-gray xs:w-1/4 md:w-1/5">
          <NavLink
            to="orders"
            className={`rounded-lg bg-white px-2 py-2 font-semibold hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-700`}
          >
            Orders
          </NavLink>
          <NavLink
            to="profile"
            className={`rounded-lg bg-white px-2 py-2 font-semibold hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-700`}
          >
            Profile
          </NavLink>
        </aside>
        <div className="mt-3 w-3/4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Account;
