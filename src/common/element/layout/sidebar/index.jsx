import React, { useState, useEffect } from "react";

import { RiChatNewLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

// new component imports
import SidebarHeader from "./header";
import SidebarMenu from "./Menu";
import SidebarFooter from "./footer";

const menuItems = [
  {
    icons: <RiChatNewLine size={20} />,
    label: "New Chat",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showUserCard, setShowUserCard] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("loggedInUser") || "";
    const email = localStorage.getItem("userEmail") || "";

    if (!token) {
      navigate("/");
    }
    if (token) {
      setIsLoggedIn(true);
      setUser({ name, email });
    } else {
      setIsLoggedIn(false);
      setUser({ name: "Guest", email: "" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userEmail");

    setUser({ name: "", email: "" });
    setShowUserCard(false);
    setIsLoggedIn(false);

    navigate("/"); // or route.login.path
  };

  return (
    <nav
      className={`shadow-md h-screen -my-2 p-2 flex flex-col duration-500 bg-blue-600 text-white ${
        open ? "w-60" : "w-16"
      }`}
    >
      {/* Header */}
      <SidebarHeader open={open} setOpen={setOpen} />

      {/* Body */}
      <SidebarMenu open={open} menuItems={menuItems} />

      {/* Footer */}
      <SidebarFooter
        open={open}
        user={user}
        isLoggedIn={isLoggedIn}
        showUserCard={showUserCard}
        setShowUserCard={setShowUserCard}
        handleLogout={handleLogout}
      />
    </nav>
  );
}
