import { Link, NavLink } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher.tsx";
import clsx from "clsx";

const links: { text: string, to: string }[] = [
    {
        text: "Home",
        to: "/",
    },
    {
        text: "Dashboard",
        to: "/dashboard",
    },
]

export default function Header() {

    return (
        <header className="w-full flex items-center border-b border-gray-500 px-3 sm:px-8 py-4 gap-x-2 xs:gap-x-5 sm:gap-x-8 shadow mb-4 ">
            <Link to="/" className="flex items-center gap-x-3">

                <img src="/logo_tranparent.png" alt="Logo" className="w-14 xs:w-8 md:w-12 object-cover"/>
                <h3 className="hidden xs:block xs:text-lg sm:text-xl md:text-2xl font-bold">Employees Dashboard</h3>
            </Link>
            <div className="flex-1"/>
            <nav className="flex flex-col sm:flex-row gap-x-3 gap-y-2">
                {
                    links.map(({ text, to }) => (
                        <NavLink to={to} key={to}
                                 className={({ isActive }) =>
                                     clsx("border border-gray-700 dark:border-gray-400 px-2 py-1 rounded-lg hover:underline max-sm:text-sm md:text-lg hover:shadow",
                                         isActive && "font-bold")}>
                            {text}
                        </NavLink>
                    ))
                }
            </nav>
            <ThemeSwitcher/>
        </header>
    )
}