import { useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";

const Navbar = () => {
    const { theme, setTheme } = useAppContext();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        
        <header className="fixed top-[-10px]  w-full z-10">
        <div
            className={`flex items-center justify-between px-6 py-3 md:py-4 shadow max-w-[1200px] rounded-full  m-auto w-full transition-colors duration-300 max-md:rounded-t-none ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                }`}
        >
            {/* Logo */}
            <h1 className="text-3xl font-bold logo_font">Gautam</h1>

            {/* Nav Links */}
            <nav
                id="menu"
                className={`fixed md:static top-0 right-0 h-full md:h-auto w-1/2 md:w-auto flex flex-col md:flex-row items-center justify-center gap-8 p-8 md:p-0 text-sm font-medium transition-transform duration-300 ease-in-out z-20 max-md:text-2xl
    ${menuOpen
                        ? "translate-x-0 bg-gradient-to-b from-white/20 to-white/5 dark:from-gray-800/40 dark:to-gray-900/20 backdrop-blur-xl shadow-2xl border-l border-white/10 dark:border-gray-800/40"
                        : "translate-x-full md:translate-x-0"
                    }
  `}
            >
                <a
                    className="hover:text-indigo-600"
                    href="#home"
                    onClick={() => setMenuOpen(false)} // auto close when clicking link
                >
                    Home
                </a>
                <a
                    className="hover:text-indigo-600"
                    href="#about"
                    onClick={() => setMenuOpen(false)}
                >
                    About
                </a>
                <a
                    className="hover:text-indigo-600"
                    href="#skill"
                    onClick={() => setMenuOpen(false)}
                >
                    Skill
                </a>
                <a
                    className="hover:text-indigo-600"
                    href="#project"
                    onClick={() => setMenuOpen(false)}
                >
                    Project
                </a>
                <a
                    className="hover:text-indigo-600"
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                >
                    Contact
                </a>


            </nav>

            {/* Right Buttons */}
            <div className="flex items-center space-x-4 z-30">
                {/* Theme Toggle */}
                <button
                    className={`size-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition border border-slate-300 dark:border-gray-600 rounded-md `}
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    {theme === "dark" ? (
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.5 10.39a2.889 2.889 0 1 0 0-5.779 2.889 2.889 0 0 0 0 5.778M7.5 1v.722m0 11.556V14M1 7.5h.722m11.556 0h.723m-1.904-4.596-.511.51m-8.172 8.171-.51.511m-.001-9.192.51.51m8.173 8.171.51.511"
                                stroke={theme === "dark" ? "#fff" : "#101828"}
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.5 1.5a6 6 0 1 0 6 6 4.5 4.5 0 0 1-6-6z"
                                stroke="#353535"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </button>

                {/* Menu (Mobile) */}
                <button
                    id="openMenu"
                    className={` md:hidden text-gray-600 dark:text-gray-300 `}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke={theme === "dark" ? "#fff" : "#101828"}
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {!menuOpen ? <path d="M4 6h16M4 12h16M4 18h16" /> : <path d="M6 18L18 6M6 6l12 12" />}
                    </svg>

                </button>
            </div>
            </div>
        </header>
    );
};

export default Navbar;
