import { FaBullseye } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Moon, X } from "lucide-react";
import { motion, useAnimate } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const MenuLinks = () => {
  return (
    <ul className="flex items-center">
      <li className="cursor-pointer transition-all duration-300 px-2 rounded-sm">
        <Moon />
      </li>
      <li className="hover:bg-white hover:text-black cursor-pointer transition-all duration-300 px-2 rounded-sm">
        Signup
      </li>
      <li className="hover:bg-white hover:text-black cursor-pointer transition-all duration-300 px-2 rounded-sm">
        Login
      </li>
    </ul>
  );
};
const Navbar = () => {
  const [scope, animate] = useAnimate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showMenu = () => {
    animate(
      ".mobile-nav",
      { y: 100, opacity: 1, visibility: "visible" },
      { duration: 0.3 }
    );
    setIsMenuOpen(true);
  };

  const hideMenu = () => {
    animate(
      ".mobile-nav",
      { y: -200, opacity: 1, visibility: "hidden" },
      { duration: 0.3 }
    );
    setIsMenuOpen(false);
  };

  return (
    <nav className="flex items-center justify-between py-8 px-6 pb-0">
      <Link to="/" className="flex items-center gap-2 text-3xl">
        <FaBullseye /> Watchify
      </Link>

      <div className="hidden md:block">
        <MenuLinks />
      </div>

      <div className="text-xl md:hidden block z-10">
        {isMenuOpen ? (
          <X onClick={() => hideMenu()} />
        ) : (
          <RxHamburgerMenu onClick={() => showMenu()} />
        )}
      </div>
      <div ref={scope} className="absolute md:hidden block">
        <motion.ul
          initial={{ y: -200, opacity: 0 }}
          className="mobile-nav w-[95vw] mx-auto p-3 bg-black"
        >
          <li className="bg-[#232323] rounded-t-lg border-b border-gray-700 cursor pointer py-3 px-4 border border-t-0 border-l-0 border-r-0  border-white-300">
            <Moon />
          </li>
          <li className=" bg-[#232323] border-gray-700   py-3 px-4  border border-t-0 border-l-0 border-r-0  border-white-300">
            Signup
          </li>
          <li className="bg-[#232323] rounded-b-lg border-gray-700  py-3 px-4  border border-t-0 border-l-0 border-r-0  border-white-300">
            Login
          </li>
        </motion.ul>
      </div>
    </nav>
  );
};
``;
export default Navbar;
