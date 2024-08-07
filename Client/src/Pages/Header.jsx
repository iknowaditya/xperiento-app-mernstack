import React, { useContext, useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import avtar from "../assets/avtar.svg";
import Hamburger from "hamburger-react";
import Logout from "./Logout";
import { UserContext } from "../context/UserContext";

function Header() {
  const [isOpen, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const Menu = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "My Insights", path: "/insights" },
    { title: "My List of Actions", path: "/myactions" },
    { title: "Bookmarked", path: "/bookmark" },
  ];

  const menuRefs = useRef([]);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [underlineLeft, setUnderlineLeft] = useState(0);

  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = Menu.findIndex((menu) => menu.path === currentPath);
    if (activeIndex !== -1) {
      setActiveMenuIndex(activeIndex);
    }
  }, [location.pathname, Menu]);

  useEffect(() => {
    if (activeMenuIndex === null) return;

    const setUnderlinePosition = () => {
      const currentMenu = menuRefs.current[activeMenuIndex];
      setUnderlineLeft(currentMenu?.offsetLeft ?? 0);
      setUnderlineWidth(currentMenu?.clientWidth ?? 0);
    };

    setUnderlinePosition();
  }, [activeMenuIndex]);

  const handleMenuClick = (path, index) => {
    navigate(path);
    setActiveMenuIndex(index);
    setOpen(false);
  };

  return (
    <div className="fixed max-w-sm top-0 z-20 bg-[#020202]">
      <div className="w-[393px] h-[57.44px] flex justify-between items-center px-4 mx-auto relative z-20">
        <h1 className="text-white font-bold text-xl">Xperiento</h1>
        {isOpen ? (
          <button
            onClick={() => setOpen(false)}
            className="text-white text-5xl"
          >
            &times;
          </button>
        ) : (
          <Hamburger toggled={isOpen} toggle={setOpen} />
        )}
      </div>

      <div
        className={`fixed max-w-sm top-0 w-full h-[90%] bg-black bg-opacity-80 flex flex-col items-end justify-center z-10 transition-all duration-500 ${
          isOpen ? "opacity-100 rotate-0" : "opacity-0 scale-110"
        }`}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div className="relative flex flex-col items-end justify-end gap-4">
          <div className="flex items-center gap-4 px-12 py-2 rounded-md font-normal text-2xl text-neutral-200">
            <div className="font-medium dark:text-white">
              <div>Hello {user?.firstName || "User"}</div>
            </div>
            <img className="w-12 h-12 rounded-full" src={avtar} alt="" />
          </div>
          {Menu.map((link, index) => (
            <a
              key={index}
              ref={(element) => (menuRefs.current[index] = element)}
              className={`block px-12 py-2 rounded-md font-normal text-2xl text-neutral-200 ${
                activeMenuIndex === index
                  ? "text-yellow-500 "
                  : "hover:text-yellow-500"
              } my-2 cursor-pointer`}
              onClick={() => handleMenuClick(link.path, index)}
            >
              {link.title}
            </a>
          ))}
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Header;
