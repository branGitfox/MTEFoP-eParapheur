import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import { Link } from "react-router-dom";

function Nav() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <nav
        id="header"
        className="fixed w-full z-50 top-0 text-white bg-[#191970]"
      >
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2 -z-50">
          <div className="pl-4 flex items-center">
            <a
      
              className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl "
              href="#"
            >
              <img
                src="/mtefp_logo.jpeg"
                className="w-[50px]  rounded-full mr-3 h-[50px] inline
          "
                alt="logo de MTEFoP"
              />
              e-Parapheur
            </a>

          </div>
          <div className="absolute hidden md:block  left-[50%] animate__animated animate__fadeInDown">
            <img src="/Rpp.png" alt="" className="w-[100px] h-auto" />
          </div>
          <div className="block lg:hidden pr-4">
            {showMenu === false ? (
              <button
                id="nav-toggle"
                onClick={toggleMenu}
                className="flex items-center p-1 text-[#B39F43]"
              >
                <svg
                  className="fill-current h-6 w-6"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            ) : (
              <button
                id="nav-toggle"
                onClick={toggleMenu}
                className="flex items-center p-1 text-pink-800"
              >
                <BiX size={30} />
              </button>
            )}
          </div>
          <div
            className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
            id="nav-content"
          >
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
              <li className="mr-3">
                <Link
                  className="inline-block py-2 px-4 text-gray-100 font-bold no-underline"
                  to="/"
                >
                  Accueil
                </Link>
              </li>
              <li className="mr-3">
                <a
                  className="inline-block text-gray-100 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                  href="#infos"
                >
                  Infos
                </a>
              </li>
              <li className="mr-3">
                <a
                  className="inline-block text-gray-100 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                  href="#contact"
                >
                  Support
                </a>
              </li>
            </ul>
            <Link
              id="navAction"
              to="/mydoc"
              className="mx-auto lg:mx-0 hover:underline bg-blue-500 text-white font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              Mon Dossier
            </Link>
          </div>
        </div>
        {/* <hr className="border-b border-gray-100 opacity-25 my-0 py-0" /> */}
        {showMenu && (
          <div className="absolute top-[4.1rem] border-none z-20 bg-blue-900 w-full flex flex-col items-center justify-center p-3 gap-1">
            <li className="list-none">
              <Link
                className="inline-block py-2 px-4 text-gray-100 font-bold no-underline"
                to="/"
              >
                Accueil
              </Link>
            </li>

            <li className="list-none">
              <a
                className="inline-block  no-underline text-gray-100 hover:text-gray-800 hover:text-underline py-2 px-4"
                href="#"
              >
                Infos
              </a>
            </li>
            <li className="list-none">
              <a
                className="inline-block text-gray-100 no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="#"
              >
                Contact
              </a>
            </li>
            <Link
              id="navAction"
              to="/mydoc"
              className="mx-auto lg:mx-0 hover:underline bg-blue-500 text-white font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              Mon Dossier
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default Nav;
