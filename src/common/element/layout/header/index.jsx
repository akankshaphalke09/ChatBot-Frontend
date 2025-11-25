// src/common/element/header/index.jsx (example)
import React from "react";
import { useNavigate } from "react-router-dom";
import { route } from "../../../config/route";

export default function Header() {
  const navigate = useNavigate();

  // 👇 Check token every render
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLoginClick = () => navigate(route.login.path);
  const handleSignupClick = () => navigate(route.signup.path);
  const handleChatClick = () => navigate(route.chat.path || "/chat");

  return (
    <header className="w-full flex items-center justify-between px-4 py-2 shadow-md bg-white">
      {/* Left: logo or title */}
      <div className="flex items-center gap-2">
        <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-md" />
        <span className="font-semibold">Hello App</span>
      </div>

      {/* Right: buttons */}
      {/* Right: buttons */}
      <div className="flex items-center gap-3">
        {!isLoggedIn && (
          <>
            <button
              onClick={handleLoginClick}
              className="px-3 py-1 text-sm rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Login
            </button>
            <button
              onClick={handleSignupClick}
              className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </header>
  );
}
