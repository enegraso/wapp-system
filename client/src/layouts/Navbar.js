import React from "react";
import logo from "../assets/images/logo64.png";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../app/actions/users";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Agrobombas from "../assets/images/agrobombas.logo.jpg"

const Navbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.usersReducer.login);

  const handleMenuClick = () => {
    document.getElementById("navbarMobileMenu").classList.add("hidden");
  };

  return (
    <nav className="bg-[#0e6fa5] p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
          <Link
            to="/"
            className="text-white text-xl font-semibold hover:text-gray-200 transition duration-300 flex flex-row gap-4 justify-center items-center"
          >
            <img
              src={Agrobombas}
              alt="Logo Wapp Message System"
              className="w-16 h-10 rounded-md"
            />
            Agro Bombas Bragado
          </Link>
        </div>
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            aria-label="Open menu"
            onClick={() =>
              document
                .getElementById("navbarMobileMenu")
                .classList.toggle("hidden")
            }
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex items-center space-x-4 ml-auto">
          {login.id && (
            <>
              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/"
              >
                {t("navbar.home")}
              </Link>

              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/show-groups"
              >
                {t("navbar.groups")}
              </Link>

              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/show-contacts"
              >
                {t("navbar.contacts")}
              </Link>

              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/show-messages"
              >
                {t("navbar.messages")}
              </Link>

              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/queue-messages"
              >
                {t("navbar.stack")}
              </Link>

              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/sended-messages"
              >
                {t("navbar.sent")}
              </Link>

              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/show-receipts"
              >
                {t("navbar.received")}
              </Link>

              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/show-configs"
              >
                {t("navbar.settings")}
              </Link>
            </>
            
          )}
          {login.id && (
            <button
              className="ml-4 flex items-center text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition duration-300 shadow-md"
              onClick={() => {
                dispatch(logOut());
                navigate("/login");
              }}
            >
              <span> {t("navbar.logout")}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="ml-2 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div id="navbarMobileMenu" className="lg:hidden hidden">
        <div className="px-6 pt-4 pb-6 space-y-4">
          {login.id && (
            <>
              {[
                { to: "/", text: t("navbar.home") },
                { to: "/show-groups", text: t("navbar.groups") },
                { to: "/show-contacts", text: t("navbar.contacts") },
                { to: "/show-messages", text: t("navbar.messages") },
                { to: "/queue-messages", text: t("navbar.stack") },
                { to: "/sended-messages", text: t("navbar.sent") },
                { to: "/show-receipts", text: t("navbar.received") },
                { to: "/show-configs", text: t("navbar.settings") },
              ].map((link) => (
                <Link
                  key={link.to}
                  className="block text-white hover:text-gray-300 transition duration-300 text-lg font-semibold"
                  to={link.to}
                  onClick={handleMenuClick}
                >
                  {link.text}
                </Link>
              ))}
            </>
          )}
          {login.id && (
            <button
              className="w-full text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition duration-300 shadow-md flex items-center justify-center"
              onClick={() => {
                dispatch(logOut());
                navigate("/login");
              }}
            >
              {t("navbar.logout")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="ml-2 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
