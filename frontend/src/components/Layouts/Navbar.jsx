import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div
      className="flex gap-5 border-b border-indigo-200/40 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30"
      style={{
        background:
          "linear-gradient(90deg, #4e54c8 0%, #8f94fb 50%, #4e54c8 100%)",
      }}
    >
      <button
        className="block lg:hidden text-white"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="mt-6 mb-2 tracking-tight">
        <span
          className="block text-4xl font-extrabold"
          style={{
            color: "#f5f7fa",
            letterSpacing: "2px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          PaisaPartner
        </span>
        <span
          className="block text-base font-light mt-1"
          style={{
            color: "#dbe1f2",
            fontFamily: "Roboto, sans-serif",
            letterSpacing: "1px",
          }}
        >
          Management of Your Financial Journey with Ease
        </span>
      </h2>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white shadow-lg">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
