import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import Home from "@/pages/Home";

export const HomeLayout = () => {
  return (
    <>
      <Header />
      <div className="container relative min-h-[85vh] w-full px-5 xs:pt-28">
        <Home />
      </div>
      <Footer />
    </>
  );
};
