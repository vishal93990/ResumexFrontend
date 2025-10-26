import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Login from "./Login";
const Layout = () => {
  const { user, laoding } = useSelector((state) => state.auth);

  if (laoding) {
    return <Loader />;
  }

  return (
    <div>
      {user ? (
        <div className="bg-black h-full text-white">
          <Navbar />
          <Outlet />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Layout;
