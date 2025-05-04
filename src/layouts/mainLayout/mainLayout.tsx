import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";

import { Outlet } from "react-router-dom";
export const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="container relative min-h-[85vh] w-full xs:px-8 xs:pt-36 md:px-20 md:pt-40">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
