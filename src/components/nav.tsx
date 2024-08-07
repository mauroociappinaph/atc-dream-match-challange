"use client";
import React, { useState } from "react";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="lg:px-16 px-4 bg-customRed flex flex-wrap items-center   py-4 shadow-md">
      <div className="flex-1 flex justify-between items-center">
        <h3 className="text-xl bolder text-white font-bold ">DREAM MATCH</h3>
      </div>

      <input
        className="hidden"
        type="checkbox"
        id="menu-toggle"
        checked={isMenuOpen}
        readOnly
      />

      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex md:items-center md:w-auto w-full`}
        id="menu"
      ></div>
    </header>
  );
}
