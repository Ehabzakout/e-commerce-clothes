import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
//main layout
import { MainLayout } from "@/layouts/mainLayout/mainLayout";
//pages
const Home = lazy(() => import("../pages/Home"));
const Categories = lazy(() => import("../pages/Categories"));
const Products = lazy(() => import("../pages/Products"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Error = lazy(() => import("../pages/Error"));
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import Cart from "@/pages/cartItems";
import WishList from "@/pages/wishList";
import DefualtLoading from "@/components/feedBack/defaultLoading";
import ProtectedRout from "@/components/common/protectedRout";
const Orders = lazy(() => import("@/pages/orders"));
const Account = lazy(() => import("@/pages/account"));
import Profile from "@/pages/profile";
import { HomeLayout } from "@/layouts/homeLayout";

export const AppRouter = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<DefualtLoading />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/category",
          element: (
            <Suspense fallback={<DefualtLoading />}>
              <Categories />
            </Suspense>
          ),
        },
        {
          path: "category/products/:prefix",
          element: (
            <Suspense fallback={<DefualtLoading />}>
              <Products />
            </Suspense>
          ),
          loader: ({ params }) => {
            if (
              typeof params.prefix !== "string" ||
              !/^[a-z]+$/i.test(params.prefix)
            ) {
              throw new Response("Bad Request", {
                statusText: "Category not found",
                status: 400,
              });
            }
            return true;
          },
        },
        { path: "/aboutus", element: <AboutUs /> },
        {
          path: "/account",
          element: (
            <ProtectedRout>
              <Suspense fallback={<DefualtLoading />}>
                <Account />
              </Suspense>
            </ProtectedRout>
          ),
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<DefualtLoading />}>
                  <Orders />{" "}
                </Suspense>
              ),
            },
            { path: "profile", element: <Profile /> },
            { path: "orders", element: <Orders /> },
          ],
        },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        {
          path: "/cart",
          element: (
            <ProtectedRout>
              <Cart />
            </ProtectedRout>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRout>
              <WishList />
            </ProtectedRout>
          ),
        },
      ],
    },
    { path: "/*", element: <Error /> },
    { index: true, element: <HomeLayout /> },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
};
