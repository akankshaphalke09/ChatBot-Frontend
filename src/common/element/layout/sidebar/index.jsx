import React, { useState, useEffect } from "react";

// icons
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { SiInformatica } from "react-icons/si";
import { BiSolidFoodMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    icons: <BsFillChatSquareTextFill size={27} />,
    label: "Chats",
  },
  {
    icons: <SiInformatica size={27} />,
    label: "Information",
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

    navigate("/login"); // or route.login.path
  };

  return (
    <nav
      className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-blue-600 text-white ${
        open ? "w-60" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="px-2 py-0 h-20 flex items-center justify-between">
        {/* Left side: logo + Hello text */}
        <div className="flex items-center gap-2 overflow-hidden ">
          <img
            src="/logo.jpg"
            alt="Logo"
            className={`${open ? "w-10" : "w-0"} rounded-md duration-500`}
          />
          <span
            className={`
              text-white text-lg whitespace-nowrap duration-500
              ${!open ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}
            `}
          >
            Hello!
          </span>
        </div>

        {/* Right side: toggle button (always visible) */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="cursor-pointer -mt-4"
        >
          {open ? (
            <IoClose size={30} className="duration-500" />
          ) : (
            <BiSolidFoodMenu size={30} className="duration-500" />
          )}
        </button>
      </div>

      {/* Body */}
      <ul className="flex-1 -mt-3">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="px-2 py-3 my-0 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group"
          >
            <div>{item.icons}</div>
            <p
              className={`${
                !open && "w-0 translate-x-24"
              } duration-500 overflow-hidden`}
            >
              {item.label}
            </p>
            <p
              className={`${
                open && "hidden"
              } absolute left-32 shadow-md rounded-md
                 w-0 p-0 text-black bg-white duration-100 overflow-hidden 
                 group-hover:w-fit group-hover:p-2 group-hover:left-16
                `}
            >
              {item.label}
            </p>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="relative">
        {/* Hover tooltip (shows name + email when sidebar collapsed) */}
        <div
          className={`
            absolute bottom-14 left-14 bg-white text-black text-xs rounded-md 
            shadow-lg px-3 py-2 z-40
            transition-all duration-300
            ${open ? "opacity-0 pointer-events-none" : "opacity-0 group"}
          `}
        ></div>

        <div
          className="flex items-center gap-2 px-2 py-2 cursor-pointer group"
          onClick={
            isLoggedIn ? () => setShowUserCard((prev) => !prev) : undefined
          }
        >
          <div>
            <FaUserCircle size={30} />
          </div>
          <div
            className={`leading-5 ${
              !open && "w-0 translate-x-24"
            } duration-500 overflow-hidden`}
          >
            <p>{user.name || "Guest"}</p>
            <span className="text-xs">{user.email || ""}</span>
          </div>
          {/* Tooltip when sidebar is closed, on hover */}
          {!open && (
            <div
              className="
                absolute bottom-14 left-12 bg-white text-gray-800 text-xs 
                rounded-lg shadow-xl px-3 py-2 opacity-0 
                group-hover:opacity-100 group-hover:translate-y-0 
                -translate-y-1 pointer-events-none transition-all duration-200
              "
            >
              <p className="font-semibold">{user.name || "Guest"}</p>
              <p className="text-[11px] text-gray-500">{user.email || ""}</p>
            </div>
          )}
        </div>
        {/* Click card: mini profile with logout */}
        {isLoggedIn && showUserCard && (
          <div
            className="
              absolute bottom-16 left-16 bg-white text-gray-800 
              rounded-xl shadow-2xl px-4 py-3 w-56 z-50
            "
          >
            <button
              onClick={() => setShowUserCard(false)}
              className="
        absolute top-2 right-2 bg-white hover:bg-red-50 
        rounded-full p-1 shadow-md transition-all duration-200 
        hover:scale-110 group
      "
              aria-label="Close profile card"
            >
              <IoClose className="text-base text-gray-600 group-hover:text-red-500" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <FaUserCircle size={32} className="text-blue-600" />
              <div>
                <p className="font-semibold text-sm">{user.name || "Guest"}</p>
                <p className="text-[11px] text-gray-500 break-all">
                  {user.email || ""}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-2 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
