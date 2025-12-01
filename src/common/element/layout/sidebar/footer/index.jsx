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
    <div className="relative mt-auto border-t border-gray-700/50 pt-3">
      <div
        className={`flex items-center gap-3 px-3 py-3 cursor-pointer group hover:bg-gray-700/50 rounded-lg duration-300 ${
          !open && "justify-center"
        }`}
        onClick={
          isLoggedIn ? () => setShowUserCard((prev) => !prev) : undefined
        }
      >
        <div>
          <FaUserCircle size={28} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
        </div>
        <div
          className={`leading-5 ${
            !open && "w-0 translate-x-24 opacity-0"
          } duration-500 overflow-hidden`}
        >
          <p className="font-semibold text-sm">{user.name || "Guest"}</p>
          <span className="text-xs text-gray-400">{user.email || ""}</span>
        </div>
        {/* Tooltip when sidebar is closed, on hover */}
        {!open && (
          <div
            className="
                absolute bottom-16 left-20 bg-gray-900 text-white text-xs 
                rounded-lg shadow-2xl px-3 py-2 opacity-0 border border-gray-700
                group-hover:opacity-100 group-hover:translate-y-0 
                -translate-y-1 pointer-events-none transition-all duration-200
              "
          >
            <p className="font-semibold">{user.name || "Guest"}</p>
            <p className="text-[11px] text-gray-400">{user.email || ""}</p>
          </div>
        )}
      </div>
      {/* Click card: mini profile with logout */}
      {isLoggedIn && showUserCard && (
        <div
          className="
              absolute bottom-20 left-20 bg-gray-900 text-white 
              rounded-xl shadow-2xl px-4 py-3 w-56 z-50 border border-gray-700
            "
        >
          <button
            onClick={() => setShowUserCard(false)}
            className="
        absolute top-2 right-2 bg-gray-800 hover:bg-red-900/30 
        rounded-full p-1 shadow-md transition-all duration-200 
        hover:scale-110 group border border-gray-700
      "
            aria-label="Close profile card"
          >
            <IoClose className="text-base text-gray-400 group-hover:text-red-400" />
          </button>
          <div className="flex items-center gap-2 mb-3">
            <FaUserCircle size={32} className="text-gray-400" />
            <div>
              <p className="font-semibold text-sm">{user.name || "Guest"}</p>
              <p className="text-[11px] text-gray-400 break-all">
                {user.email || ""}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-2 py-2 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200 border border-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
