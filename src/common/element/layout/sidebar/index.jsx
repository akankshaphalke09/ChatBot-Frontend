import React, { useState, useEffect } from "react";

import { RiChatNewLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

// new component imports
import SidebarHeader from "./header";
import SidebarMenu from "./Menu";
import SidebarFooter from "./footer";

const handleNewChat = async () => {
    const token = localStorage.getItem("token");
    
    try {
      // Call backend to clear conversation history
      if (token) {
        await fetch("http://localhost:8080/api/chat/clear", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
      
      // Dispatch event to clear chat messages in frontend
      window.dispatchEvent(new Event("clearChat"));
    } catch (err) {
      console.error("Error clearing chat:", err);
    }
  };

  const menuItems = [
    {
      icons: <RiChatNewLine size={20} />,
      label: "New Chat",
      onClick: handleNewChat,
    },
  ];

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showUserCard, setShowUserCard] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to update user state from localStorage
  const updateUserFromStorage = () => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("loggedInUser") || "";
    const email = localStorage.getItem("userEmail") || "";

    if (token) {
      setIsLoggedIn(true);
      setUser({ name, email });
    } else {
      setIsLoggedIn(false);
      setUser({ name: "Guest", email: "" });
    }
  };

  useEffect(() => {
    // Initial check
    updateUserFromStorage();

    // Listen for custom auth events (for same-window updates)
    const handleAuthChange = () => {
      updateUserFromStorage();
    };

    window.addEventListener("authChange", handleAuthChange);

    // Cleanup
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userEmail");

    setUser({ name: "Guest", email: "" });
    setShowUserCard(false);
    setIsLoggedIn(false);

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("authChange"));

    navigate("/");
  };

  return (
    <nav
      className={`shadow-xl h-screen p-3 flex flex-col duration-500 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white border-r border-gray-700 ${
        open ? "w-64" : "w-14"
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
