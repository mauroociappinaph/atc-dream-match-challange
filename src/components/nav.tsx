"use client";
import React, { useState } from "react";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
      <div className="flex-1 flex justify-between items-center">
        <h1 className="text-xl bolder ">DREAM MATCH</h1>
      </div>

      <label
        htmlFor="menu-toggle"
        className="pointer-cursor md:hidden block"
        onClick={toggleMenu}
      >
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
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
      >
        <nav>
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
            <li>
              <a className="md:p-4 py-3 px-0 block" href="/">
                Inicio
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
