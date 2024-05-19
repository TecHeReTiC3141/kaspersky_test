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
        <header className="w-full flex items-center border-b border-gray-500 px-8 py-4 gap-x-8 shadow">
            <Link to="/" className="flex items-center gap-x-3">

                <img src="/logo_tranparent.png" alt="Logo" className="w-12 object-cover"/>
                <h3 className="text-2xl font-bold">Employees Dashboard</h3>
            </Link>
            <div className="flex-1"/>
            <nav className="flex gap-x-3">
                {
                    links.map(({ text, to }) => (
                        <NavLink to={to}
                                 className={({ isActive }) =>
                                     clsx("border border-gray-700 px-2 py-1 rounded-lg hover:underline text-lg hover:shadow",
                                         isActive && "font-bold")}>
                            {text}</NavLink>
                    ))
                }
            </nav>
            <ThemeSwitcher/>
        </header>
    )
}