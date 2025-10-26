import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/authSlice";
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <header className="bg-black/60 backdrop-blur-md border-b border-neutral-800 ">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 md:px-20 py-4 text-white">
        <Link className="font-bold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          Resumex
        </Link>

        <div className="flex items-center space-x-5 md:space-x-10">
          <p className="text-neutral-300 text-sm md:text-medium">
            Hi,{" "}
            <span className="text-indigo-400 font-medium">{user?.name}</span>
          </p>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 px-5 py-2 rounded-full font-semibold text-sm md:text-medium transition-all duration-300 "
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
