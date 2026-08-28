import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from "react-router";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutAddress from "./pages/CheckoutAddress";

import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/ProductList";
import OrderSuccess from "./pages/OrderSuccess";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "product/:id",
        element: <ProductDetails />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "checkout",
        element: <Checkout />
      },
      {
        path: "checkout/address",
        element: <CheckoutAddress />
      },
      {
        path: "admin/products/add",
        element: <AddProduct />
      },
      {
        path: "admin/products/edit/:id",
        element: <EditProduct />
      },
      {
        path: "admin/products",
        element: <ProductList />
      }
      , {
        path: "/order-success/:id",
        element: <OrderSuccess />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;