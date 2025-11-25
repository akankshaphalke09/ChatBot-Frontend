import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function SidebarFooter({
  open,
  user,
  isLoggedIn,
  showUserCard,
  setShowUserCard,
  handleLogout,
}) {
  return (
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
  );
}
