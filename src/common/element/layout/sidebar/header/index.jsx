import React from "react";
import { IoClose } from "react-icons/io5";
import { BiSolidFoodMenu } from "react-icons/bi";

export default function SidebarHeader({ open, setOpen }) {
  return (
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
  );
}
