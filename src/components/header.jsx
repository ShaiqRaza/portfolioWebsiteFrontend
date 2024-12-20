import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the page is scrolled
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`font-semibold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px] text-white fixed z-50 flex items-center justify-between lg:px-20 md:px-16 sm:px-14 xs:px-12 xss:px-10 px-8 bg-blue-900 w-full ${
        isScrolled
          ? "lg:h-[90px] md:h-[85px] sm:h-[80px] xs:h-[75px] xss:h-[70px] h-[65px]"
          : "lg:h-[100px] md:h-[95px] sm:h-[90px] xs:h-[85px] xss:h-[80px] h-[75px]"
      }`}
    >
      <div className="md:gap-[60px] xs:gap-[35px] sm:gap-[50px] xss:gap-[25px] gap-[20px] flex items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
            } font-bold lg:text-[18px] md:text-[17px] sm:text-[16px] xs:text-[15px] text-[14px]`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `${
              isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
            } font-bold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px]`
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/docs"
          className={({ isActive }) =>
            `${
              isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
            } font-bold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px]`
          }
        >
          Docs
        </NavLink>
      </div>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `${
            isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
          } font-bold lg:text-[18px] md:text[17px] sm:text-[16px] xs:text-[15px] text-[14px]`
        }
      >
        <FontAwesomeIcon
          icon={faPen}
          className="cursor-pointer lg:text-[20px] md:text[19px] sm:text-[18px] xs:text-[17px] text-[16px]"
        />
      </NavLink>
    </div>
  );
};

export default Header;
