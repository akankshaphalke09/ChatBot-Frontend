import React from "react";

export default function SidebarMenu({ open, menuItems }) {
  return (
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
  );
}
