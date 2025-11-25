import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { apiRoute } from "../../api/auth/route";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { route } from "../../../common/config/route";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  console.log("loginInfo ->", loginInfo);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}${apiRoute.login.path}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        toast.success(message, {
          position: "top-right",
        });
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("userEmail", loginInfo.email);
        setTimeout(() => {
          navigate(route.chat.path);
        }, 1000);
        console.log("Login successful");
      } else if (error) {
        const details = error?.details[0].message;
        toast.error(details, {
          position: "top-right",
        });
        console.log("Login failed");
      } else if (!success) {
        toast.error(message, {
          position: "top-right",
        });
        console.log("Login failed");
      }
      console.log(result);
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
      });
      console.log("Login error:", err);
    }
  };

  return (
    // Blurred transparent backdrop
    <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center p-4 z-50">
      {/* Compact card container */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-visible relative z-10 transform transition-all duration-500 ease-out animate-[slideUp_0.5s_ease-out]">
        {/* Close Button */}
        <button
          onClick={() => navigate(route.home.path || "/")}
          className="absolute top-3 right-3 z-30 bg-white hover:bg-red-50 rounded-full p-1.5 shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-90 group"
          aria-label="Close"
        >
          <IoClose className="text-xl text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
        </button>

        {/* Top Gradient Section - Compact */}
        <div className="h-32 bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/40 to-cyan-400/40 animate-pulse"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-cyan-300/20 rounded-full blur-xl"></div>

          <h1 className="absolute bottom-6 left-6 text-6xl font-bold text-white z-10 drop-shadow-2xl tracking-tight">
            hello
          </h1>
        </div>

        {/* Login Heading with wider line */}
        <div className="text-center -mt-4 pt-4 relative z-20 bg-white">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Login
          </h2>
          <div className="w-32 mx-auto mt-2 h-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-400 rounded-full shadow-sm"></div>
        </div>

        {/* Form Section - Compact */}
        <form onSubmit={handleLogin} className="px-8 pt-6 pb-16 space-y-5">
          {/* Email Input Field */}
          <div className="relative group">
            <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-0 text-teal-400 group-focus-within:text-teal-600 transition-colors duration-300 text-sm" />
            <input
              onChange={handleChange}
              className="w-full border-b-2 border-gray-200 py-2 pl-6 bg-transparent focus:outline-none focus:border-teal-500 transition-all duration-300 placeholder-gray-400 text-gray-700 text-sm"
              placeholder="Email Address"
              type="email"
              name="email"
              required
              value={loginInfo.email}
            />
          </div>

          {/* Password Input Field */}
          <div className="relative group">
            <FaLock className="absolute top-1/2 -translate-y-1/2 left-0 text-teal-400 group-focus-within:text-teal-600 transition-colors duration-300 text-sm" />
            <input
              onChange={handleChange}
              className="w-full border-b-2 border-gray-200 py-2 pl-6 bg-transparent focus:outline-none focus:border-teal-500 transition-all duration-300 placeholder-gray-400 text-gray-700 text-sm"
              type="password"
              name="password"
              placeholder="Enter your password..."
              required
              value={loginInfo.password}
            />
          </div>

          {/* Circular Login Button - Half inside, half outside */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-full flex justify-center">
            <button
              type="submit"
              className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 text-white font-semibold shadow-2xl shadow-teal-500/40 transform hover:scale-110 active:scale-95 transition-all duration-300 overflow-hidden group"
              aria-label="Login"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 group-hover:translate-x-0.5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>

          {/* Don't have an account link */}
          <div className="text-xs text-center pt-8">
            <span className="text-gray-600">Don't have an account? </span>
            <Link
              to={route.signup.path}
              className="text-teal-600 hover:text-teal-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all duration-300"
            >
              Signup
            </Link>
          </div>
        </form>

        <ToastContainer />
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default Login;
