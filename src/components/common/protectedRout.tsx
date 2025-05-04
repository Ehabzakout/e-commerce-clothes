import { useAppSelector } from "@/store/Hooks";
import { Navigate } from "react-router-dom";

const ProtectedRout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((store) => store.auth);
  if (user?.accessToken) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login?message2= You should login to get this page" />;
  }
};

export default ProtectedRout;
