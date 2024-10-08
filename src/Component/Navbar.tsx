import Logo from "../assets/Logo.png";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useAppDispatch } from "./redux/Hooks/Hooks";
import { setSearchQuery } from "./redux/Feture/libs/Movie/MovieListApi"; // Pastikan jalur ini benar
import { useNavigate } from "react-router-dom"; // Import useNavigate dari react-router-dom
import Cookies from "js-cookie"; // Import js-cookie untuk menghapus cookies

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Movie");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch(); // Menggunakan useAppDispatch
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleClick = (link: string) => {
    setActiveLink(link);
    if (isOpen) {
      toggleMenu();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(setSearchQuery(value)); // Dispatch query pencarian ke Redux
  };

  const handleLogout = () => {
    // Hapus token dari cookies
    Cookies.remove("token");
    Cookies.remove("refToken");
    Cookies.remove("userId");

    // Navigasi ke halaman login
    navigate("/"); // Pastikan rute ini sesuai dengan rute login kamu
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-2 bg-black flex justify-between items-center z-10">
      <div className="flex items-center mx-4">
        <img src={Logo} alt="Logo" className="w-13 h-12" />
        <h1 className="text-white text-xl font-mono ml-3 font-bold">
          CineMagic
        </h1>

        {/* Navbar Links (Desktop) */}
        <ul className="hidden sm:flex space-x-10 ml-24 mt-1 items-center">
          {["Home", "Movie", "Cast"].map((item) => (
            <li key={item}>
              <a
                href={item === "Home" ? "#Hero" : `#${item}`}
                onClick={() => handleClick(item)}
                className={`font-mono text-base ${
                  activeLink === item ? "text-gray-500" : "text-white"
                } hover:text-gray-400`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center mr-5 mt-2 gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-1 rounded-md bg-gray-800 text-white border border-gray-600"
        />

        <button
          className="border-white rounded-md h-8 bg-gray-800 w-20"
          onClick={handleLogout} // Tambahkan event handler untuk logout
        >
          <h1 className="text-white text-base font-mono">Logout</h1>
        </button>

        <button className="sm:hidden text-white" onClick={toggleMenu}>
          {""}
          <FaBars size={18} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white p-4 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <button onClick={toggleMenu}>
            {""}
            <AiOutlineClose className="text-black" size={24} />
          </button>
        </div>

        <ul className="flex flex-col items-start p-4 space-y-4">
          {["Home", "Movie", "Cast"].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                onClick={() => handleClick(item)}
                className={`font-mono text-base ${
                  activeLink === item ? "text-black" : "text-gray-500"
                } hover:text-black`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
