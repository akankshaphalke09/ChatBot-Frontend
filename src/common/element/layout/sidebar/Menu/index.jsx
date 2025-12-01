import React from "react";

export default function SidebarMenu({ open, menuItems }) {
  return (
    <ul className="flex-1 mt-0 mx-2">
      {menuItems.map((item, index) => (
        <li
          key={index}
          onClick={item.onClick}
          className={`mx-3 py-3  hover:text-white rounded-lg duration-300 cursor-pointer flex gap-3 items-center relative group backdrop-blur-sm ${
            !open && "justify-center"
          }`}
        >
          <div className="text-gray-300 group-hover:text-white transition-colors duration-300">{item.icons}</div>
          <p
            className={`text-sm font-medium ${
              !open && "w-0 translate-x-24 opacity-0"
            } duration-500 overflow-hidden whitespace-nowrap`}
          >
            {item.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
