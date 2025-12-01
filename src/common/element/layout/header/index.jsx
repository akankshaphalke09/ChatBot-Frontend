// src/common/element/header/index.jsx (example)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { route } from "../../../config/route";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check auth status
  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    // Initial check
    checkAuthStatus();

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLoginClick = () => navigate(route.login.path);
  const handleSignupClick = () => navigate(route.signup.path);
  const handleChatClick = () => navigate(route.chat.path || "/chat");

  return (
    <header className="w-full flex items-center justify-between px-0 py-2.5 bg-gray-900">
      {/* Left: logo or title */}
      <div className="flex items-center pl-2">
        <span className="text-base text-white font-medium">ChatBot</span>
      </div>

      {/* Right: buttons */}
      <div className="flex items-center gap-2.5 pr-5">
        {!isLoggedIn && (
          <>
            <button
              onClick={handleLoginClick}
              className="px-3.5 py-1.5 text-sm rounded-lg border-2 border-gray-600 text-gray-200 hover:border-gray-400 hover:text-white hover:shadow-lg hover:shadow-gray-700/50 transition-all duration-300 font-medium backdrop-blur-sm"
            >
              Login
            </button>
            <button
              onClick={handleSignupClick}
              className="px-3.5 py-1.5 text-sm rounded-lg border-2 border-gray-500 text-gray-200 hover:border-gray-300 hover:text-white hover:shadow-lg hover:shadow-gray-700/50 transition-all duration-300 font-medium backdrop-blur-sm"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </header>
  );
}
