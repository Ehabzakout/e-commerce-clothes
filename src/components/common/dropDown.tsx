import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logOut } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/Hooks";
import { Link } from "react-router-dom";
const DropDownMenu = ({ user }: { user: string }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex h-10 w-10 items-center justify-center gap-2 rounded-full bg-zinc-300 text-lg font-bold hover:text-main dark:bg-zinc-900">
            {user[0].toLocaleUpperCase()}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <Link to="/account/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link to="/account/orders">
            <DropdownMenuItem>Orders</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <Link to="/">
            <DropdownMenuItem onClick={() => dispatch(logOut())}>
              Log Out
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default DropDownMenu;
