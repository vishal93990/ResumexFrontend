import { X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apis from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = useState(urlState || "login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user, laoding } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(state);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccessMessage("");

      if (!formData.email || !formData.password) {
        setError("Please fill out all required fields.");
        return;
      }

      const { data } = await apis.post(`/api/users/${state}`, formData);

      // Save token (if available)
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      // Dispatch login action to Redux
      dispatch(login(data));

      toast.success(data.message || "Logged in successfully!");

      // Navigate immediately after successful login/register
      navigate("/app");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "An error occurred.";
      toast.error(message);
      setError(message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <button className="absolute z-10 top-6 right-6">
        <Link to="/">
          <p>
            <X />
          </p>
        </Link>
      </button>
      <div className="absolute inset-0">
        <div className="w-[1200px] h-[1200px] bg-gradient-to-r from-indigo-800 via-purple-700 to-black rounded-full opacity-50 absolute -top-[500px] left-1/2 -translate-x-1/2"></div>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 bg-neutral-900/60 border border-neutral-700 rounded-2xl shadow-[0_0_50px_-15px_rgba(99,102,241,0.3)] backdrop-blur-md p-7 w-[95%] max-w-md">
        <h2 className="text-2xl font-extrabold mb-1 text-center text-indigo-300">
          {state === "login" ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-neutral-400 text-center mb-10 text-sm">
          {state === "login"
            ? "Log in to continue building your resume."
            : "Join us and build your AI-powered resume."}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {state !== "login" && (
            <div>
              <label className="block text-sm mb-2 text-neutral-300">
                Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChanges}
                type="text"
                placeholder="Enter your name"
                className="w-full bg-neutral-800 text-white placeholder-neutral-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
          <div>
            <label className="block text-xs mb-1 text-neutral-300">
              Email address
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChanges}
              type="email"
              placeholder="you@example.com"
              className="w-full bg-neutral-800 text-white placeholder-neutral-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs mb-1 text-neutral-300">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChanges}
              type="password"
              placeholder="••••••••"
              className="w-full bg-neutral-800 text-white placeholder-neutral-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-full font-semibold text-lg tracking-wide transition-all duration-300"
          >
            {state === "login" ? "Login" : "Sign up"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-neutral-400">
          {state === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  setState("register");
                  setError("");
                  setSuccessMessage("");
                }}
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setState("login");
                  setError("");
                  setSuccessMessage("");
                }}
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
