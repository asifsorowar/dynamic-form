import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-3 shadow-md bg-gray-200 w-screen text-gray-700 text-sm px-11">
      <div className="flex w-full justify-between items-center">
        <NavLink to="/" className="text-white font-bold text-lg ">
          XpeedStudio
        </NavLink>
        <div>
          <NavLink to="/" className="hover:text-white">
            HOME
          </NavLink>
          <NavLink to="/get-form" className="ml-7 hover:text-white">
            GET FORM
          </NavLink>
          <NavLink to="/create/new" className="ml-7 hover:text-white">
            CREATE
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
