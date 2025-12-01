import React from "react";
import { IoClose } from "react-icons/io5";
import { TbLayoutSidebarRight } from "react-icons/tb";

export default function SidebarHeader({ open, setOpen }) {
  return (
    <div className="px-2 my-0 py-4 h-0 flex items-center justify-between border-b border-gray-700/50">
      {/* Left side: logo + Hello text */}
      <div className="flex items-center gap-3 overflow-hidden  ">
        <img
          src="/logo.jpg"
          alt="Logo"
          className={`${open ? "w-7 h-7" : "w-0"} rounded-lg duration-500 shadow-lg`}
        />
        <span
          className={`
              text-white text-s font-bold whitespace-nowrap duration-500
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
         className="cursor-pointer hover:bg-gray-700/50 rounded-lg duration-300 flex items-center relative group"
       >
         {open ? (
           <IoClose size={22} className="duration-500 text-gray-300 group-hover:text-white" />
         ) : (
           <TbLayoutSidebarRight size={24} className="duration-500 text-gray-300 group-hover:text-white " />
         )}
       </button>
    </div>
  );
}
