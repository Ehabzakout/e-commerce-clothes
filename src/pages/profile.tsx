import { useAppSelector } from "@/store/Hooks";
const Profile = () => {
  const { user } = useAppSelector((store) => store.auth);

  return (
    <>
      <div className="flex items-end gap-3 text-lg font-bold">
        <i className="fa-solid fa-user fa-2x"></i>
        <h1>Account Info:</h1>
      </div>
      <div className="mx-auto mt-4 w-3/4 text-lg">
        <h1 className="mt-2 font-semibold">
          First Name:
          <span className="ml-3 font-normal capitalize">
            {user?.user.first_name}
          </span>
        </h1>

        <h1 className="mt-2 font-semibold">
          Last Name:
          <span className="ml-3 font-normal capitalize">
            {user?.user.last_name}
          </span>
        </h1>
        <h1 className="mt-2 font-semibold">
          E-mail: <span className="ml-3 font-normal">{user?.user.email}</span>
        </h1>
      </div>
    </>
  );
};

export default Profile;
